export namespace Preload {
    import { IpcRendererEvent } from "electron";
    import * as BridgeKernel from "../index";

    export interface ElectronBridge {
        kernel: BridgeKernel,
    }
}

declare global {
    interface Window {
        electronBridge: Preload.ElectronBridge
    }
}