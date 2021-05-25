---
title: TRPG Engine 的项目工程化实践
tags:
  - TRPG Engine
  - 工程化
date: 2021-5-21 21:33:57
---

## First of all

一个人维护一个项目很久了, 差不多是时候总结一些经验做一些些输出了。因此来汇总一下这些年我对我的开源项目`TRPG Engine`做的工程化实践。

## Git workflow

参考文章:

- [https://nvie.com/posts/a-successful-git-branching-model/](https://nvie.com/posts/a-successful-git-branching-model/)
- [https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

## Commitlint

使用 `Commitlint` 来保证项目成员或者外部贡献者的提交确保同样的格式。

`TRPG Engine`是使用 [`commitlint`](https://github.com/conventional-changelog/commitlint) 来实现的提交内容校验

一般常用的一种提交方式是 `angular` 格式。

例:
```
fix: some message

fix(scope): some message
```
参考文档: [https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format)

提交的类型说明:
```
feat：新功能（feature）
fix：修补bug
docs：文档（documentation）
style： 格式（不影响代码运行的变动）
refactor：重构（即不是新增功能，也不是修改bug的代码变动）
perf：性能优化
test：增加测试
chore：构建过程或辅助工具的变动
```
[https://github.com/angular/angular/blob/master/CONTRIBUTING.md#type](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#type)

#### 通过标准的 commit message 可以生成`Change log`

基于git commit message来自动收集并生成`CHANGELOG`

在升版本时可以通过`standard-version`来实现`package.json` version和changelog一起生成

- [conventional-changelog](https://www.npmjs.com/package/conventional-changelog)
- [standard-version](https://www.npmjs.com/package/standard-version)

## Prettier and Eslint

确保项目有一个统一的格式是非常重要, 可以有效的防止贡献者因为不统一的格式带来的提交变更过大。

试想一下，一个人用的是4空格缩进，另一个人用的是2空格缩进。那么会来带的协作上的问题并导致`code review`无法正常进行

目前前端流行使用`prettier` + `eslint`的组合来确保项目的格式统一。

`prettier`是目前前端流行的`Formatter`工具, 用于保证项目能具有统一的格式，各大编辑器平台都具有插件支持，同时也支持许多语言
> - 官方文档: [https://prettier.io/](https://prettier.io/)

`eslint` 是一款确保你的代码质量的工具，特别是融合了`tslint`后更加成为了前端代码质量保证的唯一选择。其功能与prettier有部分交集，因此在同时使用两者时需要使用`eslint`的`prettier`预设来确保不会出现冲突
> - 官方文档：[https://eslint.org/](https://eslint.org/)
> - [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)

另外推荐一个跨语言的格式工具, [EditorConfig](https://editorconfig.org/), 虽然功能没有`prettier`这么强大，但是他的优势是跨语言，更加具有通用性。

#### 使用 lint-staged 来在工程化运行时中确保格式正确

- [lint-staged](https://www.npmjs.com/package/lint-staged)

## Testing and benchmark

单元测试与基准测试是程序员要面对的两大关键测试方式。

单元测试应当用于几乎所有的代码, 来确保代码不出错(主要是可以防止其他协作者无意间改坏你的代码)

而基准测试用于对性能要求较高的场合，比如后端的高并发场景，以及前端的高CPU计算(By the way, 对于前端的高CPU场景我建议是使用web worker来处理，这样可以使用多线程而不会影响用户正常操作)

#### 如何写单元测试

总所周知，一个纯函数是最好测的。那么单元测试的存在就相当于监督我们时刻注意将一些可以抽象出来的纯函数抽象出来，来方便写单元测试。能有效提高代码质量。

而对于一些副作用比较大的场景，我们需要想办法构建其上下文。比如`TRPG Engine`的后端代码，单元测试就是真实起了一个空白的数据库, redis, 和后端实例，通过数据库操作以及及时清理测试过的数据库代码来保证环境干净

对于比较难以测试的前端组件, `TRPG Engine`的做法是打快照，通过快照的变更告知开发者是否有一个 **预期/非预期** 的变更出现

单元测试的存在也应当继承到CI中，以确保每次执行都可用。

## Bundler

在现代前端编程中, 打包编译是前端不得不重视的一环

从less scss等css拓展语言, 到ts, coffee的js拓展。

从babel的es6,7,8,9支持, 到各种动态加载, 各种优化压缩。

面对日益复杂的现状，前端已经离不开打包工具的存在。

一般来说，我们常用的打包工具是`webpack`。`webpack`大而全，并提供足够的自定义化能力。是目前来说前端业务开发打包的不二之选。但成也萧何败萧何，`webpack`虽然十分强大, 但是配置非常非常复杂，甚至有webpack工程师这一说法，因此在一些特殊场景下, 我也十分推荐一些其他的打包工具。

- 如果是开发一个依赖库，我推荐 [rollup](https://rollupjs.org/guide/en/)，小巧轻便，也兼容多种导出方式。
- 如果是开发一个小项目，不想写很多`webpack`配置, 我推荐[parcel](https://github.com/parcel-bundler/parcel)
- 如果受限于系统资源，在开发环境下因为webpack的大量资源占用, 很难有一个良好的开发体验，那么我推荐[snowpack](https://www.snowpack.dev/), 可以见我的另一篇博文: [从 Webpack 到 Snowpack, 编译速度提升十倍以上——TRPG Engine迁移小记](/posts/74598ef5)
  > 至于 `vite`, 我没有用过很难给出一个比较好的评价.

## CI/CD

## Analytics

## Performance

## Logging

## Error Report

## Develop for Distributed

## Coding with config

## Read with Document and Comment

## Flexible Architecture

## Dockerize
