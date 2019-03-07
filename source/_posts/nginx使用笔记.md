---
title: nginx使用笔记
tags:
  - nginx
abbrlink: 5d639031
date: 2018-07-20 10:05:07
---

## 简介
主要记录一些使用nginx的一些特殊的技巧。常用的不会记录在内

## 技巧

### 使用rewrite重定向时保留referer网站来源

首先我们要知道referer是浏览器主动发起时带入的。跟服务端无关。而浏览器在进行rewrite重定向时并不会带入referer，而目前没有成熟的解决方案。这里记录一个骚操作: 通过cookie来进行同域之间的referer传递

比如我有一个页面`www.moonrailgun.com`,我想检测当用户是手机端访问时跳转到`m.moonrailgun.com`
那么要这么做:
```bash
#在www.moonrailgun.com把referer数据写入cookie:
add_header Set-Cookie "referer=$http_referer;Domain=moonrailgun.com";

#在m.moonrailgun.com把referer数据根据cookie信息重新构造出来:
if ($http_cookie ~* "referer=(.+?)(?=;|$)") {
  set $referer_cookie $1;
}
proxy_set_header Referer $referer_cookie;
```
