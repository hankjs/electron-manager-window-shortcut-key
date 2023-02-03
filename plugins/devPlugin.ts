import { ViteDevServer } from "vite";
import { nativeNodeModulesPlugin } from "./nativeNodeModules";

export let devPlugin = () => {
  return {
    name: "dev-plugin",
    async configureServer(server: ViteDevServer) {
      const esbuild = require("esbuild");
      esbuild.buildSync({
        entryPoints: ["./src/main/preload.ts"],
        bundle: true,
        platform: "node",
        outfile: "./dist/preload.js",
        external: ["electron"],
      });
      await esbuild.build({
        entryPoints: ["./src/main/mainEntry.ts"],
        bundle: true,
        platform: "node",
        outfile: "./dist/mainEntry.js",
        plugins: [nativeNodeModulesPlugin],
        external: ["electron"],
      });
      server.httpServer!.once("listening", () => {
        let { spawn } = require("child_process");
        let addressInfo = server.httpServer!.address();
        if (!addressInfo) {
          return
        }
        let httpAddress = typeof addressInfo === "string" ? addressInfo : `http://${addressInfo.address}:${addressInfo.port}`;
        let electronProcess = spawn(
          require("electron").toString(),
          ["./dist/mainEntry.js", httpAddress],
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
  let externalModels = ["os", "fs", "path", "events", "child_process", "crypto", "http", "buffer", "url"];
  let result = { };
  for (let item of externalModels) {
    result[item] = () => ({
      find: new RegExp(`^${item}$`),
      code: `const ${item} = require('${item}');export { ${item} as default }`,
    });
  }
  result["electron"] = () => {
    let electronModules = ["clipboard", "ipcRenderer", "nativeImage", "shell", "webFrame"].join(",");
    return {
      find: new RegExp(`^electron$`),
      code: `const {${electronModules}} = require('electron');export {${electronModules}}`,
    };
  };
  return result;
};
