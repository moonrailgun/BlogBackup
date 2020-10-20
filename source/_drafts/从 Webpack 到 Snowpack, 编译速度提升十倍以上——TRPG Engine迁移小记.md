---
title: '从 Webpack 到 Snowpack, 编译速度提升十倍以上——TRPG Engine迁移小记'
tags:
  - Webpack
  - Snowpack
  - TRPG Engine
abbrlink: 74598ef5
date: 2020-10-17 19:41:35
---

## 动机

[`TRPG Engine`](https://github.com/TRPGEngine/Client)经过长久以来的迭代，项目已经显得非常臃肿了。数分钟的全量编译, 每次按下保存都会触发一次**10s**到**1m**不等的增量编译让我苦不堪言, 庞大的依赖使其每一次编译都会涉及很多文件和很多包，长时的编译时间大大降低了开发效率与迭代速度。

## 优化方式

经过一段时间的考察，我选择了[`Snowpack`](https://www.snowpack.dev/)作为解决方案。与`Webpack`不同的是，除了第一次的全量编译以外，`Snowpack`的增量编译不会涉及到庞大的`node_modules`文件夹, 准确来说只会编译变更文件本身。甚至于如果没有对依赖进行变更，下次的全量编译会直接动用之前编译的文件缓存，不需要花时间等待`node_modules`的编译。

为什么会这么快？这是由于`Snowpack`本身的实现与设计哲学有关的。相比`Webpack`, `Snowpack`利用了现代浏览器的本身的`module`系统，跳过复杂的模型之间的组织编译过程而只关注于变更文件本身的编译，这样当然快了。

拿`Snowpack`官方的一张图来说:
![](/images/snowpack/1.png)

`snowpack`的最小编译单位是文件，而`webpack`的最小编译单位为`chunk`, 而`chunk`还需要额外的计算, 不论是编译部分还是编译后的组装部分。snowpack的设计逻辑天生决定了她的速度。



**优化前(使用`webpack`):**

全量编译:
![](/images/snowpack/2.jpg)

增量编译:
![](/images/snowpack/3.jpg)

**优化后(使用`snowpack`):**

全量编译:
![](/images/snowpack/4.jpg)

增量编译:

![](/images/snowpack/5.jpg)

(看不到编译用时，但是体感在1s内. 而且该效果在电脑运行其他应用时更加显著)

*以上测试是保证电脑在空闲时间，且保存与操作内容为同一文件*
*该用时已经是平时操作的最快时间，为此我的MBR重启了一次强制清空了swap空间, 实际表现会更加显著*

## 遇到的坑与解决方案

`TRPG Engine`算是非常经典的`Webpack`应用了, 使用了各种Loader。光通用配置就有250+行，各种优化配置，各种alias。等等长时间迭代积攒下来的配置，因此毫不意外的会遇到很多问题与坑。

以下是我遇到的问题与解决方案:

- 问题1:
  - 入口文件使用的是[HtmlwebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/)编译的`handlebars`文件，而snowpack不支持`handlebars`文件作为入口
  - 解决方案：重写一个`snowpack`专用的入口文件。使用`handlebars`主要解决的是dll的问题，`snowpack`不需要处理这部分的优化因此直接跳过
- 问题2:
  - `snowpack`加载文件策略与node不同。有同名文件和文件夹会优先使用文件夹的index.js作为路径解析。具体看现象可以参考这个讨论: [https://github.com/snowpackjs/snowpack/discussions/1320](https://github.com/snowpackjs/snowpack/discussions/1320)
  - 解决方案：改名字，让文件夹与文件名不会出现重复。包括同名但是大小写不同的问题，因为底层是`node`的`fs.stat`实现，在大小写敏感的系统下依旧会视为同名
- 问题3:
  - `TRPG Engine`不但有web端，还有`react-native`端，而`react-native`是无法被正常解析的。我只想要处理web端的开发环境使用`snowpack`优化开发体验
  - 解决方案: `exclude`配置手动过滤
- 问题4:
  - tspath不支持，虽然有了`@snowpack/plugin-typescript`但是不支持tspath。
  - 解决方案: 手动写了一个自动解析的逻辑将其变成对应的[alias](https://www.snowpack.dev/#import-aliases)加到配置上
- 问题5:
  - 在css中引入了字体文件，但是无法正常加载。因为snowpack无法正确识别url指定的资源并将其打包(webpack是使用`css-loader`来实现的)
  - 解决方案:
    ```
    scripts: {
      'mount:font': 'mount src/web/assets/fonts --to /main/fonts',
    },
    ```
- 问题6::
  - 对于一些特殊的写法我不想影响webpack的实现但是`snowpack`不支持这种写法。比如使用[`externals`](https://webpack.js.org/configuration/externals/)实现的配置引入, 比如[DefinePlugin](https://webpack.js.org/plugins/define-plugin/)实现的`process.env`(在snowpack中必须使用[`import.meta.env`](https://www.snowpack.dev/#environment-variables)), 再比如`require`的使用
  - 解决方案: 我实现了一个[snowpack-plugin-replace](https://github.com/moonrailgun/snowpack-plugin-replace)插件用于将这些东西全部替换成我想要的代码。具体使用如下:
    ```javascript
    [
      'snowpack-plugin-replace',
      {
        list: [
          {
            from: /process\.env/g,
            to: 'import.meta.env',
          },
          {
            from: `require("../../package.json").version`,
            to: '"0.0.0"',
          },
          {
            from: `const resBundle = require("i18next-resource-store-loader!./langs/index.js");`,
            to: 'import resBundle from "./langs/zh-CN/translation.json"',
          },
          {
            from: 'import Config from "config";',
            to: `const Config = ${JSON.stringify({
              sentry: require('config').get('sentry'),
            })};`,
          },
        ],
      },
    ],
    ```
- 问题7:
  - rollup抛出无法解析`this`的警告
  - 解决方案: 使用context指向window来移除警告
    ```
    installOptions: {
      rollup: {
        context: 'window',
      },
    },
    ```
- 问题8:
  - snowpack打包目标路径与原有的build文件夹冲突
  - 解决方案: 修改输出目录为`.snowpack`并在gitignore中添加该文件夹
    ```
    devOptions: {
      out: '.snowpack',
    },
    ```
- 问题9:
  - 使用`@snowpack/plugin-typescript`内部包对全局变量的声明会出现重复声明的报错
  - 解决方案: `tsconfig`的`"skipLibCheck": true`
- 问题10:
  - 现有的依赖需要`@babel/plugin-transform-runtime`提供的`helpers`作为全局依赖
  - 解决方案: 经检查是用到了`regenerator`功能，手动安装`regenerator-runtime`并在包前引入`import 'regenerator-runtime/runtime';`
- 问题11:
  - 部分依赖在其中部分代码使用了`require`作为引入方式, 而`snowpack`无法正确处理`require`
  - 解决方案: 检查后发现都已经修改。升级依赖到最新版即可
- 问题12:
  - 在使用less的import逻辑无法正常运行，这是由于`snowpack`的具体实现决定的。
  - 暂时无法解决，使用`snowpack-plugin-replace`将其替换为css文件导入作为临时解决方案, 见讨论: [Github](https://github.com/snowpackjs/snowpack/discussions/1360)

## 总结

Snowpack虽然作为一个新兴的打包工具，目前尚不是非常完善, 功能也没有webpack这样丰富与齐全。但是它的新的打包设计对于有一定规模的前端应用还是非常优秀的。能极大提升开发效率。不失为一种好的解决方案。当然最后输出还是需要使用webpack对其进行一定的优化，毕竟原生的module支持目前浏览器的支持度还没有达到覆盖一个理想的地步[https://caniuse.com/es6-module](https://caniuse.com/es6-module)

最后这是我最后提交的[pr](https://github.com/TRPGEngine/Client/pull/88/files)
