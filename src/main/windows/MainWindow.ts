import { BrowserWindow } from "electron";
import { AppScheme } from "../protocol/app";
import { WINDOW_CONFIG } from "./config";

export class MainWindow {
    static devtool: boolean = __DEV__;
    static envURL: string = process.argv[2];
    static schemeURL = "app://index.html";

    #browserWindow: BrowserWindow;

    constructor() {
        this.#browserWindow = new BrowserWindow(WINDOW_CONFIG);
    }

    onAttach() {
        this.loadURL();
        if (MainWindow.devtool) {
            this.#browserWindow.webContents.openDevTools();
        }
    }

    loadURL() {
        if (MainWindow.envURL) {
            this.#browserWindow.loadURL(MainWindow.envURL);
        } else {
            AppScheme.registerScheme();
            this.#browserWindow.loadURL(`app://index.html`);
        }
    }
}
