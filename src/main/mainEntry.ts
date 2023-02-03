import { app, BrowserWindow } from "electron";
import { CustomScheme } from "./CustomScheme";
import { CommonWindowEvent } from "./CommonWindowEvent";
import path from "path";

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
app.on("browser-window-created", (e, win) => {
  CommonWindowEvent.regWinEvent(win);
});
let mainWindow: BrowserWindow;
app.whenReady().then(() => {
  let config = {
    frame: true,
    show: true,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      nodeIntegration: false,
      webSecurity: false,
      allowRunningInsecureContent: true,
      contextIsolation: true,
      webviewTag: true,
      spellcheck: false,
      disableHtmlFullscreenWindowResize: true,
    },
  };

  mainWindow = new BrowserWindow(config);

  mainWindow.webContents.openDevTools({ mode: "undocked" });

  if (process.argv[2]) {
    mainWindow.loadURL(process.argv[2]);
  } else {
    CustomScheme.registerScheme();
    mainWindow.loadURL(`app://index.html`);
    // Updater.check();
  }
  CommonWindowEvent.listen();
});
