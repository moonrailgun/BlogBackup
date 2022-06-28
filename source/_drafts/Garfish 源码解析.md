---
title: Garfish 源码解析
tags:
  - Garfish
  - 源码解析
  - 学习笔记
date: 2022-06-24 10:39:39
---

## 背景

`Garfish` 是字节跳动 `web infra` 团队推出的一款微前端框架

> 包含构建微前端系统时所需要的基本能力，任意前端框架均可使用。接入简单，可轻松将多个前端应用组合成内聚的单个产品

![微前端基本架构](/images/garfish/1.excalidraw.svg)

因为当前对 `Garfish` 的解读极少，而微前端又是前端领域相当重要的一环，因此写下本文，同时也是对学习源码的一个总结

*本文基于 garfish#0d4cc0c82269bce8422b0e9105b7fe88c2efe42a 进行解读*

## 学习源码

```bash
git clone https://github.com/modern-js-dev/garfish.git
cd garfish
pnpm install
pnpm build
pnpm dev
```

然后打开`https://localhost:8090/` 即可看到演示项目

## 基本使用

### 主应用

```ts
export const GarfishInit = async () => {
  try {
    Garfish.run(Config);
  } catch (error) {
    console.log('garfish init error', error);
  }
};
```

其中关键点是 `Config` 参数, 其所有参数都是可选的，一般比较重要的几个参数为:

- `basename` 子应用的基础路径，默认值为 /，整个微前端应用的 basename。设置后该值为所有子应用的默认值，若子应用 AppInfo 中也提供了该值会替换全局的 basename 值
- `domGetter` 子应用挂载点。如`'#submodule'`
- `apps` 需要主要参数如 `name`, `entry`, `activeWhen(路由地址)`

此函数运行之后，Garfish会自动进行路由劫持功能。根据路由变化

### 子应用

以react17为例:
```ts
import { reactBridge, AppInfo } from '@garfish/bridge-react';

export const provider = reactBridge({
  el: '#root', // 此处的root是子应用自己声明的root
  // a promise that resolves with the react component. Wait for it to resolve before mounting
  loadRootComponent: (appInfo: AppInfo) => {
    return Promise.resolve(() => <RootComponent {...appInfo} />);
  },
  errorBoundary: (e: any) => <ErrorBoundary />,
});
```

其中:
- `RootComponent` 是子应用的主要逻辑
- `reactBridge` 是garfish导出的一个封装函数。大概的逻辑就是把react的一些特有写法映射到`garfish`的通用生命周期，包含`render`和`destroy`

## 源码解读

那么简单了解了一些garfish的基本使用方案，我们就来看看`garfish`在此过程中到底做了什么。

从`Garfish.run`开始:

garfish/packages/core/src/garfish.ts
```typescript
run(options: interfaces.Options = {}) {
  if (this.running) {
    /**
     * 重复运行检测
     */
    if (__DEV__) {
      warn('Garfish is already running now, Cannot run Garfish repeatedly.');
    }
    return this;
  }

  /**
   * 全局化配置
   */
  this.setOptions(options);

  /**
   * 载入插件
   */
  // Register plugins
  options.plugins?.forEach((plugin) => this.usePlugin(plugin));

  // Put the lifecycle plugin at the end, so that you can get the changes of other plugins
  this.usePlugin(GarfishOptionsLife(this.options, 'global-lifecycle'));

  // Emit hooks and register apps
  this.hooks.lifecycle.beforeBootstrap.emit(this.options); // 生命周期事件beforeBootstrap
  this.registerApp(this.options.apps || []); // 注册子应用
  this.running = true;
  this.hooks.lifecycle.bootstrap.emit(this.options); // bootstrap
  return this;
}
```

其中移除插件等内容，最重要的是`registerApp`调用，用于将配置注册到实例中

> 接下来的代码会移除无关紧要的代码，仅保留核心逻辑

```ts
registerApp(list: interfaces.AppInfo | Array<interfaces.AppInfo>) {
  if (!Array.isArray(list)) list = [list];

  for (const appInfo of list) {
    if (!this.appInfos[appInfo.name]) {
      this.appInfos[appInfo.name] = appInfo;
    }
  }

  return this;
}
```

看上去仅仅是一些配置设定，那么所谓的路由绑定是从哪里发生的呢？这一切其实早就暗中进行了处理。

```ts
export type { interfaces } from '@garfish/core';
export { default as Garfish } from '@garfish/core';
export { GarfishInstance as default } from './instance';
export { defineCustomElements } from './customElement';
```

当调用 `import Garfish from 'garfish';`时, 使用的是默认创建好的全局Garfish实例。该逻辑简化版大概如下:

```ts
import { GarfishRouter } from '@garfish/router';
import { GarfishBrowserVm } from '@garfish/browser-vm';
import { GarfishBrowserSnapshot } from '@garfish/browser-snapshot';

// Initialize the Garfish, currently existing environment to allow only one instance (export to is for test)
function createContext(): Garfish {
  // Existing garfish instance, direct return
  if (inBrowser() && window['__GARFISH__'] && window['Garfish']) {
    return window['Garfish'];
  }

  const GarfishInstance = new Garfish({
    plugins: [GarfishRouter(), GarfishBrowserVm(), GarfishBrowserSnapshot()],
  });

  type globalValue = boolean | Garfish | Record<string, unknown>;
  const set = (namespace: string, val: globalValue = GarfishInstance) => {
    // NOTE: 这里有一部分状态判定的逻辑，以及确保只读，这里是精简后的逻辑
    window[namespace] = val;
  };

  if (inBrowser()) {
    // Global flag
    set('Garfish');
    Object.defineProperty(window, '__GARFISH__', {
      get: () => true,
      configurable: __DEV__ ? true : false,
    });
  }

  return GarfishInstance;
}

export const GarfishInstance = createContext();
```

其中核心逻辑为:
- 如果本地已经有`Garfish`实例，则直接从本地拿。（浏览器环境用于子应用，也可以从这边看出`garfish`并不支持其他的js环境
- 创建Garfish实例，并安装插件:
  - `GarfishRouter` 路由劫持能力
  - `GarfishBrowserVm` js运行时沙盒隔离
  - `GarfishBrowserSnapshot` 浏览器状态快照
- 在window上设置全局`Garfish`对象并标记`__GARFISH__`, 注意该变量为只读

其中安全和样式隔离的逻辑我们暂且不看，先看其核心插件 `GarfishRouter` 的实现

### 插件系统

`Garfish` 自己实现了一套插件协议，其本质是pubsub模型的变种(部分生命周期的emit阶段增加了异步操作的等待逻辑)。

我们以`Garfish`最核心的插件 `@garfish/router` 为学习例子，该代码的位置在: `garfish/packages/router/src/index.ts`

```ts
export function GarfishRouter(_args?: Options) {
  return function (Garfish: interfaces.Garfish): interfaces.Plugin {
    Garfish.apps = {};
    Garfish.router = router;

    return {
      name: 'router',
      version: __VERSION__,

      bootstrap(options: interfaces.Options) {
        let activeApp: null | string = null;
        const unmounts: Record<string, Function> = {};
        const { basename } = options;
        const { autoRefreshApp = true, onNotMatchRouter = () => null } =
          Garfish.options;

        async function active(
          appInfo: interfaces.AppInfo,
          rootPath: string = '/',
        ) {
          routerLog(`${appInfo.name} active`, {
            appInfo,
            rootPath,
            listening: RouterConfig.listening,
          });

          // In the listening state, trigger the rendering of the application
          if (!RouterConfig.listening) return;

          const { name, cache = true, active } = appInfo;
          if (active) return active(appInfo, rootPath);
          appInfo.rootPath = rootPath;

          const currentApp = (activeApp = createKey());
          const app = await Garfish.loadApp(appInfo.name, {
            basename: rootPath,
            entry: appInfo.entry,
            cache: true,
            domGetter: appInfo.domGetter,
          });

          if (app) {
            app.appInfo.basename = rootPath;

            const call = async (app: interfaces.App, isRender: boolean) => {
              if (!app) return;
              const isDes = cache && app.mounted;
              if (isRender) {
                return await app[isDes ? 'show' : 'mount']();
              } else {
                return app[isDes ? 'hide' : 'unmount']();
              }
            };

            Garfish.apps[name] = app;
            unmounts[name] = () => {
              // Destroy the application during rendering and discard the application instance
              if (app.mounting) {
                delete Garfish.cacheApps[name];
              }
              call(app, false);
            };

            if (currentApp === activeApp) {
              await call(app, true);
            }
          }
        }

        async function deactive(appInfo: interfaces.AppInfo, rootPath: string) {
          routerLog(`${appInfo.name} deactive`, {
            appInfo,
            rootPath,
          });

          activeApp = null;
          const { name, deactive } = appInfo;
          if (deactive) return deactive(appInfo, rootPath);

          const unmount = unmounts[name];
          unmount && unmount();
          delete Garfish.apps[name];

          // Nested scene to remove the current application of nested data
          // To avoid the main application prior to application
          const needToDeleteApps = router.routerConfig.apps.filter((app) => {
            if (appInfo.rootPath === app.basename) return true;
          });
          if (needToDeleteApps.length > 0) {
            needToDeleteApps.forEach((app) => {
              delete Garfish.appInfos[app.name];
              delete Garfish.cacheApps[app.name];
            });
            router.setRouterConfig({
              apps: router.routerConfig.apps.filter((app) => {
                return !needToDeleteApps.some(
                  (needDelete) => app.name === needDelete.name,
                );
              }),
            });
          }
        }

        const apps = Object.values(Garfish.appInfos);

        const appList = apps.filter((app) => {
          if (!app.basename) app.basename = basename;
          return !!app.activeWhen;
        }) as Array<Required<interfaces.AppInfo>>;

        const listenOptions = {
          basename,
          active,
          deactive,
          autoRefreshApp,
          notMatch: onNotMatchRouter,
          apps: appList,
          listening: true,
        };
        routerLog('listenRouterAndReDirect', listenOptions);
        listenRouterAndReDirect(listenOptions);
      },

      registerApp(appInfos) {
        const appList = Object.values(appInfos);
        // @ts-ignore
        router.registerRouter(appList.filter((app) => !!app.activeWhen));
        // After completion of the registration application, trigger application mount
        // Has been running after adding routing to trigger the redirection
        if (!Garfish.running) return;
        routerLog('registerApp initRedirect', appInfos);
        initRedirect();
      },
    };
  };
}
```

一个插件的结构形如 `(context: Garfish) => Plugin`

其中 `Plugin` 类型为一个对象，包含各个阶段的生命周期以及`name`/`version`等插件信息描述属性。

以 `router` 插件为例，其作用在`bootstrap`和`registerApp`两个生命周期阶段

> 生命周期定义可以在这里看到: garfish/packages/core/src/lifecycle.ts

以 `Garfish.run` 视角来看，执行顺序为: `beforeBootstrap -> beforeRegisterApp -> registerApp -> bootstrap -> ...` 因此我们先看`registerApp`的逻辑。

#### registerApp 阶段

```ts
this.hooks.lifecycle.registerApp.emit(currentAdds);
```
Garfish 执行 `registerApp`函数 完毕后触发 `registerApp` 生命周期hook, 将当前注册的子应用列表发送到事件回调

*garfish/packages/router/src/index.ts*
```ts
{
  name: 'router',
  registerApp(appInfos) {
    const appList = Object.values(appInfos);
    router.registerRouter(appList.filter((app) => !!app.activeWhen));
    // After completion of the registration application, trigger application mount
    // Has been running after adding routing to trigger the redirection
    if (!Garfish.running) return;
    routerLog('registerApp initRedirect', appInfos);
    initRedirect();
  },
}
```
插件接收到子应用列表, 将依次调用:
- `router.registerRouter` 注册到路由列表，其中会把不存在`activeWhen`属性的子应用过滤
- `initRedirect` 初始化重定向逻辑

*garfish/packages/router/src/context.ts*
```ts
export const RouterConfig: Options = {
  basename: '/',
  current: {
    fullPath: '/',
    path: '/',
    matched: [],
    query: {},
    state: {},
  },
  apps: [],
  beforeEach: (to, from, next) => next(),
  afterEach: (to, from, next) => next(),
  active: () => Promise.resolve(),
  deactive: () => Promise.resolve(),
  routerChange: () => {},
  autoRefreshApp: true,
  listening: true,
};

export const registerRouter = (Apps: Array<interfaces.AppInfo>) => {
  const unregisterApps = Apps.filter(
    (app) => !RouterConfig.apps.some((item) => app.name === item.name),
  );
  RouterConfig[apps] = RouterConfig.apps.concat(unregisterApps);
};

const Router: RouterInterface = {
  registerRouter,
};

export default Router;
```
在`registerRouter`阶段仅仅是将子应用注册

```ts
export const initRedirect = () => {
  linkTo({
    toRouterInfo: {
      fullPath: location.pathname,
      path: getPath(RouterConfig.basename!),
      query: parseQuery(location.search),
      state: history.state,
    },
    fromRouterInfo: {
      fullPath: '/',
      path: '/',
      query: {},
      state: {},
    },
    eventType: 'pushState',
  });
};
```
在`initRedirect`阶段则是调用`linkTo`函数去实现一个跳转，这里具体细节比较复杂。可以简单理解为子应用版页面跳转
```ts
// 重载指定路由
// 1. 当前的子应用需要销毁
// 2. 获取当前需要激活的应用
// 3. 获取新的需要激活应用
// 4. 触发函数beforeEach，在销毁所有应用之前触发
// 5. 触发需要销毁应用的deactive函数
// 6. 如果不需要激活应用，默认触发popstate应用组件view child更新
export const linkTo = async ({
  toRouterInfo,
  fromRouterInfo,
  eventType,
}: {
  toRouterInfo: RouterInfo;
  fromRouterInfo: RouterInfo;
  eventType: keyof History | 'popstate';
}) => Promise<void>
```

#### bootstrap 阶段

```ts
this.hooks.lifecycle.bootstrap.emit(this.options);
```

```ts
{
  name: 'router',
  bootstrap(options: interfaces.Options) {
    let activeApp: null | string = null;
    const unmounts: Record<string, Function> = {};
    const { basename } = options;
    const { autoRefreshApp = true, onNotMatchRouter = () => null } =
      Garfish.options;

    async function active(
      appInfo: interfaces.AppInfo,
      rootPath: string = '/',
    ) {
      routerLog(`${appInfo.name} active`, {
        appInfo,
        rootPath,
        listening: RouterConfig.listening,
      });

      // In the listening state, trigger the rendering of the application
      if (!RouterConfig.listening) return;

      const { name, cache = true, active } = appInfo;
      if (active) return active(appInfo, rootPath);
      appInfo.rootPath = rootPath;

      const currentApp = (activeApp = createKey());
      const app = await Garfish.loadApp(appInfo.name, {
        basename: rootPath,
        entry: appInfo.entry,
        cache: true,
        domGetter: appInfo.domGetter,
      });

      if (app) {
        app.appInfo.basename = rootPath;

        const call = async (app: interfaces.App, isRender: boolean) => {
          if (!app) return;
          const isDes = cache && app.mounted;
          if (isRender) {
            return await app[isDes ? 'show' : 'mount']();
          } else {
            return app[isDes ? 'hide' : 'unmount']();
          }
        };

        Garfish.apps[name] = app;
        unmounts[name] = () => {
          // Destroy the application during rendering and discard the application instance
          if (app.mounting) {
            delete Garfish.cacheApps[name];
          }
          call(app, false);
        };

        if (currentApp === activeApp) {
          await call(app, true);
        }
      }
    }

    async function deactive(appInfo: interfaces.AppInfo, rootPath: string) {
      routerLog(`${appInfo.name} deactive`, {
        appInfo,
        rootPath,
      });

      activeApp = null;
      const { name, deactive } = appInfo;
      if (deactive) return deactive(appInfo, rootPath);

      const unmount = unmounts[name];
      unmount && unmount();
      delete Garfish.apps[name];

      // Nested scene to remove the current application of nested data
      // To avoid the main application prior to application
      const needToDeleteApps = router.routerConfig.apps.filter((app) => {
        if (appInfo.rootPath === app.basename) return true;
      });
      if (needToDeleteApps.length > 0) {
        needToDeleteApps.forEach((app) => {
          delete Garfish.appInfos[app.name];
          delete Garfish.cacheApps[app.name];
        });
        router.setRouterConfig({
          apps: router.routerConfig.apps.filter((app) => {
            return !needToDeleteApps.some(
              (needDelete) => app.name === needDelete.name,
            );
          }),
        });
      }
    }

    const apps = Object.values(Garfish.appInfos);

    const appList = apps.filter((app) => {
      if (!app.basename) app.basename = basename;
      return !!app.activeWhen;
    }) as Array<Required<interfaces.AppInfo>>;

    const listenOptions = {
      basename,
      active,
      deactive,
      autoRefreshApp,
      notMatch: onNotMatchRouter,
      apps: appList,
      listening: true,
    };
    routerLog('listenRouterAndReDirect', listenOptions);
    listenRouterAndReDirect(listenOptions);
  },
}
```

`bootstrap`阶段主要构造路由配置，并调用`listenRouterAndReDirect(listenOptions)`来进行路由的代理/拦截
其中主要需要关心的`active`操作(即子应用挂载逻辑)做了以下事情:
- 调用 `Garfish.loadApp` 将子应用挂载到子应用挂载节点上(Promise 同步加载)
- 在 `Garfish.apps` 记录该app
- 注册到 unmounts 记录销毁逻辑

```ts
/**
 * 1.注册子应用
 * 2.对应子应用激活，触发激活回调
 * @param Options
 */
export const listenRouterAndReDirect = ({
  apps,
  basename = '/',
  autoRefreshApp,
  active,
  deactive,
  notMatch,
  listening = true,
}: Options) => {
  // 注册子应用、注册激活、销毁钩子
  registerRouter(apps);

  // 初始化信息
  setRouterConfig({
    basename,
    autoRefreshApp,
    // supportProxy: !!window.Proxy,
    active,
    deactive,
    notMatch,
    listening,
  });

  // 开始监听路由变化触发、子应用更新。重载默认初始子应用
  listen();
};
```

```ts
export const registerRouter = (Apps: Array<interfaces.AppInfo>) => {
  const unregisterApps = Apps.filter(
    (app) => !RouterConfig.apps.some((item) => app.name === item.name),
  );
  RouterSet('apps', RouterConfig.apps.concat(unregisterApps));
};
```

`registerRouter`没有什么特殊的，仅仅管理路由状态

接下来看一下`listen()`函数做的事情:

```ts
export const listen = () => {
  normalAgent();
  initRedirect();
};
```

`initRedirect`我们之前看过了，现在我们主要看`normalAgent`的实现

*garfish/packages/router/src/agentRouter.ts*
```ts
export const normalAgent = () => {
  // By identifying whether have finished listening, if finished listening, listening to the routing changes do not need to hijack the original event
  // Support nested scene
  const addRouterListener = function () {
    window.addEventListener(__GARFISH_BEFORE_ROUTER_EVENT__, function (env) {
      RouterConfig.routerChange && RouterConfig.routerChange(location.pathname);
      linkTo((env as any).detail);
    });
  };

  if (!window[__GARFISH_ROUTER_FLAG__]) {
    // Listen for pushState and replaceState, call linkTo, processing, listen back
    // Rewrite the history API method, triggering events in the call

    const rewrite = function (type: keyof History) {
      const hapi = history[type];
      return function (this: History) {
        const urlBefore = window.location.pathname + window.location.hash;
        const stateBefore = history?.state;
        const res = hapi.apply(this, arguments);
        const urlAfter = window.location.pathname + window.location.hash;
        const stateAfter = history?.state;

        const e = createEvent(type);
        (e as any).arguments = arguments;

        if (
          urlBefore !== urlAfter ||
          JSON.stringify(stateBefore) !== JSON.stringify(stateAfter)
        ) {
          window.dispatchEvent(
            new CustomEvent(__GARFISH_BEFORE_ROUTER_EVENT__, {
              detail: {
                toRouterInfo: {
                  fullPath: urlAfter,
                  query: parseQuery(location.search),
                  path: getPath(RouterConfig.basename!, urlAfter),
                  state: stateAfter,
                },
                fromRouterInfo: {
                  fullPath: urlBefore,
                  query: parseQuery(location.search),
                  path: getPath(RouterConfig.basename!, urlBefore),
                  state: stateBefore,
                },
                eventType: type,
              },
            }),
          );
        }
        // window.dispatchEvent(e);
        return res;
      };
    };

    history.pushState = rewrite('pushState');
    history.replaceState = rewrite('replaceState');

    // Before the collection application sub routing, forward backward routing updates between child application
    window.addEventListener(
      'popstate',
      function (event) {
        // Stop trigger collection function, fire again match rendering
        if (event && typeof event === 'object' && (event as any).garfish)
          return;
        if (history.state && typeof history.state === 'object')
          delete history.state[__GARFISH_ROUTER_UPDATE_FLAG__];
        window.dispatchEvent(
          new CustomEvent(__GARFISH_BEFORE_ROUTER_EVENT__, {
            detail: {
              toRouterInfo: {
                fullPath: location.pathname,
                query: parseQuery(location.search),
                path: getPath(RouterConfig.basename!),
              },
              fromRouterInfo: {
                fullPath: RouterConfig.current!.fullPath,
                path: getPath(
                  RouterConfig.basename!,
                  RouterConfig.current!.path,
                ),
                query: RouterConfig.current!.query,
              },
              eventType: 'popstate',
            },
          }),
        );
      },
      false,
    );

    window[__GARFISH_ROUTER_FLAG__] = true;
  }
  addRouterListener();
};
```

`normalAgent` 做了以下事情:
- 通过`rewrite`函数重写`history.pushState`和`history.pushState`
  - `rewrite`函数则是在调用以上方法的前后增加了一些当前情况的快照，如果`url`/`state`发生变化则触发`__GARFISH_BEFORE_ROUTER_EVENT__`事件
- 对`popstate`事件增加监听
- 调用 `addRouterListener` 增加路由监听回调。监听方法基于浏览器内置的事件系统，事件名: `__GARFISH_BEFORE_ROUTER_EVENT__`

综上, `router` 通过监听`history`的方法来执行副作用调用`linkTo`函数，而`linkTo`函数则通过一系列操作将匹配的路由调用`active`方法，将不匹配的路由调用`deactive`方法以实现类型切换

这时候我们再回过头来看一下`active`函数的实现

```ts
async function active(
  appInfo: interfaces.AppInfo,
  rootPath: string = '/',
) {
  routerLog(`${appInfo.name} active`, {
    appInfo,
    rootPath,
    listening: RouterConfig.listening,
  });

  // In the listening state, trigger the rendering of the application
  if (!RouterConfig.listening) return;

  const { name, cache = true, active } = appInfo;
  if (active) return active(appInfo, rootPath);
  appInfo.rootPath = rootPath;

  const currentApp = (activeApp = createKey());
  const app = await Garfish.loadApp(appInfo.name, {
    basename: rootPath,
    entry: appInfo.entry,
    cache: true,
    domGetter: appInfo.domGetter,
  });

  if (app) {
    app.appInfo.basename = rootPath;

    const call = async (app: interfaces.App, isRender: boolean) => {
      if (!app) return;
      const isDes = cache && app.mounted;
      if (isRender) {
        return await app[isDes ? 'show' : 'mount']();
      } else {
        return app[isDes ? 'hide' : 'unmount']();
      }
    };

    Garfish.apps[name] = app;
    unmounts[name] = () => {
      // Destroy the application during rendering and discard the application instance
      if (app.mounting) {
        delete Garfish.cacheApps[name];
      }
      call(app, false);
    };

    if (currentApp === activeApp) {
      await call(app, true);
    }
  }
}
```

其核心代码则是调用了`Garfish.loadApp`方法来执行加载操作。

### 应用加载

接下来我们看一下`loadApp`函数

garfish/packages/core/src/garfish.ts
```ts
loadApp(
  appName: string,
  options?: Partial<Omit<interfaces.AppInfo, 'name'>>,
): Promise<interfaces.App | null> {
  assert(appName, 'Miss appName.');

  let appInfo = generateAppOptions(appName, this, options);

  const asyncLoadProcess = async () => {
    // Return not undefined type data directly to end loading
    const stop = await this.hooks.lifecycle.beforeLoad.emit(appInfo);

    if (stop === false) {
      warn(`Load ${appName} application is terminated by beforeLoad.`);
      return null;
    }

    //merge configs again after beforeLoad for the reason of app may be re-registered during beforeLoad resulting in an incorrect information
    appInfo = generateAppOptions(appName, this, options);

    assert(
      appInfo.entry,
      `Can't load unexpected child app "${appName}", ` +
        'Please provide the entry parameters or registered in advance of the app.',
    );

    // Existing cache caching logic
    let appInstance: interfaces.App | null = null;
    const cacheApp = this.cacheApps[appName];

    if (appInfo.cache && cacheApp) {
      appInstance = cacheApp;
    } else {
      try {
        const [manager, resources, isHtmlMode] = await processAppResources(
          this.loader,
          appInfo,
        );

        appInstance = new App(
          this,
          appInfo,
          manager,
          resources,
          isHtmlMode,
          appInfo.customLoader,
        );

        // The registration hook will automatically remove the duplication
        for (const key in this.plugins) {
          appInstance.hooks.usePlugin(this.plugins[key]);
        }
        if (appInfo.cache) {
          this.cacheApps[appName] = appInstance;
        }
      } catch (e) {
        __DEV__ && warn(e);
        this.hooks.lifecycle.errorLoadApp.emit(e, appInfo);
      }
    }

    await this.hooks.lifecycle.afterLoad.emit(appInfo, appInstance);
    return appInstance;
  };

  if (!this.loading[appName]) {
    this.loading[appName] = asyncLoadProcess().finally(() => {
      delete this.loading[appName];
    });
  }
  return this.loading[appName];
}
```

该函数做了以下操作:

- 首先执行`asyncLoadProcess`来异步加载app，如果app正在加载则返回该Promise
- *使用`generateAppOptions`计算全局+本地的配置，并通过黑名单过滤掉一部分的无用参数(filterAppConfigKeys)*
- 如果当前app已加载则直接返回缓存后的内容
- 如果是第一次加载，则执行 `processAppResources` 进行请求, 请求的地址为 `entry` 指定的地址。
- 当请求完毕后创建`new App`对象，将其放到内存中
- *应用插件/记录缓存/发布生命周期事件等*

<!-- TODO: processAppResources 和 App -->
