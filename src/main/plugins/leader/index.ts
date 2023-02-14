import { kernel, keys } from "@wm/kernel";
import { globalShortcut, Notification } from "electron";
import { Accelerator } from "src/main/utils/Accelerator";

export const PluginLeader = {
    install() {
        const accelerator: Accelerator.Pattern = `${Accelerator.Key.Num0}`;
        let leaderLock = false;
        function leaderHandler() {
            if (leaderLock) {
                return;
            }

            globalShortcut.unregister(accelerator);
            kernel.keyTap(keys.key.numpad_0);
            setTimeout(() => {
                registerLeader();
            }, 200);
        }
        function registerLeader() {
            globalShortcut.isRegistered(accelerator);
            const registered = globalShortcut.register(
                accelerator,
                leaderHandler
            );
            if (!registered) {
                new Notification({
                    title: "WindowManager",
                    body: "<leader> register failed.",
                });
            }
        }
    },
};
