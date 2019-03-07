---
title: Mac中的字符中英文问题
tags:
  - swift
  - NSURL
  - objective-c
abbrlink: 862a051d
date: 2016-04-28 12:23:59
---

NSURL 是 OC 或 Swift编程中对http网络通信很常见的一个方法。常用的方法是`NSURL(string: "http://.../")`
在这里要注意一点。string的参数中不能有中文字符。否则会报错。
>fatal error: unexpectedly found nil while unwrapping an Optional value

需要注意的是。在mac中，和windows不同的是，有很多windows中英文通用的字符在mac中并不通用。比如在Mac中中文的`=`与英文的`=`并不等价。这点可以在Mac中打开记事本在两个输入法中切换一下输入试试。以及其他的很多字符都会出现这种问题。而两者的差别非常大。又因为输入的是字符串。编译器并不会提示这种问题。因此当编写OC或Swift的时候出现这种摸不着头脑的事情。不放重新输入一遍试试。或许会有意外的收获
