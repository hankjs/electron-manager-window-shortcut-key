# Vue 3 + TypeScript + Vite + Electron

## Project Layout

- dist                      目录是我们打包过程的临时产物放置目录。
- plugins                   目录放置我们的开发环境 Vite 插件和打包 Vite 插件。
- release                   目录放置最终生成的安装包。
- resource                  目录放置一些外部资源，比如应用程序图标、第三方类库等。
- src/common                目录放置主进程和渲染进程都会用到的公共代码，比如日期格式化的工具类、数据库访问工具类等，主进程和渲染进程的代码都有可能使用这些类。
- src/main                  目录放置主进程的代码。
- src/model                 目录放置应用程序的模型文件，比如消息类、会话类、用户设置类等，主进程和渲染进程的代码都有可能使用这些类。
- src/renderer              目录放置渲染进程的代码。
- src/renderer/assets       放置字体图标、公共样式、图片等文件。
- src/renderer/Component    放置公共组件，比如标题栏组件、菜单组件等。
- src/renderer/store        目录存放 Vue 项目的数据状态组件，用于在不同的 Vue 组件中共享数据。
- src/renderer/Window       目录存放不同窗口的入口组件，这些组件是通过 vue-router 导航的，这个目录下的子目录存放对应窗口的子组件。
- src/renderer/App.vue      是渲染进程的入口组件，这个组件内只有一个用于导航到不同的窗口。
- src/renderer/main.ts      是渲染进程的入口脚本。
- index.html                是渲染进程的入口页面。
- vite.config.ts            是 Vite 的配置文件。

## Git Contribution submission specification

- reference [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) specification ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` Add new features
  - `fix` Fix the problem/BUG
  - `style` The code style is related and does not affect the running result
  - `perf` Optimization/performance improvement
  - `refactor` Refactor
  - `revert` Undo edit
  - `test` Test related
  - `docs` Documentation/notes
  - `chore` Dependency update/scaffolding configuration modification etc.
  - `workflow` Workflow improvements
  - `ci` Continuous integration
  - `types` Type definition file changes
  - `wip` In development
