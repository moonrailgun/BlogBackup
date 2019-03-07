---
title: gulp工具使用笔记
tags:
  - gulp
  - 前端
abbrlink: 82986f1f
date: 2017-05-26 22:48:25
---

gulp是一款非常好用的前端工具，自从用了gulp以后我马上就抛弃了grunt投入的gulp的怀抱。
比起grunt的配置型，我更加喜欢gulp的函数型。通过编写各种各样的gulp任务函数来配置一系列任务来完成各种各样的需求。

总得来说，就很爽

## 常用的gulp插件
gulp-sourcemaps
gulp-sass
gulp-clean
gulp-rev
gulp-fingerprint
gulp-plumber
gulp-compass

## 常用函数
`gulp.start()` //执行任务
`gulp.task()` //注册任务
`gulp.watch()` //监听文件
`gulp.src()` //获取匹配文件

## gulp能干什么?
- gulp可以监听文件修改，自动执行一些任务比如自动编译。提升工作效率
- gulp可以通过一些插件来开启简易端口，方便前端调试
- gulp可以压缩JS文件，CSS文件，img图片
- gulp可以统一封装你的代码。调用node来执行任务。
