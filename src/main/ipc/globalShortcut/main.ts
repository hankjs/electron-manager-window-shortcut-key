import { ipcMain, ipcRenderer } from "electron";
import { IPCGlobalShortcut } from "./namespace";

export function IPCGlobalShortcutRegister() {
    ipcMain.handle(IPCGlobalShortcut.Channel.register, (e, accelerator) => {
        e.sender.postMessage("gs", accelerator);
    });
}