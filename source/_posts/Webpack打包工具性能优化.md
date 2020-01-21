---
title: Webpack打包工具性能优化
tags:
  - Webpack
  - ES6
  - React
abbrlink: 993cf839
date: 2017-04-05 10:18:35
updated: 2020-01-21 17:02:53
---

## 前言
### 为什么要写这篇文章
在最近的项目中顺便学习了一下`React`.而`React`推荐使用`ES6`所以也顺便学习了一下`ES6`.然后现有浏览器不能直接支持`ES6`的语法因此需要第三方打包工具.这里学习使用了`Webpack`.然而`React`本身大小就有1M+.每次`Webpack`进行打包操作的时候总是会显得过于臃肿.消费时间近10s.因此写下本篇文章来记录自己的打包优化之路

## externals

### 优化方案
对于`React`这类第三方库而言.我们是不需要多次进行打包的因为我们本身不会对其源码进行操作修改.因此多次打包同一个包是一件多余的事情.因此我们要告诉`Webpack`我们不需要打包这个包.而只需要用手动的方式来直接引入预编译好的js版本即可.

### 解决方案
- 在网上下载预编译好的js文件
- 在HTML代码中(在调用打包过后的js文件前)引入预编译好的js文件
- 在`webpack.config.js`中添加`externals`字段.如以下写法:
```javascript
module.exports = {
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
}
```
- 删除不必要的node库,减小项目体积(如React:`npm uninstall --save react react-dom`)

## devtool

如果打包时启用了devtool, 请在生产环境下关闭或打到独立的sourcemap文件中。可以大大减少打包后的文件体积

## DllPlugin

dll是一种非常棒的优化手段。它直接以比较粗暴的方式将一些常用的，不修改的第三方库打包到独立的文件，使日常开发中不会去编译他。这种方式非常类似于[用CDN引用第三方库](https://www.jianshu.com/p/9248db0349fb)不过可以顺便对其进行一些特殊的处理。

首先创建一个 `webpack.dll.config.js` 文件
```javascript
const path = require('path');
const webpack = require('webpack');

// 原则上是需要全量导入 且共用的模块
const dllModules = ['react', 'react-dom', 'moment'];

module.exports = {
  entry: {
    vendor: [...dllModules],
  },
  output: {
    filename: 'dll_[name].js',
    library: '[name]_[hash]',
    path: path.resolve(__dirname, './dll'),
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, './dll/[name]-manifest.json'),
      name: '[name]_[hash]',
    }),
    // 该命令使仅打包moment的zh-cn语言文件
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
  ],
  mode: 'production',
};
```

独立编译
```bash
$ webpack --config webpack.dll.config.js
```

生成一个 `manifest.json` 和 一个 `dll_vendor.js` 文件

我们在我们正常的`webpack.config.js`文件中引用他
```javascript
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dllConfig = require('./dll/vendor-manifest.json');

module.exports = {
  // ...
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: dllConfig,
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(BUILD_PATH, './dll/dll_vendor.js'),
        to: '',
      },
    ]),
  ],
}
```

然后在HTML模板中手动增加该文件的引入即可
```html
<script src="/dll_vendor.js"></script>
```

*你也可以通过`dllConfig`的name属性来增加hash来实现更好的更新*
