---
title: Docker学习笔记
tags:
  - Docker
  - 学习笔记
abbrlink: 4a3d459a
date: 2018-09-10 14:16:28
---

## 概述

主要是记录一下在日常使用Docker遇到的一些问题和解决方案。

## 部分容器docker使用的文件必须是root:root权限

暂时没有找到好的办法可以让docker使用组权限使得多个用户都能编辑

比如mysql
