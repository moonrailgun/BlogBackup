---
title: 记录一次docker占用过大导致磁盘爆炸的问题
tags:
  - Linux
date: 2024-7-15 22:49:01
---

## 背景

通过告警发现磁盘被占满

## 解决方式

通过命令行工具 `ncdu` 发现这个文件过大 `/var/lib/docker/containers/92ca12ee784ccd5dc44c367046d72f6c0cae4668e50fae613567dc0f4de024a3/92ca12ee784ccd5dc44c367046d72f6c0cae4668e50fae613567dc0f4de024a3-json.log`'

```
ls -lh /var/lib/docker/containers/92ca12ee784ccd5dc44c367046d72f6c0cae4668e50fae613567dc0f4de024a3/92ca12ee784ccd5dc44c367046d72f6c0cae4668e50fae613567dc0f4de024a3-json.log

-rw-r----- 1 root root 15G Jul 15 22:37 /var/lib/docker/containers/92ca12ee784ccd5dc44c367046d72f6c0cae4668e50fae613567dc0f4de024a3/92ca12ee784ccd5dc44c367046d72f6c0cae4668e50fae613567dc0f4de024a3-json.log
```

检查后发现是一个日志文件，占据了 15G 之多.

使用命令 `cat /dev/null > /var/lib/docker/containers/92ca12ee784ccd5dc44c367046d72f6c0cae4668e50fae613567dc0f4de024a3/92ca12ee784ccd5dc44c367046d72f6c0cae4668e50fae613567dc0f4de024a3-json.log` 将其清理，因为这个文件如果被一直占用的话直接使用`rm`是不会释放磁盘空间的。因此直接使用 `/dev/null` 覆盖文件即可实现立即释放空间的作用
