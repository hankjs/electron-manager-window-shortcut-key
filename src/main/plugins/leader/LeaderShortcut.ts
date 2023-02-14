import { kernel, keys } from "@wm/kernel";
import { globalShortcut, Notification } from "electron";
import { Timer } from "src/main/utils/Timer";
import { Plugin } from "../Plugin";

export class LeaderShortcut extends Plugin {
    #leader: string;
    #delay = 200;
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

    #leaderLock = false;
    async leaderHandler() {
        if (this.#leaderLock) {
            return;
        }

        globalShortcut.unregister(this.#leader);
        console.log("before");
        await this.#timer.sleep(this.#delay);
        console.log("tap");
        kernel.keyTap(this.#leader);
        await this.#timer.sleep(this.#delay);
        console.log("after");
        this.registerShortcut();
    }

    registerShortcut() {
        globalShortcut.isRegistered(this.#leader);
        const registered = globalShortcut.register(
            this.#leader,
            this.leaderHandler
        );
        if (!registered) {
            new Notification({
                title: "WindowManager",
                body: "<leader> register failed.",
            });
        }
    }

    onAttach(): void {
        throw new Error("Method not implemented.");
    }
    onDetach(): void {
        throw new Error("Method not implemented.");
    }
}
