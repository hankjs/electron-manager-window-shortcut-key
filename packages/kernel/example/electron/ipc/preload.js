"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { contextBridge, ipcRenderer } = require("electron");
const kernelNamespace = "KernelJS";
const k = (id) => `${kernelNamespace}::${id}`;
const kernelJSBridge = {
    async keyTap(key, modifier) {
        return await ipcRenderer.invoke(k("keyTap"), key, modifier);
    },
    async getKeys() {
        return await ipcRenderer.invoke(k("getKeys"));
    },
    async getCurrentProcessId() {
        return await ipcRenderer.invoke(k("getCurrentProcessId"));
    },
    async setKeyboardDelay(ms) {
        return await ipcRenderer.invoke(k("setKeyboardDelay"), ms);
    },
    async keyToggle(key, down, modifier) {
        return await ipcRenderer.invoke(k("keyToggle"), key, down, modifier);
    },
    async unicodeTap(value) {
        return await ipcRenderer.invoke(k("unicodeTap"), value);
    },
    async typeString(string) {
        return await ipcRenderer.invoke(k("typeString"), string);
    },
    async typeStringDelayed(string, cpm) {
        return await ipcRenderer.invoke(k("typeStringDelayed"), string, cpm);
    },
};
contextBridge.exposeInMainWorld("electronBridge", {
    kernel: kernelJSBridge,
});
