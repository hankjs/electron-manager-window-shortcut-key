import { ipcRenderer, type IpcRendererEvent } from "electron"
import { IPCElectron } from "./namespace";

export const ElectronBridge = {
    on(channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void): void {
        ipcRenderer.on(channel, listener);
    }
}
