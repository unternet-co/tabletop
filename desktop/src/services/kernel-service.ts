import { Kernel, Message, type LanguageModel } from '@unternet/kernel';
import { type MessageService } from './message-service';

interface KernelServiceInit {
  model: LanguageModel;
  messageService: MessageService;
}

export class KernelService {
  kernel: Kernel;
  messageService: MessageService;

  constructor({ model, messageService }: KernelServiceInit) {
    this.messageService = messageService;

    this.kernel = new Kernel({
      model,
      messages: this.messageService.messages,
    });

    this.kernel.on('message', (msg) => {
      this.messageService.add(msg);
    });
  }

  send(msg: Message) {
    this.kernel.send(msg);
  }
}