---
title: 开源类Discord的noIM应用Tailchat推荐 —— 不仅仅是聊天
tags:
  - Tailchat
  - IM
  - noIM
date: 2023-04-24 16:17:34
---

## 简单介绍

相信大家都或多或少了解过 `Discord` / `Slack` 这样大火的即时通讯应用。两者分别在各自的领域有很大的成就。

而今天我来介绍一下他们两者的开源替代品，甚至是升级版 —— `Tailchat`.

![](/images/tailchat/hello.png)

## 概念

`Tailchat` 自身定位为 `noIM` (**not only IM**), 与其他IM应用最大的区别在于他底层是由一套开放式的插件系统构成的。这种设计为 `Tailchat` 带来了一套高度自由的开放生态，通过插件机制可以修改`Tailchat`本身的方方面面而不会影响到核心代码，更重要的是插件机制给与用户选择权。通过插件可以基于核心的IM功能构造出一套完整的空间，这就是为什么定位为 `noIM` 的原因。`Tailchat` 具有很多想象的空间。

另外，插件机制也是一种利于二次开发的设计。对于极客或者想要高度自定义的企业来说非常重要。

![](/images/tailchat/plugins.png)

## 功能

`Tailchat` 除了拥有大部分 `IM` 应用都有的功能如**群组管理**、**好友**、**私信**、**音视频通话**等常规功能之外，还有更加深入的进阶功能如:
- 身份组管理
- 自定义面板
- 开放平台
- 插件中心
- 管理后台
- 多平台支持(网页端, 手机端, 桌面端)

另外，目前`Tailchat`已经有大大小小超过30个官方插件，在未来还会有更多插件。

### 身份组

`Tailchat`的权限管理采用 RBAC 策略，基于身份组的组合能够拥有不同的权限。相较于普通的 `管理员/成员` 模式来说，身份组的方式能够很好的组合出不同的权限管理方式。

一个简单的例子: `A` 身份有 `a`, `b` 两个权限，`B` 身份有 `b`, `c` 两个权限，那么如果一个用户同时拥有 `A` 和 `B` 两个身份，那么他就有 `a`, `b`, `c` 三个权限。

### 开放平台

和许多的开放平台一样，`Tailchat` 支持机器人和第三方登录。通过开放平台可以让外部系统和IM有一个很好的沟通，增强不同应用之间的联系。如果说插件是用户可以感知的前端的连接(插件也有后端)，那么开放平台就是纯后端的连接。

如果仅需要一些简单的消息发送功能，一些预设的官方插件也能很好的满足要求。

![](/images/tailchat/github-bot.png)

### 管理后台

在Tailchat主应用中，所有的用户都是平等地位的，即所有的功能都是一样的。但是作为运营项目的同学需要更加强的控制与管理能力，以应对监管与运维的要求。因此 Tailchat 也提供后台系统可以帮助用户更好的管理自己的应用

![](/images/tailchat/admin-network.png)

## 技术

### 前端

`Tailchat` 的前端是基于 `MiniStar` 实现的微内核的架构，`MiniStar`负责模块之间的加载与模块共享，而`Tailchat`则提供了依赖和插槽来允许自定义插件在 `Tailchat` 上实现自己想要的逻辑。这一点与`vscode`是非常相近的。

技术栈:

- React
- Redux
- mini-star
- tailwindcss

### 后端

`Tailchat` 一开始的设计就是为了拓展实现的。后端是基于分布式微服务架构，无需修改就可以直接进行扩容。对于外部的服务接入只需要接入网络即可实现

技术栈:
- Nodejs
- Socket.io
- koa
- moleculer

需要依赖:
- redis: 作为后台微服务的转发与缓存服务中间件
- minio: 作为文件服务的对象存储服务中间件
- mongo: 主要数据库存储用户数据

![](/images/tailchat/overview.png)

## 相关链接

- [官方网址](https://tailchat.msgbyte.com/)
- [官方文档](https://tailchat.msgbyte.com/docs/intro)
- [在线体验](https://nightly.paw.msgbyte.com/)
- [关于noIM](https://tailchat.msgbyte.com/zh-Hans/blog/2023/03/01/the-era-of-noIM)
