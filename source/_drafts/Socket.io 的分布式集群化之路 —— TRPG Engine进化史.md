---
title: Socket.io 的分布式集群化之路 —— TRPG Engine进化史
tags:
  - TRPG Engine
  - Docker
  - docker-compose
  - Docker Swarm
abbrlink: c39c67f3
date: 2020-11-05 15:00:56
---

## 背景

在容器化与微服务盛行的当下, 分布式似乎已经变得十分常见。写一篇文章记录一下我将我自己的开源项目升级为分布式管理的经历。

[`TRPG Engine`](https://github.com/TRPGEngine/Client) 是一款即时讯通应用。以docker的角度来看是一款有状态(stateful)的容器，相比无状态的http服务增加了一部分难度。

## 选型

现在分布式的解决方案非常多。首先容器化解决方案毋庸置疑选择目前最流行的`docker`, 而编排工具基于目前的规模与资源限制(我的主服务器是只是一台2核4G的小机器)。我选择了`docker swarm`作为我的管理工具，因为我目前并不需要`k8s`的强大功能，而且没有太多资源给`k8s`吃。而`k3s`我依旧觉得占用资源比较多。而`docker swarm`作为docker内置的管理工具，虽然功能比较简陋但是满足我的基本需求。因此我决定使用`docker swarm`作为我的分布式之路的第一步。

## 准备工作

想要将一个服务从原来的单机实例变成多机需要一些准备工作。

#### 首先是日志的处理

日志是一个应用后续能够debug的重中之重，也是一切的基础。我选择了有免费方案的 [`loggly`](https://www.loggly.com/) 作为中心化的日志管理服务(等以后有资源了可以自己搭建elk)。使用 [@log4js-node/loggly](https://www.npmjs.com/package/@log4js-node/loggly) 将日志转发到`loggly`

不过`loggly`有一个缺点。就是对于中文的支持并不良好, 最好还是多使用英文来输出日志。

#### 其次是消息转发

<!-- TODO -->

#### 中心化配置中心

<!-- etcd3 -->

## Docker Compose 配置

## 参考文章

- [From Socket.io and Redis to a distributed architecture with Docker and Kubernetes](https://dev.to/sw360cab/scaling-websockets-in-the-cloud-part-1-from-socket-io-and-redis-to-a-distributed-architecture-with-docker-and-kubernetes-17n3)
- [Deploy your Stateful Web Applications in Docker Swarm using Traefik Sticky Sessions](https://boxboat.com/2017/08/03/deploy-web-app-docker-swarm-sticky-sessions/)
- [docker swarm和compose 的使用(阿里)](https://www.cnblogs.com/aspirant/p/11481805.html)
- [docker swarm service labels](http://man.hubwiz.com/docset/Docker.docset/Contents/Resources/Documents/docs.docker.com/ee/ucp/interlock/config/service-labels.html)
