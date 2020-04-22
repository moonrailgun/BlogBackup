---
title: 快速构建软件文档——docusaurus v2
tags:
  - docusaurus
  - docusaurus v2
  - 文档
  - 静态网站
abbrlink: 856c955
date: 2020-04-15 09:13:23
---

## 背景

来源是想要给我的应用做一个首页。需要有文档、首页两项。如果文档中能插入一些比较复杂的内容(如在线预览)这样的功能的话就更好了

开始使用的是`docusaurus v1`, 后来发现他无法在markdown文档中插入`iframe`。 会触发一个诡异的bug，导致渲染中断，无法正常渲染后面的内容，因此就中断了。后来发现`docusaurus`开始开发了v2版。虽然处于Beta阶段但还是能进行初步的使用了。

- [docusaurus v2官方文档](https://v2.docusaurus.io/)

## 环境

- docusaurus v2.0.0-alpha.50

## 特性

- 使用React开发。可以体会到现代语言的优势。
- 内置文档、博客，集成[Algolia DocSearch](https://community.algolia.com/docsearch/)。开箱即用。
- 完全可定制的组件和样式, 增加完全的可定制化能力
- MDX实现。在Markdown中也能使用React组件

## 自定义独立页面

略过初始化内容。我们直接进入自定义的阶段。

docusaurus 的独立页面在`src/pages`文件夹中, 就和写React组件一样我们可以利用React很轻松的构建属于自己的页面, 首页就是index.js。

对于非模板化的页面。比如首页、showcase、问卷调查这些，都可以通过独立页面来实现。

## 自定义渲染组件

docusaurus 提供了很强的自定义能力，使用`@theme/*`引用组件。提供一套预设的组件用于渲染网站的各个部位。其内容在[https://github.com/facebook/docusaurus/tree/master/packages/docusaurus-theme-classic](https://github.com/facebook/docusaurus/tree/master/packages/docusaurus-theme-classic)

对于该项目中的每一个组件，我们都能进行定制。使用`docusaurus swizzle <theme name> [component name]`命令将样式包中的组件复制到自己的`src/theme`文件夹中。可以指定的替换相应组件的实现

如:
```bash
npm run swizzle @docusaurus/theme-classic Footer
```

来重写页脚。

`@theme/*` 引用会以此查找本地的`src/theme`文件夹的组件，主题包里的组件。

## 自定义markdown渲染

Markdown是我们写文档重要的工具，有时候Markdown基本的语法无法满足我们的需要，此时就可以自己编写渲染逻辑。这样在不丧失Markdown简洁的前提下给予我们文档更加强大的表现力

比如我就自己写了一个组件, 用于将代码与预览相互转化: [https://github.com/TRPGEngine/Server/blob/master/services/Website/website/src/plugins/remark-template-previewer.js](https://github.com/TRPGEngine/Server/blob/master/services/Website/website/src/plugins/remark-template-previewer.js)

当然还有一种方法是利用MDX的特性在Markdown中引用React组件

## 成果

- [https://trpgdoc.moonrailgun.com/](https://trpgdoc.moonrailgun.com/)

更多`docusaurus`的特性请查阅[官方文档](https://v2.docusaurus.io/)
