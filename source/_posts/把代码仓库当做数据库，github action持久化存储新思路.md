---
title: 把代码仓库当做数据库，github action持久化存储新思路
tags:
  - 代码仓库
  - Github
  - Github Action
  - 持久化存储
date: 2022-5-26 00:04:48
---

## 背景

我想做一个rss订阅机器人，通过一个定时任务定期将我关注的内容推送到我的 `Tailchat` 群组。但是我又不想自己去单独搭建一个服务器来部署，因为功能很小、单独部署的成本会被放大，也不容易被其他人很简单的使用。而且长期维护的成本也是比较高的，希望能处于无人值守的运行模式

那么整理一下需求:

- 定时任务
- 简单部署
- 不需要运维

可以说是非常理想了，那么有这样成熟的解决方案么？答案是有的。那就是`github action`。

Github action 可以满足我的所有需求，只需要一个简单的定时任务即可实现我的三个需求。唯一的难点在于数据库，也就是持久化存储。

众所周知，rss机器人的原理就是定时请求rss订阅地址，将返回的内容结构化以后与之前存储的数据进行比较，将更新的信息提取出来发送到外部服务。那么为了能够比较差异，一个持久化的数据库是必不可少的。那么`github action`可以实现数据库么？答案是可以的，我只需要将数据存储在代码仓库中，每次执行action之前将数据取出，然后在action执行完毕之后将数据存回仓库，那么一个用于低频读写的文件数据库就实现了。


理论存在，实践开始！

## 开始造轮子

在github上搜索了一圈没有发现有现成的轮子，因此就开始自己造一个。

核心流程如下：

#### 准备数据流程

- 通过git worktree创建一个独立的工作区
- 指定工作区的分支为一个独立分支用于存储数据
- 如果该分支之前不存在，跳过准备过程
- 如果分支已存在，拉取分支代码，将存储分支的指定目录文件复制到主工作空间的指定目录文件

#### 修改数据

- 在后续的action中执行脚本
- 脚本读取文件数据库，在这里使用的是`lowdb`，当然也可以使用sqlite，看个人喜好
- 更新数据库并写入

#### 持久化存储数据

- action执行完毕进入post阶段
- 执行post action将主工作区的数据库文件覆盖到存储工作区中
- 存储工作区通过github action的token或者传入参数的token 提交变更到github的存储分支中。
- 结束流程，等待后续的执行


## 成果

那么通过上面一系列步骤，我们就成功把github当做我们自己的action应用的数据库了。

一个简单的示例如下:
```yaml
name: Tests

on:
  workflow_dispatch:

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Checkout date
      uses: moonrailgun/branch-filestorage-action@v1.2.2
      with:
        path: date
    - name: Read and show
      run: cat date
    - name: update date
      run: echo $(date) > date
```

这个action表示，每执行一次，我们的`actions/filedb`中的date文件就会更新成最新的.当然也可以加上一些定时任务触发器让他自动执行。当然建议不要滥用哦，可以使用低频一些

开源地址: [moonrailgun/branch-filestorage-action](https://github.com/moonrailgun/branch-filestorage-action)

RSSBot地址: [msgbyte/tailchat-rss-bot](https://github.com/msgbyte/tailchat-rss-bot)
