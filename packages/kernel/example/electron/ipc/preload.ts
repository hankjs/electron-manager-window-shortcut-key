const { contextBridge, ipcRenderer } = require("electron");
import type { kernel, keys } from "../../../index";

const kernelNamespace = "KernelJS";
const k = (id: string) => `${kernelNamespace}::${id}`;

type Kernel = typeof kernel;
type Keys = typeof keys;
interface KernelJSBridge extends Kernel {
    getKeys(): Promise<Keys>;
}

const kernelJSBridge: KernelJSBridge = {
    async keyTap(key: string, modifier: string | string[]) {
        return await ipcRenderer.invoke(k("keyTap"), key, modifier);
    },
    async getKeys() {
        return await ipcRenderer.invoke(k("getKeys"));
    },
    async getCurrentProcessId(): Promise<number> {
        return await ipcRenderer.invoke(k("getCurrentProcessId"));
    },
    async setKeyboardDelay(ms: number): Promise<number> {
        return await ipcRenderer.invoke(k("setKeyboardDelay"), ms);
    },
    async keyToggle(
        key: string,
        down: string,
        modifier?: string | string[] | undefined
    ): Promise<number> {
        return await ipcRenderer.invoke(k("keyToggle"), key, down, modifier);
    },
    async unicodeTap(value: number): Promise<number> {
        return await ipcRenderer.invoke(k("unicodeTap"), value);
    },
    async typeString(string: string): Promise<number> {
        return await ipcRenderer.invoke(k("typeString"), string);
    },
    async typeStringDelayed(string: string, cpm: number): Promise<number> {
        return await ipcRenderer.invoke(k("typeStringDelayed"), string, cpm);
    },
};
contextBridge.exposeInMainWorld("electronBridge", {
    kernel: kernelJSBridge,
});
