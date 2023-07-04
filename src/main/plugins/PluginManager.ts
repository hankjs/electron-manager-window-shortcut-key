import { I_Plugin } from "./Plugin";

export class PluginManager {
    #plugins: I_Plugin[] = [];

    constructor() {}

    push(plugin: I_Plugin) {
        this.#plugins.push(plugin);
        plugin.onAttach();
    }

    pop() {
        const plugin = this.#plugins.pop();
        plugin?.onDetach();
    }

    clear() {
        let plugin;

        while (plugin = this.#plugins.pop()) {
            plugin.onDetach();
        }
    }

}
