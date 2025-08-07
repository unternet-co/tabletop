import './ui/common/global.css';
import './ui/app-root';
import { dependencies } from './common/dependencies';
import { KernelService } from './services/kernel-service';
import { createOpenAI } from '@ai-sdk/openai';
import { IndexedDB } from './stores/indexed-db';
import { MessageService } from './services/message-service';
import { ProcessService } from './services/process-service';
import { WorkspaceService } from './services/workspace-service';
import { registerIPCService } from './electron/ipc-service.renderer';
import { IHTTPService } from './services/http-service';

async function init() {
  const db = new IndexedDB();

  const openai = createOpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });

  const httpService = registerIPCService<IHTTPService>('HTTPService');
  dependencies.registerSingleton('HTTPService', httpService);

  const kernelService = new KernelService(
    openai('gpt-4o'),
  );
  dependencies.registerSingleton('KernelService', kernelService);

  const messageService = new MessageService(
    db.messages,
    kernelService
  );
  dependencies.registerSingleton('MessageService', messageService);
  await messageService.load();

  const processService = new ProcessService(
    db.processes,
    kernelService,
  );
  dependencies.registerSingleton('ProcessService', processService);
  await processService.load();

  const workspaceService = new WorkspaceService(db.workspaces);
  dependencies.registerSingleton('WorkspaceService', workspaceService);
  await workspaceService.load();

  const root = document.createElement('app-root');
  document.body.appendChild(root);
}

init();

