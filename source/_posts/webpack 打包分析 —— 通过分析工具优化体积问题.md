---
title: webpack 打包分析 —— 通过分析工具优化体积问题
tags:
  - webpack
  - javascript
  - 代码优化
abbrlink: '15675e42'
date: 2022-10-03 13:42:50
---

## 背景

众所周知现在前端代码的体积越来越大，虽然网速也上去了但是还是跟不上业务膨胀的速度。而`vite`还比较年轻，大部分的项目依旧还在使用`webpack`进行打包。

而另一方面`webpack`也确实在精细优化上有足够的优势。在对代码结构做深度分析与优化的时候也有非常不可替代的作用。

## 开始优化

而我的项目也非常久违的没有观察过打包内容了，因此我决定久违的看一眼。

在优化代码之前，我们需要找到问题。通过官方推荐的 [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) 来输出打包体积图

用法:
```js
if (process.env.ANALYSIS) { // 任意环境变量, 确保仅正常打包不输出分析报告
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static', // 将结果输出为html文件
      openAnalyzer: true, // 打包完成后打开页面
    }) as any,
  );
}
```

打包后自动打开网页展示如下内容:

![](/images/webpack/1.png)

一眼就看到三个大块的包，其中 `all.json` 和 `twitter.json` 两个包都是懒加载的，可以理解，但是为什么 `vendors` 中的 `lodash.js` 这么大？我一眼看出你小子不对劲！

![](/images/webpack/2.png)

放大看一眼，好家伙，一个包占用500多KB, 比`antd`还要高。而且 `lodash` 中并不是所有的函数都会被使用的，不应该整个包被打进来。

我们用 [webpack-stats-viewer-plugin](https://github.com/moonrailgun/webpack-stats-viewer) 来对其进行进一步分析

用法:
```js
if (process.env.ANALYSIS) { // 任意环境变量, 确保仅正常打包不输出分析报告
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static', // 将结果输出为html文件
      openAnalyzer: true, // 打包完成后打开页面
    }) as any,
    new WebpackStatsViewerPlugin({
      open: true,
    }),
  );
}
```

找到异常的那个 `chunk`

![](/images/webpack/3.png)

点开右侧的 `modules` 中找到 `lodash`

![](/images/webpack/4.png)

通过 [webpack-stats-viewer-plugin](https://github.com/moonrailgun/webpack-stats-viewer) 的进一步分析我们可以很清晰的看到这个包是被 `react-fastify-form` 引入的。

我们看一下源码:

![](/images/webpack/5.png)

果然，在代码中其他地方都是使用 `lodash/xxxx` 引入的，而在划线这行却直接把整个包引入了进来(可能是因为)，而`lodash`这个包本身不支持`esmodule`, 因此导致lodash整个包被打入，白白多占了500多KB的依赖。要知道总共也就2MB!

那么找到原因就好修了，直接修改源码 -> 重新发布 -> 更新依赖一气呵成。

## 验收成果

最后让我们看一下修复好的成果：

![](/images/webpack/6.png)

瞬间少了一大块体积。可见能够利用好工具可以帮助我们更好的对 `webpack` 的产物进行优化。
