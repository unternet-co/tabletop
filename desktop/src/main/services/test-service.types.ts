// Example service interface - shared between main and renderer
export interface ITestService {
  sendTestMessage(msg: string): Promise<string>;
  getMessage(): Promise<string>;
  calculateSum(a: number, b: number): Promise<number>;
}
