---
title: Firefox、safari的session无法匹配的原因
tags:
  - firefox
  - safari
  - session
  - cookie
abbrlink: 113e84a8
date: 2018-08-03 11:44:11
---

## 场景
在测试服务器上出现一个这样奇怪的场景：在Firefox和Safari浏览器上出现session无法正确被识别，而Chrome浏览器能够正常被服务器识别session。

## 原因
服务端时间与客户端时间不匹配，客户端时间在服务端时间后并差距大于session过期时间(如session过期时间为30分钟, 那么客户端时间往后调30分钟以上或者服务端时间往前调30分钟以上都会出现这个问题)

## 分析
首先我们看一下以下两张图:
![](/images/common/firefox/001.png)
[图1]

![](/images/common/firefox/002.png)
[图2]


其中图1是我在火狐浏览器发起的一次http请求的请求头，图2是我在chrome浏览器中发起的http请求的请求头
可以见当cookie过期的时候火狐浏览器发送的请求头中会自动过滤掉已经过期的cookie，而Chrome浏览器则不会。而我们知道服务端的session是根据浏览器发送的cookie进行匹配的。因此火狐浏览器当客户端时间与服务端时间差距过大的时候会出现session无法正常匹配的情况

同理，Safari也会过滤掉失效的cookie。

## 解决方案

暂时没有比较好的解决方案，只能确保服务端的时间是正常的即可。
