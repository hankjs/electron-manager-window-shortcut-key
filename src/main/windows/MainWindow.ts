import { BrowserWindow } from "electron";
import { CommonWindowEvent } from "../ipc/CommonWindowEvent";
import { AppScheme } from "../protocol/app";
import { WINDOW_CONFIG } from "./config";
import { BaseWindow } from "./BaseWindow";
import { setting } from "../setting/Setting";

export class MainWindow extends BaseWindow {

    #browserWindow: BrowserWindow;

    constructor() {
        super();
        this.#browserWindow = new BrowserWindow(WINDOW_CONFIG);
    }

    loadURL() {
        if (setting.mainWindow.envURL) {
            this.#browserWindow.loadURL(setting.mainWindow.envURL);
        } else {
            AppScheme.registerScheme();
            this.#browserWindow.loadURL(setting.mainWindow.schemeURL);
        }
    }

    onAttach() {
        this.loadURL();

        if (setting.mainWindow.devtool) {
            this.#browserWindow.webContents.openDevTools();
        }
    }

    onCreate(e: Electron.Event): void {
        CommonWindowEvent.regWinEvent(this.#browserWindow);
    }

}
