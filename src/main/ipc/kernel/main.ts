import { ipcMain } from "electron";
import { kernel } from "@wm/kernel";
import { IPCKernel } from "./namespace";

export function IPCKernelRegister() {
    ipcMain.handle(IPCKernel.Channel.getCurrentProcessId, () => {
        return kernel.getCurrentProcessId();
    });
}
