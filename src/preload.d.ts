export namespace Preload {
    import { IpcRendererEvent } from "electron";
    import type { Accelerator } from "./main/utils/Accelerator";

    interface BridgeVersions {
        node: () => string;
        chrome: () => string;
        electron: () => string;
    }

    interface BridgeKernel {
        getCurrentProcessId: () => Promise<number>;
    }

    interface BridgeGlobalShortcut {
        register(accelerator: Accelerator.Pattern, callback: ( ...args: any[]) => void): Promise<boolean>;
    }

    interface BridgeElectron {
        on(channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void): void;
    }

    export interface ElectronBridge {
        versions: BridgeVersions;
        kernel: BridgeKernel,
        globalShortcut: BridgeGlobalShortcut;
        electron: BridgeElectron
    }
}

declare global {
    interface Window {
        electronBridge: Preload.ElectronBridge
    }
}