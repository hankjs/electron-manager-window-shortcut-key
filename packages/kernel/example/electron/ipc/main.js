"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerHandle = void 0;
const { ipcMain } = require("electron");
const addon = require("../../../index.js");
const kerneljs = addon;
function registerHandle(ns = "") {
    const n = (id) => `${ns}::${id}`;
    ipcMain.handle(n("getKeys"), async () => {
        return kerneljs.keys;
    });
    ipcMain.handle(n("getCurrentProcessId"), async () => {
        return kerneljs.kernel.getCurrentProcessId();
    });
    ipcMain.handle(n("setKeyboardDelay"), async (e, ms) => {
        return kerneljs.kernel.setKeyboardDelay(ms);
    });
    ipcMain.handle(n("keyTap"), async (e, key, modifier) => {
        return kerneljs.kernel.keyTap(key, modifier);
    });
    ipcMain.handle(n("keyToggle"), async (e, key, down, modifier) => {
        return kerneljs.kernel.keyToggle(key, down, modifier);
    });
    ipcMain.handle(n("unicodeTap"), async (e, value) => {
        return kerneljs.kernel.unicodeTap(value);
    });
    ipcMain.handle(n("typeString"), async (e, string) => {
        return kerneljs.kernel.typeString(string);
    });
    ipcMain.handle(n("typeStringDelayed"), async (e, string, cpm) => {
        return kerneljs.kernel.typeStringDelayed(string, cpm);
    });
}
exports.registerHandle = registerHandle;
