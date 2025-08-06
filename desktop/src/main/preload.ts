import { contextBridge, ipcRenderer } from 'electron';

const ipcAPI = {
  invoke: (name: string, args: any[]) => ipcRenderer.invoke('invoke', name, args),
};

contextBridge.exposeInMainWorld('ipc', ipcAPI);