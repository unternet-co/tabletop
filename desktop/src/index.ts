import './ui/common/global.css';
import './ui/app-root';
import { dependencies } from './common/dependencies';
import { KernelService } from './services/kernel-service';
import { createOpenAI } from '@ai-sdk/openai';
import { IndexedDB } from './stores/indexed-db';
import { MessageService } from './services/message-service';
import { ProcessService } from './services/process-service';
import { WorkspaceService } from './services/workspace-service';

async function init() {
  const db = new IndexedDB();

  const openai = createOpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });

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

  // Test IPC bridge if we're in Electron
  if (window.ipc) {
    const { testService } = await import('./electron/services/test-service');

    console.log('Testing IPC bridge...');
    try {
      const response = await testService.sendTestMessage('Hello from renderer!');
      console.log('✅ IPC test successful:', response);

      const sum = await testService.calculateSum(5, 10);
      console.log('✅ IPC calculation test:', sum);
    } catch (error) {
      console.error('❌ IPC test failed:', error);
    }
  } else {
    console.log('NO IPC');
  }
}

init();

