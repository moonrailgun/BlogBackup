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

## 一些批量操作

- 启动所有的容器: `docker start $(docker ps -a | awk '{ print $1}' | tail -n +2)`
- 关闭所有的容器: `docker stop $(docker ps -a | awk '{ print $1}' | tail -n +2)`
- 删除所有的容器: `docker rm $(docker ps -a | awk '{ print $1}' | tail -n +2)`
- 删除所有的镜像: `docker rmi $(docker images | awk '{ print $3}' | tail -n +2)`

tail -n +2 表示从第二行开始读取
