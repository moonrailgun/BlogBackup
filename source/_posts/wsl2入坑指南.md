---
title: wsl2入坑指南
tags:
  - wsl
  - wsl2
  - Ubuntu 18.04
date: 2020-4-4 03:06:34
---

## 背景

WSL2支持了docker环境，这给了我一个入坑wsl的理由。在一段时间的配置和踩坑以后我将wsl配置需求记录下来

任务目标:
- 配置wsl2
- 在wsl安装docker环境
- 搭建基本环境

## 安装

### 更新Windows10的版本以安装wsl2

> WSL 2 仅适用于 Windows 10 版本 18917 或更高版本

因此首先我们要window10版本升级到匹配的版本。目前来说正式发行版无法升级到相应版本，因此需要启用开发者预览版。启用方式是搜索`insider`打开`Windows 预览体验计划`的设置页面（在设置的 `更新和安全` 的最后一项）

根据提示将自己的微软账号注册为开发者账号。在获取预览版本的频率中选择 `慢(Slow)` 因为我们需要一个相对稳定的版本。

然后手动检测windows更新即可升级到符合条件的版本

*PS: 注意, 更新版本以后可能会丢失一些windows的系统设置。需要手动检查并重新设置回来*

### 启用wsl2

以**管理员身份**打开Powershell

首先启用wsl
```powershell
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```
重启计算机

以管理员身份打开Powershell
```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```
重启计算机

在`Microsoft Store`搜索`wsl`下载自己喜欢的Linux系统
- [在 Windows 10 上安装](https://docs.microsoft.com/zh-cn/windows/wsl/install-win10#install-your-linux-distribution-of-choice)

> 注意!!!!  
> 如果你使用wsl2的目的是为了docker。请务必选择Ubuntu 18.04系统! 因为Debian无法正常启动docker服务(其他系统没有测试过)! 

在Powershell中查看自己当前已安装的Linux系统与使用的版本
```powershell
wsl -l -v
# 或
wsl --list --verbose
```

设置linux系统使用的wsl版本。wsl1和wsl2据开发者所说会一直共存下去。因此要手动分配
```powershell
wsl --set-version <Distro> 2
```
`<Distro>` 替换为上面列出的系统名称


将wsl2设置为默认的wsl体系
```powershell
wsl --set-default-version 2
```
这会使你安装的任何新发行版均初始化为 WSL 2 发行版。

### 将软件源更换为清华源(可选)

- [清华源](https://mirror.tuna.tsinghua.edu.cn/help/ubuntu/)
```bash
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
sudo vim /etc/apt/sources.list
```
将软件源设置为国内源的话操作会更加流畅

### 安装Docker
进入wsl, 输入`uname -a`可以检测版本

#### 快速安装Docker
```bash
$ curl -fsSL https://get.docker.com -o get-docker.sh
$ sudo sh get-docker.sh
$ sudo service docker start
$ sudo usermod -aG docker $USER
```

使用`service docker status`查看docker服务的状态

### 安装zsh作为常用的shell
```bash
# 安装zsh
sudo apt-get install zsh

# 安装oh-my-zsh
sh -c "$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```


## 参考资料

微软: [WSL 2 的安装说明](https://docs.microsoft.com/zh-cn/windows/wsl/wsl2-install)
知乎: [WSL 2中安装Docker](https://zhuanlan.zhihu.com/p/74489613)
