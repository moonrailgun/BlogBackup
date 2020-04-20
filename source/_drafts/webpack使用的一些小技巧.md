---
title: webpack使用的一些小技巧
tags:
  - webpack
  - javascript
  - webpack-dev-server
abbrlink: f4a03eb9
date: 2019-05-20 10:25:43
---

- 如何查看webpack-dev-server 生成的文件列表
  > 访问`/webpack-dev-server`来查看 [#62](https://github.com/webpack/webpack-dev-server/issues/62)

- 对于使用ESModule来打包的话。webpack可能会对文件是哪种导出模式有分歧。特别是对于`@babel/plugin-transform-runtime`插件来说。此时我们可以通过使用sourceType: unambiguous 来让其明确并消除webpack不明确类型的警告。[sourceType](https://babeljs.io/docs/en/options#sourcetype)
