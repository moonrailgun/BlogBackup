---
title: iOS编程——让NSURL认识特殊字符
tags:
  - iOS
  - NSURL
abbrlink: 61ce6e4d
date: 2016-06-04 17:01:43
---

正如我之前所说。其实`NSURL(string:String)`这个用法对于输入参数的字符串验证是很蠢的。因为他有自己的一套判定机制。比如在Github API编程中使用如下网址：
> https://api.github.com/search/repositories?sort=stars&order=desc&q=stars:>500

NSURL就不认识。因为在他的q字段中有一个特殊字符`>`。如果将这段网址直接输入浏览器是毫无问题的。然而NSURL不认。
因为NSURL使用的是web服务最底层的API判定。事实上最基础的浏览器也是无法直接输入这段网址的。因为这是个不合法的网址。之所以我们能在浏览器直接使用是因为浏览器本身对输入的网址进行了转译的操作。这个操作是不可见的。因此解决方案也是让iOS在处理这段带有特殊字符的网址进行转译操作。解决方案如下：

```Swift
let url = "https://api.github.com/search/repositories?sort=stars&order=desc&q=stars:>500"
let _url = NSURL(string:url.stringByAddingPercentEscapesUsingEncoding(NSUTF8StringEncoding)!)
```
通过`stringByAddingPercentEscapesUsingEncoding`方法将网址转译。成功通过编译。

转译后的网址：
>https://api.github.com/search/repositories?sort=stars&order=desc&q=stars:%3E500

输入浏览器后会发现和原来的一样。地址栏自动将`%3E`转译成`>`
