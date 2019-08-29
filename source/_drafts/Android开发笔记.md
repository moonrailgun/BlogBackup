---
title: Android开发笔记
tags:
  - Android
abbrlink: 1c5fece8
date: 2019-08-05 11:24:59
---

- `adb devices` 可以查看当前连接设备
- `adb connect` 可以通过TCP协议连接到设备
  > 如果mac上使用海马玩模拟器进行安卓开发调试的话，如果`adb devices`搜索不到设备的话可以使用 `adb connect 192.168.56.101` 来连接到设备
- `adb shell ps` 列出当前设备所有进程
- `adb logcat` 列出当前设备系统日志
  > 使用参数`--pid=<pid>`指定输出对应进程日志
