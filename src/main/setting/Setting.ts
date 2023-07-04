import { keys } from "@wm/kernel";

export class Setting {
    #mainWindow = {
        devtool: __DEV__,
        envURL: process.argv[2],
        schemeURL: "app://index.html",
    };

    get mainWindow() {
        return this.#mainWindow;
    }

    #leaderMap = new Map([
        [keys.key.h, keys.key.left],
        [keys.key.j, keys.key.down],
        [keys.key.k, keys.key.up],
        [keys.key.l, keys.key.right],
    ])

    get leaderMap () {
        return this.#leaderMap;
    }

    constructor() { }

    load() {

    }
}

export const setting = new Setting();
