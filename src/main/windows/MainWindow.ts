import { BrowserWindow } from "electron";
import { CommonWindowEvent } from "../ipc/CommonWindowEvent";
import { AppScheme } from "../protocol/app";
import { WINDOW_CONFIG } from "./config";
import { BaseWindow } from "./BaseWindow";

export class MainWindow extends BaseWindow {
    static devtool: boolean = __DEV__;
    static envURL: string = process.argv[2];
    static schemeURL = "app://index.html";

    #browserWindow: BrowserWindow;

    constructor() {
        super();
        this.#browserWindow = new BrowserWindow(WINDOW_CONFIG);
    }

    loadURL() {
        if (MainWindow.envURL) {
            this.#browserWindow.loadURL(MainWindow.envURL);
        } else {
            AppScheme.registerScheme();
            this.#browserWindow.loadURL(`app://index.html`);
        }
    }

    onAttach() {
        this.loadURL();
        if (MainWindow.devtool) {
            this.#browserWindow.webContents.openDevTools();
        }
    }

    onCreate(e: Electron.Event): void {
        CommonWindowEvent.regWinEvent(this.#browserWindow);
    }

}
