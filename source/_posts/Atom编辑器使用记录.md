title: Atom编辑器使用记录  
date: 2016-11-18 19:24:08  
tags:
- atom
---

## 概述 ##
今天安装了Github开发的开源文本编辑软件Atom感觉很不错。而且对于markdown的编写也很友好。写篇文章记录一下对于atom的使用经历。同时也可以为后来人对atom这款非常棒的编辑器的使用进行一个参考。  
PS：我感觉我的 *markdown pad2* 和 *sublime* 这两款软件可以删了

## 安装 ##

网址:  
[Github](https://github.com/atom/atom)  
[官网](https://atom.io/)  
下载发布版本:  
[releases](https://github.com/atom/atom/releases)

## 使用 ##

### 基础快捷键 ###
**调出命令控制面板**
`Ctrl`+`Shift`+`P`

### 添加中文语言包 ###
打开Settings->Install。搜索扩展包`simplifed-chinese-menu`，安装。实现对界面的本地化(也可以使用英文原版)。

### 添加中文拼写检查 ###
在 **扩展** 项中搜索`spell-check`扩展。打开 **设置**。在`locales`项中写入`zh_CN`。完成中文拼写检测的设置(然而并没有什么用)。

### 娱乐插件 ###
在atom社区有一款神奇的应用。名为`activate-power-mode`。在文本输入框内输入文本的时候会有神奇的效果(计数，震动，粒子效果)。虽然实际上对于编程没有什么好处。但是在实际的代码编辑中不失为一种娱乐的方式。毕竟我们需要一些乐趣来为一成不变的代码编写增加娱乐。特别是当我们灵感勃发的时候

### 代码测试插件 ###
传统情况下我们要测试一行代码的结果必须运行。往往需要切出窗口然后运行代码。而atom有一个插件可以实现在编辑器中运行代码查看结果。
`Script`
> Run scripts based on file name, a selection of code, or by line number.
