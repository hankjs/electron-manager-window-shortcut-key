import { app, BrowserWindow } from "electron";

import { IPCRegister } from "./ipc";
import { CommonWindowEvent } from "./ipc/CommonWindowEvent";
import { MainWindow } from "./windows/MainWindow";

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";

app.on("browser-window-created", (e, win) => {
    CommonWindowEvent.regWinEvent(win);
});

app.whenReady().then(() => {
    IPCRegister();

    const mainWindow = new MainWindow();
    mainWindow.onAttach();

    CommonWindowEvent.listen();
});
