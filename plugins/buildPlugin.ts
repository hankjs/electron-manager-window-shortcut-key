import path from "path";
import fs from "fs-extra";
import { nativeNodeModulesPlugin } from "./nativeNodeModules";

const esbuildDefine = {
    __DEV__: "false",
}

class BuildObj {
  async buildMain() {
    const esbuild = require("esbuild");
    esbuild.buildSync({
      entryPoints: ["./src/main/preload.ts"],
      bundle: true,
      platform: "node",
      define: esbuildDefine,
      outfile: "./dist/preload.js",
      external: ["electron"],
    });
    await esbuild.build({
      entryPoints: ["./src/main/main.ts"],
      bundle: true,
      define: esbuildDefine,
      platform: "node",
      // minify: true,
      outfile: "./dist/main.js",
      plugins: [nativeNodeModulesPlugin],
      external: ["electron"],
    });
  }
  preparePackageJson() {
    let pkgJsonPath = path.join(process.cwd(), "package.json");
    let localPkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
    let electronConfig = localPkgJson.devDependencies.electron.replace("^", "");
    localPkgJson.main = "main.js";
    delete localPkgJson.scripts;
    delete localPkgJson.devDependencies;
    localPkgJson.devDependencies = { electron: electronConfig };
    if (!localPkgJson.dependencies) {
      localPkgJson.dependencies = {}
    }
    let tarJsonPath = path.join(process.cwd(), "dist", "package.json");
    fs.writeFileSync(tarJsonPath, JSON.stringify(localPkgJson));
    fs.mkdirSync(path.join(process.cwd(), "dist/node_modules"));
  }
  buildInstaller() {
    let options = {
      config: {
        directories: {
          output: path.join(process.cwd(), "release"),
          app: path.join(process.cwd(), "dist"),
        },
        files: ["**"],
        extends: null,
        productName: "WindowManager",
        appId: "com.zjhcn.window_manager",
        asar: true,
        nsis: {
          oneClick: true,
          perMachine: true,
          allowToChangeInstallationDirectory: false,
          createDesktopShortcut: true,
          createStartMenuShortcut: true,
          shortcutName: "WindowManager",
        },
        publish: [{ provider: "generic", url: "http://localhost:5500/" }],
        // extraResources: [{ from: `./src/common/db.db`, to: `./` }],
      },
      project: process.cwd(),
    };
    return require("electron-builder").build(options);
  }
}

export let buildPlugin = () => {
  return {
    name: "build-plugin",
    closeBundle: async () => {
      let buildObj = new BuildObj();
      await buildObj.buildMain();
      buildObj.preparePackageJson();
      buildObj.buildInstaller();
    },
  };
};
