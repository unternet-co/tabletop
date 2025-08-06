import { ipcMain } from 'electron';

export function registerIPCService<T extends object>(
  service: T,
): void {
  const handlerName = service.constructor.name;
  console.log(handlerName);

  ipcMain.handle(handlerName, async (event, methodName: string, args: any[]) => {
    const method = (service as any)[methodName];
    if (typeof method === 'function') {
      try {
        return await method.apply(service, args);
      } catch (error) {
        console.error(`Error in IPC method ${methodName}:`, error);
        throw error;
      }
    }
    throw new Error(`Method ${methodName} not found in service`);
  });
}