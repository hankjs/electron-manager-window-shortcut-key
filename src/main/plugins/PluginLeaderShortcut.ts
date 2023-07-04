import { kernel } from "@wm/kernel";
import { globalShortcut, Notification } from "electron";
import { Timer } from "src/main/utils/Timer";
import { setting } from "../setting/Setting";
import { Plugin } from "./Plugin";

export class PluginLeaderShortcut extends Plugin {
    #leader: string;
    // first repeat interval
    #delay = 550;
    #timer = new Timer();

    constructor(leader: string) {
        super();
        this.#leader = leader;
    }

    setLeader(leader: string) {
        if (this.#leader === leader) {
            return;
        }

        this.#leader = leader;
    }
    setDelay(delay: number) {
        this.#delay = delay;
    }

    #waitNext = false;
    async leaderHandler() {
        try {
            if (this.#waitNext) {
                this.#timer.clear();
                await this.#timer.sleep(this.#delay);
                this.#waitNext = false;
                kernel.keyTap(this.#leader);
                return;
            }

            this.#waitNext = true;
            await this.#timer.sleep(this.#delay);
            this.keyTap(this.#leader, () => {
                this.leaderHandler();
            });
            await this.#timer.sleep(this.#delay);
            this.#waitNext = false;
        } catch (error) {
            // catch cancel leader reject
        }
    }

    registerLeader() {
        globalShortcut.isRegistered(this.#leader);
        const registered = globalShortcut.register(this.#leader, () =>
            this.leaderHandler()
        );
        if (!registered) {
            new Notification({
                title: "WindowManager",
                body: "<leader> register failed.",
            });
        }
    }

    registerShortcut() {
        setting.leaderMap.forEach((target, source) => {
            const registered = globalShortcut.register(source, () =>
                this.mapHandler(source, target)
            );
            if (!registered) {
                new Notification({
                    title: "WindowManager",
                    body: `<${source}> register failed.`,
                });
            }
        });
    }

    mapHandler(source: string, target: string) {
        // leader no press
        if (!this.#waitNext) {
            this.keyTap(source, () => {
                this.mapHandler(source, target);
            });
            return;
        }

        this.#timer.clear();
        if (setting.leaderMap.has(target)) {
            this.keyTap(target, () =>
                this.mapHandler(target, setting.leaderMap.get(target)!)
            );
        } else {
            kernel.keyTap(target);
        }
    }

    onAttach(): void {
        console.log("PluginLeaderShortcut Attach");
        this.registerLeader();
        this.registerShortcut();
    }
    onDetach(): void {
        console.log("PluginLeaderShortcut Detach");
        globalShortcut.unregister(this.#leader);
    }

    keyTap(accelerator: string, callback: () => void) {
        globalShortcut.unregister(accelerator);
        kernel.keyTap(accelerator);
        globalShortcut.register(accelerator, callback);
    }
}
