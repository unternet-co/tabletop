import { Table } from 'dexie';
import { Message } from '../types';
import { Observable } from '../utils/observable';
import { createMessage, MessageDelta, ReplyMessage } from '@unternet/kernel';

interface MessageServiceInit {
  db: Table<Message>;
}

export class MessageService extends Observable {
  db: Table<Message>;
  private _messages = new Map<Message['id'], Message>();

  constructor({ db }: MessageServiceInit) {
    super();
    this.db = db;
  }

  get messages() {
    return Array.from(this._messages.values());
  }

  async load() {
    const msgs = await this.db.toArray();
    for (const msg of msgs) this._messages.set(msg.id, msg);
    this.notify();
  }

  add(msg: Message | MessageDelta) {
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