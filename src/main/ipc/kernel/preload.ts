import { ipcRenderer } from "electron";
import { IPCKernel } from "./namespace";

export const KernelBridge = {
    getCurrentProcessId: () => ipcRenderer.invoke(IPCKernel.Channel.getCurrentProcessId),
}