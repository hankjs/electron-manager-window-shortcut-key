import { IPCElectronRegister } from "./electron/main";
import { IPCGlobalShortcutRegister } from "./globalShortcut/main";
import { IPCKernelRegister } from "./kernel/main";

export function IPCRegister() {
    IPCElectronRegister();
    IPCGlobalShortcutRegister();
    IPCKernelRegister();
}