---
title: git使用方法简明教程 - 个人篇
tags:
  - git
abbrlink: 44a80e28
date: 2015-12-19 11:45:29
---

## git使用 ##
### 什么是git ###
git就是一个管理你项目代码，监控你代码的变更记录的一款软件。

### 下载git ###
在git官网上下载，推荐是带有gui的版本。下载地址自行百度

### Bash 和 GUI ###
下载安装完毕后右键菜单会多出来两项。分别为git bash和git gui。bash为git的命令行版本，gui为git的gui版本。在一个文件夹下右键选择其中之一。就是在当前文件下打开该工具
PS: git bash 也可以当做普通的命令行来使用

### 项目的创建与删除 ###
#### 创建 ####
在项目文件的根目录下右键，选中git bash。输入命令
```bash
$ git init
```
完成git文件创建，会在该目录下创建一个隐藏的文件夹 `.git`
该文件夹就是管理你代码的监控文件，文件夹总大小略大于你所有文本文件总大小
#### 删除 ####
文件夹设置为**显示隐藏的项目**，把`.git`文件夹删除就可以完成git项目的删除

## 代码管理 ##
代码管理对于新手来说并不建议使用bash版本的git。因为过于复杂。一般bash用于处理gui版本无法处理的一些复杂的git管理操作。因此这里使用gui版本进行。
对于个人使用。一个简单的主分支即可。主分支一般默认起名叫master。我会在之后的团队协作使用git的教程中详细说明分支的相关内容。
### 代码提交 commit ###
当代码与之前版本不同时，git把有过改动的文件列出来。点击缓存改动。将改动的文件添加到将要提交的队列。在提交描述处填写该次提交改动的描述，点击提交完成代码的提交。
注意，此处的提交是指提交到本地的git项目中。并不是提交到网上的代码仓库。当然也可以不提交到网上。
**描述格式**:
```bash
描述详情

描述细节1
描述细节2
```

**个人用的推荐的描述格式**:
```bash
XXX功能

ADD XXX功能
UPDATE 优化了XXX的逻辑
DELETE 删除冗余代码
FIXED 修复了不能XXX的BUG
```

### 代码上传 push ###
代码上传是指将git项目提交带网络上的代码仓库中
上传必须知道三个东西:
- git仓库的地址
- git仓库的个人账号
- git仓库的个人密码

在git gui中直接点击上传即可。在目标版本库中填入仓库的地址。然后上传的过程中会一一询问账号和密码。正确填写完成上传。

### 代码克隆 clone ###
代码克隆很简单。一局代码完事
```bash
$ git clone 项目的地址
```

### 历史记录 history ###
git gui左上角版本库中点击图示master分支(或所有分支)的历史完成查看

### 忽略文件 .gitignore ###
在项目的根目录创建.gitignore，可以忽略该文件的改动。不添加到git跟踪中格式支持通配符。一般用于忽略ide或者二进制打包生成的文件。
注释使用#
**examples**:
.idea/
node_modules/
*.tmp

## 使用github for windows进行简易处理 ##
github 官网提供了一个面向github的gui简易版本，可以帮助用户很方便的进行代码的管理，支持的基本操作有：
- 代码clone
- 添加项目
- 创建项目
- .gitignore管理
- remote远程管理
- 分支切换
- 代码提交
- 代码上传
- 代码同步
- pull请求
- 分支比较
- 历史查看
- ...

## 常用的一些代码仓库 ##
这里推荐一些流行的网络代码管理的提交平台，通过网络平台可以更好的分享代码，团队合作
#### 国外: ####
- github
- google code(墙)
- bitbucket
- gitlab

#### 国内: ####
- oschina
- code
- GitCafe
