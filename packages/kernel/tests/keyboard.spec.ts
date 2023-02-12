import { resolve } from "path";
import { _electron as electron } from "playwright";
import { test, expect, ElectronApplication } from "@playwright/test";

test.describe("Keyboard", () => {
    let electronApp: ElectronApplication;
    // launch electron app
    test.beforeAll(async() => {
        electronApp = await electron.launch({
            args: [resolve(__dirname, "../example/electron/main.js")],
        });
    });

    // click body to capture keyboard event.
    test.beforeEach(async () => {
        // Wait for the first BrowserWindow to open
        // and return its Page object
        const page = await electronApp.firstWindow();
        const body = page.locator("body");
        await body.click();
    });

    test.afterAll(async() => {
        // close app
        await electronApp.close();
    });

    test("launch electron app", async () => {
        const isPackaged = await electronApp.evaluate(async ({ app }) => {
            return app.isPackaged;
        });

        expect(isPackaged).toBe(false);
    });

    test("keyTap", async () => {
        const page = await electronApp.firstWindow();

        const frame = page.mainFrame();
        const keys = await frame.evaluateHandle(() =>
            Promise.resolve(window.electronBridge.kernel.getKeys())
        );
        
        await frame.evaluateHandle((keys) =>
            Promise.resolve(window.electronBridge.kernel.keyTap(keys.key.a, keys.modifier.shift))
        , keys);

        const keyPress = page.locator("#keyPress");

        expect(await keyPress.innerText()).toBe("KeyA");

        await frame.evaluateHandle((keys) =>
            Promise.resolve(window.electronBridge.kernel.keyTap(keys.key.b, keys.modifier.shift))
        , keys);

        expect(await keyPress.innerText()).not.toBe("KeyA");
        expect(await keyPress.innerText()).toBe("KeyB");
    });
});
