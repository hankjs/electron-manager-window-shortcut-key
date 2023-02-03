import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  getCurrentProcessId: () => ipcRenderer.invoke("getCurrentProcessId"),
  minimizeWindow: () => ipcRenderer.invoke("minimizeWindow"),
});
