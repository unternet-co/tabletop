/// <reference types="vite/client" />

// Global type definitions for Electron IPC bridge
interface ElectronIPC {
  invoke: (name: string, args: any[]) => Promise<any>;
}

declare global {
  interface Window {
    ipc?: ElectronIPC;
  }
}