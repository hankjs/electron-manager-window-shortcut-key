import path from "path";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import optimizer from "vite-plugin-optimizer";
import { devPlugin, getReplacer } from "./plugins/devPlugin";
import { buildPlugin } from "./plugins/buildPlugin";

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    return {
        define: {
            __APP_ENV__: env,
        },
        plugins: [optimizer(getReplacer()), devPlugin(), vue()],
        build: {
            rollupOptions: {
                plugins: [buildPlugin()],
            },
        },
        resolve: {
            alias: {
                'src': path.resolve(__dirname, "src")
            },
        },
    }
});