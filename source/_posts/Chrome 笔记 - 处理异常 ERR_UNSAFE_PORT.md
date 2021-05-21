---
title: Chrome 笔记 - 处理异常 ERR_UNSAFE_PORT
tags:
  - chrome
  - chromium
abbrlink: a118f8f2
date: 2021-05-21 09:36:53
---

在chrome进行本地开发时，可能会出现如下问题:

![](/images/chrome/1.png)

## 解决方案

- [https://superuser.com/questions/188006/how-to-fix-err-unsafe-port-error-on-chrome-when-browsing-to-unsafe-ports](https://superuser.com/questions/188006/how-to-fix-err-unsafe-port-error-on-chrome-when-browsing-to-unsafe-ports)

## 本质原因

请不要使用如下列出的端口, 因为这些端口被视为有意义的:
- [https://github.com/chromium/chromium/blob/805f50e9d42cf0ac5e3108ae2c6b36baa0ea5a90/net/base/port_util.cc#L64-L147](https://github.com/chromium/chromium/blob/805f50e9d42cf0ac5e3108ae2c6b36baa0ea5a90/net/base/port_util.cc#L64-L147)
