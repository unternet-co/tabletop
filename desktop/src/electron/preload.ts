import { contextBridge, ipcRenderer } from 'electron';

const ipcAPI = {
  invoke: (serviceName: string, methodName: string, args: any[]) =>
    ipcRenderer.invoke(serviceName, methodName, args),
};

contextBridge.exposeInMainWorld('ipc', ipcAPI);