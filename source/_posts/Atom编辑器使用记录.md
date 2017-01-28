title: Atom编辑器使用记录  
tags:
  - atom  
date: 2016-11-18 19:24:08
---

# 概述

今天安装了Github开发的开源文本编辑软件Atom感觉很不错。而且对于markdown的编写也很友好。写篇文章记录一下对于atom的使用经历。同时也可以为后来人对atom这款非常棒的编辑器的使用进行一个参考。  
PS：我感觉我的 _markdown pad2_ 和 _sublime_ 这两款软件可以删了

# 安装

网址:  
[Github](https://github.com/atom/atom)  
[官网](https://atom.io/)  
下载发布版本:  
[releases](https://github.com/atom/atom/releases)  

# 使用

## 基础快捷键

**调出命令控制面板** `Ctrl`+`Shift`+`P`

## 添加中文语言包

打开Settings->Install。搜索扩展包`simplifed-chinese-menu`，安装。实现对界面的本地化(也可以使用英文原版)。

## 添加中文拼写检查

在 **扩展** 项中搜索`spell-check`扩展。打开 **设置**。在`locales`项中写入`zh_CN`。完成中文拼写检测的设置(然而并没有实际拼写检查的作用)。

## 娱乐插件

在atom社区有一款神奇的应用。名为`activate-power-mode`。在文本输入框内输入文本的时候会有神奇的效果(计数，震动，粒子效果)。虽然实际上对于编程没有什么好处。但是在实际的代码编辑中不失为一种娱乐的方式。毕竟我们需要一些乐趣来为一成不变的代码编写增加娱乐。特别是当我们灵感勃发的时候
*PS：如果不适应屏幕抖动的效果感觉晃眼睛的话建议关闭屏幕抖动效果仅保留粒子效果*

## 代码测试插件

传统情况下我们要测试一行代码的结果必须运行。往往需要切出窗口然后运行代码。而atom有一个插件可以实现在编辑器中运行代码查看结果。 `Script`

> Run scripts based on file name, a selection of code, or by line number.

## 代码美化插件

支持多种代码的美化操作。其名为`atom-beautify`。可以再设置面板中对每个语言代码进行设置。

> Beautify HTML, CSS, JavaScript, PHP, Python, Ruby, Java, C, C++, C#, Objective-C, CoffeeScript, TypeScript, Coldfusion, SQL, and more in Atom

## 图标美化插件

原始图标仅有文件夹和文件两种类型。使用`file-icons`插件将各个不同类型后缀的文件应用不同的图标。方便快速区分文件。

> Assign file extension icons and colours for improved visual grepping  
![](https://i.github-camo.com/7c2229cb27f3dd0e944e1ad95d65a6f03da9b316/68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f44616e42726f6f6b65722f66696c652d69636f6e732f6d61737465722f707265766965772e706e67)

## 选中高亮插件

用过sublime的用户一定会知道。sublime有个特性非常好用那就是可以高亮该文档中所有被选中的文字。对于快速查找该变量的使用非常方便。而atom原生并不自带这个功能。因此有个插件能够帮助用户实现这个功能。那就是`highlight-selected`。简单安装后即可使用

## 浏览器插件
做html技术的可能会需要。因为很多时候我们并不想开个多余的浏览器(或者浏览器的标签页)。那么在编辑器中打开一个浏览器的标签页也许是个不错的选择。我喜欢atom给我拖曳的方式让我自由的修改我的工作空间。那么多多使用多个子面板。其中一个用于显示输出的结果。也许是小窗口的用户一个不错的选择  
这个插件的名字叫`browser-plus`

## 网页服务器插件
`atom-live-server`插件可以在本地快速开启一个网页服务器，并且还自带ws服务可以提供热更新（即文件保存自动刷新）。可以说是网页、网站前端开发者必备的插件。轻量级、快速。

## 代码地图
小地图`minimap`。不多说你懂的，要是不懂我也没办法。Atom上minimap还附带一堆实用相关插件可以根据需求自行安装

## 颜色代码显示
`pigments` 一款可以让颜色代码背景色变为该种颜色背景的插件。很实用且直观
