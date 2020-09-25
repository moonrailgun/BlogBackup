---
title: 又拍云整站网页存放到OSS的解决方案
tags:
  - upyun
abbrlink: c09e1fbc
date: 2020-08-30 00:06:11
---

## 背景

前后端分离后允许前端页面静态访问，因此整站放到OSS上成为可能

但是有一个问题就是要如何实现原来单页应用上刷新页面无法获取到正确的网页文件的问题

该问题在nginx上的解决方案是这样的:

```
location / {
  try_files $uri /index.html;
}
```

## 解决方案

又拍云边缘规则编程模式下配置规则
```
$WHEN($NOT($MATCH($_URI,'[\\.]')))/index.html
```
表示所有连接都返回根目录的`index.html`文件

## 更加复杂的场景

对于实际场景中，可能有多个应用并存，比如我的TRPG Engine中就有多个单页应用存在一个域名下

三个应用:
- /index.html 主应用
- /playground/index.html playground页，只有一个页面
- /portal/index.html portal页, 会有多个页面存在

我给出配置如下:

优先级1: playground **break**
```
$WHEN($EQ($_URI,'/playground'))/playground/index.html
```

优先级2: portal **break**
```
$WHEN($ALL($MATCH($_URI,'^/portal'),$NOT($MATCH($_URI,'[\\.]'))))/portal/index.html
```

优先级3: 单页应用
```
$WHEN($NOT($MATCH($_URI,'[\\.]')))/index.html
```

> 其中`break`的意思是满足一个条件则不会继续往下匹配

## 参考链接

参考链接: [https://cnodejs.org/topic/5badd93037a6965f59051d40](https://cnodejs.org/topic/5badd93037a6965f59051d40)
