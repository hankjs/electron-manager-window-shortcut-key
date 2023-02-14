import path from "path";

export const WINDOW_CONFIG = {
    frame: true,
    show: true,
    webPreferences: {
        /** preload.js load on runtime. dist/main.js load dist/preload.js */
        preload: path.join(__dirname, "./preload.js"),
        nodeIntegration: false,
        webSecurity: false,
        allowRunningInsecureContent: true,
        contextIsolation: true,
        webviewTag: true,
        spellcheck: false,
        disableHtmlFullscreenWindowResize: true,
    },
};
