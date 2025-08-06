/// <reference types="vite/client" />

interface ElectronIPC {
  invoke: (serviceName: string, methodName: string, args: any[]) => Promise<any>;
}

declare global {
  interface Window {
    ipc: ElectronIPC;
  }
}

export { };