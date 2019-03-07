---
title: pomelo框架制作游戏初探(一)
tags:
  - pomelo
  - 游戏开发
  - WhiteWord
  - NodeJS
abbrlink: 2d40853
date: 2015-11-26 15:29:34
---
## 前言 ##
很早就关注过NodeJS的高性能服务端开发。所以很早就想要用NodeJS作为后台服务器来开发一款网络游戏。
自己写过原生的游戏服务端然而性能并不高。本地测试就会占用很大一部分资源，可以预见的是原生开发的难度远远大于基于框架开发。毕竟框架虽然需要一定的学习成本但是毕竟框架是无数程序员不断优化的成果。写出来的东西一定是好过自己单干的。
因此在一定的市场调查（其实就是推度娘）过后我选中了网易开发的pomelo框架。有完整的DEMO，和完善的文档（顺便吐个槽，国人开发的东西API文档居然全是用的英文）

## 安装 ##
[此处为官网WIKI](https://github.com/NetEase/pomelo/wiki/%E5%AE%89%E8%A3%85pomelo)
### windows环境 ###
- [NodeJS](http://nodejs.org/download/)
- [python](https://www.python.org/)(2.5<version<3.0)
- VC++ 编译器，包含在Visual Studio 2010中（VC++ 2010 Express亦可）。对于windows8的用户，需要安装Microsoft Visual Studio C++ 2012。
### Mac OS环境 ###
- [NodeJS](http://nodejs.org/download/)
- [Xcode Command Line Tools](https://developer.apple.com/downloads/index.action?q=xcode)或者[Xcode](https://developer.apple.com/xcode/)的完整包
- make工具

### pomelo ###
npm 安装
``` bash
$ npm install pomelo -g
```
git 安装
``` bash
$ git clone https://github.com/NetEase/pomelo.git
$ cd pomelo
$ npm install -g
```

## HelloWorld ##
### 新建项目 ###
``` bash
$ mkdir HelloWorld
$ cd HelloWorld
$ pomelo init
```
或
``` bash
$ pomelo init ./HelloWorld
```
两者等价

然后进入HelloWorld文件夹，安装依赖包
``` bash
$ sh npm-install.sh
```
npm-install.sh的逻辑就是分别进入该项目的两个主要文件夹game-server和web-server
使用npm install命令安装文件依赖

### 启动项目 ###
启动项目需要分别进入两个主要文件夹
启动game-server服务器：
``` bash
$ cd game-server
$ pomelo start
```
启动web-server服务器：
``` bash
$ cd web-server
$ node app 
```

node [appName]是NodeJS启动传统NodeJS应用的方法，至于pomelo start的作用尚不明确。暂时无需理会

### 运行项目 ###
根据启动web-server的提示打开 http://127.0.0.1:3001/ 。点击按钮发生产生响应。则说明服务器正常。否则则说明服务器不连通。可以通过[Pomelo Club](http://nodejs.netease.com/)咨询排除错误
![](https://github.com/NetEase/pomelo/wiki/images/helloworld_test_snapshot.png)

### 关闭项目 ###
官方给出的关闭方法是
``` bash
$ cd game-server
$ pomelo stop	#正常关闭
```
或
``` bash
$ cd game-server
$ pomelo kill	#强制关闭
```
然而我发现其实用Ctrl + C 也可以实现关闭服务器的作用，可以通过命令 `pomelo list` 查看到服务器已经被关闭。可能与pomelo kill命令同理
