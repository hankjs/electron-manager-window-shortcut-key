export interface IElectronAPI {
  node: () => string;
  chrome: () => string;
  electron: () => string;
  getCurrentProcessId: () => Promise<number>;
  minimizeWindow: () => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}