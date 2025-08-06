// Renderer process client for the test service
import { createIPCClient } from '../ipc.shared';
import { ITestService } from './ITestService';

// Create a type-safe IPC client that communicates with the main process
export const testService = createIPCClient<ITestService>();

// Usage example:
// testService.sendTestMessage('Hello!').then(response => console.log(response));
// testService.calculateSum(2, 3).then(result => console.log('Sum:', result));
