---
title: 如何让团队项目白嫖 vercel 的免费服务
tags:
  - vercel
abbrlink: 9632e7e0
date: 2022-04-03 22:17:06
---

## 背景

`Vercel` 是一个对 `Hobby` 计划提供免费服务，并且在中国地区做了很好的CDN的serverless项目，用于代理静态页面或者做一些简单的api是非常方便的。

对于个人项目来说，`vercel`可以很好的在网页上直接操作导入，但是对于存储在Github组织的项目来说想要直接创建是不行的，这时候vercel会跳转到 `pro plan` 并且付费后才能使用

这时候我们就要取巧用一些方法绕过 github 组织的限制

## 创建不与github绑定的Vercel项目

使用`npm`全局安装`vercel`命令行终端

```bash
npm install -g vercel
```

在项目目录下直接执行以下命令
```
vercel login
vercel
```

这里会有一个交互式的终端操作。按照他的步骤顺序执行下去，就会在Vercel上创建一个没有连接任何一个Github项目的服务了。此时如果部署成功的话是可以通过网页界面直接点击到已经部署的服务的。

这时候我们就成功了一半了，剩下的是需要我们实现每次提交代码自动部署vercel的功能。

## 设置自动部署

在`github action`上创建一个编译CI，并在build操作后面插入以下命令:

```yaml
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@master
      env:
        VERSION: ${{ env.GITHUB_SHA }}
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID}}
        vercel-project-id: ${{ secrets.PROJECT_ID}}
        working-directory: ./
        vercel-args: '--prod' # 可不填
```

其中需要在`Github Secrets`中提前准备好以下参数
- `VERCEL_TOKEN`: 通过 [https://vercel.com/account/tokens](https://vercel.com/account/tokens) 创建
- `ORG_ID`: 项目根目录 `.vercel/project.json` 可见
- `PROJECT_ID`: 项目根目录 `.vercel/project.json` 可见
