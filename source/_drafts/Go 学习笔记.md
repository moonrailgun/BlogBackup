---
title: Go 学习笔记
tags:
  - Go
  - 学习笔记
abbrlink: f12cbde5
date: 2020-09-22 14:09:56
---

`GoLand` 调试抛出异常
```
Version of Delve is too old for this version of Go (maximum supported version 1.12, suppress this error with --check-go-version=false)
```

因为`GoLand`自带的delve版本较低

手动安装最新版的delve

```
go get -u github.com/go-delve/delve/cmd/dlv
```

确保在终端打印
```
dlv version
```
输出版本号正确

```
which dlv
```
获得dlv程序所在地址

在`GoLand` `Hele->Edit Customer Properties`中设置`dlv.path=/path/to/dlv`。重启`GoLand`生效
