import { Table } from 'dexie';
import { Message } from '../types';
import { Observable } from '../common/observable';
import { Kernel, MessageDelta, ReplyMessage } from '@unternet/kernel';
import { KernelService } from './kernel-service';

export class MessageService extends Observable {
  private _messages = new Map<Message['id'], Message>();
  private kernel: Kernel;

  constructor(
    private db: Table<Message>,
    kernelService: KernelService,
  ) {
    super();
    this.db = db;
    this.kernel = kernelService.kernel;
    this.kernel.on('message', this.handleMessage.bind(this));
  }

  get messages() {
    return Array.from(this._messages.values());
  }

  async load() {
    const msgs = await this.db.toArray();
    for (const msg of msgs) this._messages.set(msg.id, msg);
    this.kernel.messages = this.messages;
    this.notify();
  }

  handleMessage(msg: Message | MessageDelta) {
    if (msg.type === 'delta') {
      if (msg.messageType !== 'reply') return;

      let savedMsg = this._messages.get(msg.id) as ReplyMessage;

      if (!savedMsg) {
        savedMsg = {
          id: msg.id,
          timestamp: msg.timestamp,
          type: 'reply',
          text: msg.delta.text ?? '',
        };
        this._messages.set(savedMsg.id, savedMsg);
      }

      savedMsg.text += msg.delta.text ?? '';
      this.db.put(savedMsg);
    } else {
      this.db.add(msg);
      this.messages.push(msg);
    }

    this.notify();
  }

  all() { return this.messages; }
}