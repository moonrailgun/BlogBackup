---
title: CentOS7 安装gcc手册
tags:
  - centos7
  - gcc
date: 2022-3-25 23:52:36
---

众所周知，`gcc`版本数都已经两位数了，yum源的直接安装gcc的最新版本还停留在`4.8.5`。而对于部分c++的应用来说，高版本的`gcc`是必不可少的。而现在中文网络上教你升级gcc的办法都是手动下载`gcc`源码然后去编译。

别急！在你选择去按照教程手动一步步编译前，静下心来。手动编译的坑数不胜数，而`Redhat` 官方早就提供了解决方案, 那就是`devtoolset`(在centos8中改名为gcc-toolset)

`devtoolset`类似于node中的nvm，允许你在同一环境下安装多个gcc环境而不冲突

使用方法很简单:
```bash
yum install centos-release-scl # 通过centos-release-scl源安装devtoolset包
yum install devtoolset-8
```

其中
```
devtoolset-3对应gcc4.x.x版本
devtoolset-4对应gcc5.x.x版本
devtoolset-6对应gcc6.x.x版本
devtoolset-7对应gcc7.x.x版本
devtoolset-8对应gcc8.x.x版本
devtoolset-9对应gcc9.x.x版本
devtoolset-10对应gcc10.x.x版本
```


为使其生效还需要手动执行切换一下版本
```bash
source /opt/rh/devtoolset-8/enable
```

当然可以把这行代码保存在 `.bashrc` / `.zshrc` 中以每次连接shell都自动执行
