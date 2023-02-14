import { app, Event, BrowserWindow } from "electron";

import { IPCRegister } from "./ipc";
import { CommonWindowEvent } from "./ipc/CommonWindowEvent";
import { MainWindow } from "./windows/MainWindow";
import { WindowManager } from "./windows/WindowManager";

export class App {
    #windowManager = new WindowManager();

    constructor() {
        app.on("browser-window-created", (e, win) =>
            this.onBrowserWindowCreated(e, win)
        );

        app.whenReady().then(() => this.onReady());
    }

    onReady() {
        IPCRegister();

        this.#windowManager.push(new MainWindow());

        CommonWindowEvent.listen();
    }

    onBrowserWindowCreated(e: Event, win: BrowserWindow) {}
}
