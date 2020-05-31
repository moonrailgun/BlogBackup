---
title: adb devices无法获取夜神模拟器的解决方案
tags:
  - android
  - adb
  - nox
abbrlink: 86a1d2a7
date: 2020-05-30 15:21:06
---

在开启模拟器的前提下。在终端输入

```bash
$ adb devices
```

如果没有看到夜神模拟器的设备。则将`${ANDROID_HOME}/platform-tools/adb.exe`复制并覆盖夜神模拟器根目录下的`adb.exe`与`nox_adb.exe`。

重启后查看效果(重启前确保后台的`adb.exe`与`nox_adb.exe`进程已被关闭)
