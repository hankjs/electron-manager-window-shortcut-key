import { app, Event, BrowserWindow } from "electron";

import { IPCRegister } from "./ipc";
import { CommonWindowEvent } from "./ipc/CommonWindowEvent";
import { PluginLeaderShortcut } from "./plugins/PluginLeaderShortcut";
import { PluginManager } from "./plugins/PluginManager";
import { MainWindow } from "./windows/MainWindow";
import { WindowManager } from "./windows/WindowManager";
import { keys } from "@wm/kernel";
import { setting } from "./setting/Setting";

export class App {
    #windowManager = new WindowManager();
    #pluginManager = new PluginManager();

    constructor() {
        app.on("browser-window-created", (e, win) =>
            this.onBrowserWindowCreated(e, win)
        );

        app.whenReady().then(() => this.onReady());
        app.on("will-quit", () => this.onWillQuit());
    }

    onReady() {
        setting.load();
        IPCRegister();

        this.#pluginManager.push(new PluginLeaderShortcut(keys.key[0]));

        this.#windowManager.push(new MainWindow());

        CommonWindowEvent.listen();
    }

    onWillQuit() {
        this.#pluginManager.clear();
    }

    onBrowserWindowCreated(e: Event, win: BrowserWindow) {}
}
