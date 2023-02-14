import { contextBridge } from 'electron';
import { Preload } from "src/preload";
import { KernelBridge } from "./ipc/kernel/preload";
import { GlobalShortcutBridge } from "./ipc/globalShortcut/preload";
import { ElectronBridge } from "./ipc/electron/preload";

const api: Preload.ElectronBridge = {
    versions: {
        node: () => process.versions.node,
        chrome: () => process.versions.chrome,
        electron: () => process.versions.electron,
    },
    kernel: KernelBridge,
    globalShortcut: GlobalShortcutBridge,
    electron: ElectronBridge
}

contextBridge.exposeInMainWorld('electronBridge', api);
