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

## Bundler

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
