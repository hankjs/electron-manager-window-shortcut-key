import { isFunction } from "src/common/is";
import { Plugin, Install } from "../Plugin";

type PluginInstallFunction<Options> = Options extends unknown[]
    ? (...options: Options) => any
    : (options: Options) => any;

export type PluginInstall<Options = any[]> =
    | (PluginInstallFunction<Options> & {
          install?: PluginInstallFunction<Options>;
      })
    | {
          install: PluginInstallFunction<Options>;
      };

export class Manager {
    #installedPlugins = new Set();

    constructor() {}

    use(plugin: PluginInstall, ...options: any[]) {
        if (this.#installedPlugins.has(plugin)) {
            __DEV__ &&
                console.warn(`Plugin has already been applied to target app.`);
        } else if (plugin && isFunction(plugin.install)) {
            this.#installedPlugins.add(plugin);
            plugin.install(...options);
        } else if (isFunction(plugin)) {
            this.#installedPlugins.add(plugin);
            plugin(...options);
        } else if (__DEV__) {
            console.warn(
                `A plugin must either be a function or an object with an "install" ` +
                    `function.`
            );
        }
    }
}
