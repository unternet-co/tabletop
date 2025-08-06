// Main process implementation of the test service
import { ITestService } from './test-service.types';

export class TestService implements ITestService {
  async sendTestMessage(msg: string): Promise<string> {
    console.log('Received message in main process:', msg);
    return `Message received in main process: "${msg}"`;
  }

  async getMessage(): Promise<string> {
    return 'Hello from main process!';
  }

  async calculateSum(a: number, b: number): Promise<number> {
    return a + b;
  }
}
