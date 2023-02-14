import { ViteDevServer } from "vite";
import { nativeNodeModulesPlugin } from "./nativeNodeModules";

const esbuildDefine = {
    __DEV__: "true",
};

export let devPlugin = () => {
    return {
        name: "dev-plugin",
        async configureServer(server: ViteDevServer) {
            const esbuild = require("esbuild");
            esbuild.buildSync({
                entryPoints: ["./src/main/preload.ts"],
                define: esbuildDefine,
                bundle: true,
                platform: "node",
                outfile: "./dist/preload.js",
                external: ["electron"],
            });
            await esbuild.build({
                entryPoints: ["./src/main/main.ts"],
                define: esbuildDefine,
                bundle: true,
                platform: "node",
                outfile: "./dist/main.js",
                plugins: [nativeNodeModulesPlugin],
                external: ["electron"],
            });
            server.httpServer!.once("listening", () => {
                let { spawn } = require("child_process");
                let addressInfo = server.httpServer!.address();
                if (!addressInfo) {
                    return;
                }
                let httpAddress =
                    typeof addressInfo === "string"
                        ? addressInfo
                        : `http://${addressInfo.address}:${addressInfo.port}`;
                let electronProcess = spawn(
                    require("electron").toString(),
                    ["./dist/main.js", httpAddress],
                    {
                        cwd: process.cwd(),
                        stdio: "inherit",
                    }
                );
                electronProcess.on("close", () => {
                    server.close();
                    process.exit();
                });
            });
        },
    };
};

export let getReplacer = () => {
    let externalModels = [
        "os",
        "fs",
        "path",
        "events",
        "child_process",
        "crypto",
        "http",
        "buffer",
        "url",
        "robotjs",
    ];
    let result = {};
    for (let item of externalModels) {
        result[item] = () => ({
            find: new RegExp(`^${item}$`),
            code: `const ${item} = require('${item}');export { ${item} as default }`,
        });
    }
    result["electron"] = () => {
        let electronModules = [
            "clipboard",
            "ipcRenderer",
            "nativeImage",
            "shell",
            "webFrame",
            "globalShortcut",
        ].join(",");
        return {
            find: new RegExp(`^electron$`),
            code: `const {${electronModules}} = require('electron');export {${electronModules}}`,
        };
    };
    return result;
};
