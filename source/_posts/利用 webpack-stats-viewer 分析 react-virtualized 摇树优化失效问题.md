---
title: 利用 webpack-stats-viewer 分析 react-virtualized 摇树优化失效问题
tags:
  - webpack-stats-viewer
  - react-virtualized
  - webpack
  - 性能优化
  - 摇树优化
abbrlink: 8a830324
date: 2023-03-31 15:51:34
---

## 背景

在项目性能优化过程中，发现 react-virtualized 依赖过重，经过初步分析是因为react-virtualized 虽然只是引用了部分功能，但是实际打包的时候将所有的代码都打包导入了。

我们起一个新的项目看一下。

在入口文件我们仅仅使用导入一个List功能。然后仅仅是打印一下，看看结果。

![1.png](/images/webpack/react-virtualized/1.png)

![2.png](/images/webpack/react-virtualized/2.png)

可以看到，通过`webpack-bundle-analyzer` 的分析，我们可以看到 `react-virtualized` 这个包被完全打包打进了产出中，尽管没有用到里面任何的东西。

了解 esmodule 这种打包方式的都应该知道摇树优化(Tree Shaking)。当我们通过 esmodule 的方式引入一个支持 esmodule 的包时，不被使用的包会被移除，以减少最终产物的体积。在`react-virtualized` 的路径中，我们可以很明显的发现我们引入的代码文件都是在 es 目录下的，这意味着这个包是支持 esmodule 的，尽管我们只用了 `react-virtualized` 这个包，其他不相关的代码依旧被打包进去了。

很显然，在 `react-virtualized` 这个库中，我们的摇树优化失效了。通过 `webpack-bundle-analyzer` 我们可以很轻易的看出这一点，然而更加深入的信息我们就不得而知了。

## 排查问题

为了解决问题，我们需要知道为什么会发生这样的事情，因此接下来我们要用到一个新的工具 —— `webpack-stats-viewer-plugin`

使用方式如下:

```jsx
npm install -D webpack-stats-viewer-plugin
```

![3.png](/images/webpack/react-virtualized/3.png)

在每次 webpack 打包后，都会在输出目录生成一份打包报告。我们可以直接点开生成的报告看一下。大概内容是这样的:

![4.png](/images/webpack/react-virtualized/4.png)

相比于比较注重美观的网格树来说，列表的显示更加直白与清晰。列表中的每个项都是一个独立的chunk, 列表显示了这个chunk打包出来的文件名，大小，以及chunk间的引用关系(父 chunks, 子 chunks, 和 同级chunks)。因为本例非常简单所以只有一个chunk，在这里我们要对单个chunk进行分析，在之前我们看到了 `react-virtualized` 已经被全部打进去了，所以我们要找到 `react-virtualized` 摇树优化失效的原因。这里我们点开 `modules` 功能看一下

![5.png](/images/webpack/react-virtualized/5.png)

在弹出的popup中我们可以看到这个chunk包含的完整的模块列表，我们随便点开一个 `react-virtualized` 的模块

![6.png](/images/webpack/react-virtualized/6.png)

我们可以详细的看到一个模块的引用路径，引用原因，以及导入原因，以及一些优化建议。

需要注意的是黄色警告的内容，提示 `No export used, maybe has side effect` 。这就是我们主要要解决的问题，虽然这个模块提供了esmodule，但是却依旧会把所有的内容打包进去(尽管没有任何代码被引用)。

我们看一下这个文件, 在建议中提示我们第一行有副作用，我们进去看一下

![7.png](/images/webpack/react-virtualized/7.png)

在这里的第一行是个默认导出，我们继续跳转进去看一下

按照工具给出的提示，我们可以看到这个变量声明是具有副作用的

![8.png](/images/webpack/react-virtualized/8.png)

![9.png](/images/webpack/react-virtualized/9.png)

看起来是因为一个 `/*#**PURE***/` 标记无法处理连续的赋值操作导致编译的时候失效。

另一方面我们可以很明显发现有一些编译时注入的代码，

![10.png](/images/webpack/react-virtualized/10.png)

这些代码是编译时babel注入的polyfill，而当我们跳转过去看一下会发现这些内容不能满足esmodule的要求，require语法在摇树优化时会因为无法被正确的处理，为了确保整体代码不会出问题，因此webpack会把require所包含的内容一起打进去。

![11.png](/images/webpack/react-virtualized/11.png)

两方原因造成了`react-virtualized` 没有被使用的代码在引入时都被打包进去了，而类似的原因在这个库中到处都是。

这也难怪这个包的es 不生效了。

## 解决方案

解决方法很简单，就是直接通过es的引入方式来引入, 如:

![12.png](/images/webpack/react-virtualized/12.png)

![13.png](/images/webpack/react-virtualized/13.png)

![14.png](/images/webpack/react-virtualized/14.png)

此时我们再看打包后的内容就干净了很多。

## 相关链接

演示项目: [https://stackblitz.com/edit/github-rx5vpd](https://stackblitz.com/edit/github-rx5vpd)

webpack-stats-viewer: [https://github.com/moonrailgun/webpack-stats-viewer](https://github.com/moonrailgun/webpack-stats-viewer)
