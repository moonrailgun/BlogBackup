---
title: 源码快速定位工具 source-ref
tags:
  - 源码定位
  - 产研效能
abbrlink: da6d1d53
date: 2022-07-06 11:23:29
---

## 背景

`source-ref` 是一款通过网页点击快速定位到源码的工具，用于解决从视觉上快速定位到所在源码具体位置。与现有的`devtools`(vue-devtools/react-developer-tools)的源码定位互补

- UI框架支持 `React`, `Vue`框架
- 打包工具支持 `webpack`,`rollup`, `vite`
- 跳转方式支持 `vscode 打开`, `Github 打开`

官方网站: [https://sourceref.moonrailgun.com/](https://sourceref.moonrailgun.com/)
开源地址: [https://github.com/moonrailgun/source-ref](https://github.com/moonrailgun/source-ref)

## 演示

### 定位到Github源码
![github](/images/sourceref/1.gif)


### 使用vscode打开源码
![vscode](/images/sourceref/2.gif)

## 快速接入

以 `react + webpack` 为例:
```
npm install source-ref-runtime
npm install -D source-ref-loader
```

在 `webpack.config.json` 中, 处理jsx文件的loader的最下面插入`source-ref-loader`:
```js
{
  test: /.tsx?$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'esbuild-loader',
      options: {
        loader: 'tsx',
        target: 'es2015',
      },
    },
    {
      loader: 'source-ref-loader',
    },
  ],
}
```

在入口文件处，插入:

```js
import('source-ref-runtime').then(({ start }) => start())
```

打开项目，Alt(option in mac) + LMB(鼠标左键点击) 即可弹出选择框

更多示例见官网: [https://sourceref.moonrailgun.com/](https://sourceref.moonrailgun.com/)

## 原理

![原理](/images/sourceref/3.excalidraw.svg)

打包阶段:
- 解析源码到AST, 找到组件节点的开头部分插入当前所在位置信息
- 将处理好的AST转换回原来的代码形式

渲染阶段:
- 优化提示路径, 减少长路径带来的视觉污染(在devtools)
- 快捷键点击DOM元素，弹出选择框。
- 点击选择节点，通过打开vscode注册的 `URI Scheme` 从网页打开一个文件并定位到具体行号和列号
