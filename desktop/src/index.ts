import './ui/common/global.css';
import './ui/app-root';
import { dependencies } from './utils/dependencies';
import { KernelService } from './services/kernel-service';
import { createOpenAI } from '@ai-sdk/openai';
import { IndexedDB } from './stores/indexed-db';
import { MessageService } from './services/message-service';

async function init() {
  const db = new IndexedDB();

  const openai = createOpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });

  const messageService = new MessageService({ db: db.messages });
  await messageService.load();
  dependencies.registerSingleton('MessageService', messageService);

  const kernelService = new KernelService({
    model: openai('gpt-4o'),
    messageService,
  });
  dependencies.registerSingleton('KernelService', kernelService);

  const root = document.createElement('app-root');
  document.body.appendChild(root);
}

init();