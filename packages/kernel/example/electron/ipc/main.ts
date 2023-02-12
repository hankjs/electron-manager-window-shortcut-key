const { ipcMain } = require("electron");
const addon = require("../../../index.js");

import type { IpcMainInvokeEvent } from "electron";
import type * as KernelJS from "../../../index";

const kerneljs = addon as typeof KernelJS;

export function registerHandle(ns: string = "") {
    const n = (id: string) => `${ns}::${id}`;
    ipcMain.handle(n("getKeys"), async () => {
        return kerneljs.keys;
    });

    ipcMain.handle(n("getCurrentProcessId"), async () => {
        return kerneljs.kernel.getCurrentProcessId();
    });

    ipcMain.handle(
        n("setKeyboardDelay"),
        async (e: IpcMainInvokeEvent, ms: number) => {
            return kerneljs.kernel.setKeyboardDelay(ms);
        }
    );
    ipcMain.handle(
        n("keyTap"),
        async (
            e: IpcMainInvokeEvent,
            key: string,
            modifier: string | string[]
        ) => {
            return kerneljs.kernel.keyTap(key, modifier);
        }
    );
    ipcMain.handle(
        n("keyToggle"),
        async (
            e: IpcMainInvokeEvent,
            key: string,
            down: string,
            modifier: string | string[]
        ) => {
            return kerneljs.kernel.keyToggle(key, down, modifier);
        }
    );
    ipcMain.handle(
        n("unicodeTap"),
        async (e: IpcMainInvokeEvent, value: number) => {
            return kerneljs.kernel.unicodeTap(value);
        }
    );
    ipcMain.handle(
        n("typeString"),
        async (e: IpcMainInvokeEvent, string: string) => {
            return kerneljs.kernel.typeString(string);
        }
    );
    ipcMain.handle(
        n("typeStringDelayed"),
        async (e: IpcMainInvokeEvent, string: string, cpm: number) => {
            return kerneljs.kernel.typeStringDelayed(string, cpm);
        }
    );
}
