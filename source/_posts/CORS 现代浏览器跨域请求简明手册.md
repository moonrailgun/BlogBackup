---
title: CORS 现代浏览器跨域请求简明手册
tags:
  - CORS
abbrlink: db9cb7ec
date: 2021-03-01 15:50:59
---

## 简介

本文主要是阐述与总结现代浏览器的跨域问题

## 开始一个跨域请求

你可以使用`XMLHttpRequest`或`Fetch`发起一个跨域请求

你可以在网站`http://foo.com`发起一个对`http://bar.com`的请求，如果对方网站许可，那么便能拿到对应的响应，否则则失败。

## 请求分两类

### 预检请求

预检请求是一个OPTIONS 请求，在跨域时预先发送到服务端以获取该服务器对跨域访问控制的一些配置，以决定接下来的请求是否会被发送。一般以`Header`头的形式返回, 相关配置一般以`Access-Control-*`作为开头

<div style="background-color:white; padding: 10px">
  <img src="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/preflight_correct.png" />
</div>

### 实际请求

#### 简单请求

简单请求不会触发[`CORS 预检请求`](#预检请求)

> 若请求满足所有下述条件，则该请求可视为"简单请求":
>
> - 使用下列方法之一：
>   - GET
>   - HEAD
>   - POST
> - 除了被用户代理自动设置的首部字段（例如 `Connection`, `User-Agent`）和在 `Fetch` 规范中定义为 `禁用首部名称` 的其他首部，允许人为设置的字段为 Fetch 规范定义的 对 CORS 安全的首部字段集合。该集合为：
>   - Accept
>   - Accept-Language
>   - Content-Language
>   - Content-Type （需要注意额外的限制）
>   - DPR
>   - Downlink
>   - Save-Data
>   - Viewport-Width
>   - Width
>   - `Content-Type` 的值仅限于下列三者之一：
>     - `text/plain`
>     - `multipart/form-data`
>     - `application/x-www-form-urlencoded`
> - 请求中的任意XMLHttpRequestUpload 对象均没有注册任何事件监听器；XMLHttpRequestUpload 对象可以使用 XMLHttpRequest.upload 属性访问。
> - 请求中没有使用 ReadableStream 对象。

#### 复杂请求

除了简单请求以外的所有请求都被称为复杂请求，复杂请求在进行跨域访问前会发送一个 [`CORS 预检请求`](#预检请求)

## 跨域请求响应Headers

- [The HTTP response headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#the_http_response_headers)

## 跨域时携带Cookies

#### 需要确保请求发起时信任对方

```javascript
fetch('http://bar.com', {
  credentials: 'include'
})
```

`credentials` 含义:
> - "omit": Excludes credentials from this request, and causes any credentials sent back in the response to be ignored.
> - "same-origin": Include credentials with requests made to same-origin URLs, and use any credentials sent back in responses from same-origin URLs.
> - "include": Always includes credentials with this request, and always use any credentials sent back in the response.

或

```javascript
const req = new XMLHttpRequest();
req.open('GET', url, true);
req.withCredentials = true;
req.onreadystatechange = handler;
req.send();
```

#### 需要确保服务端响应头返回
```
Access-Control-Allow-Credentials: true
```

*注意此时`Access-Control-Allow-Origin`不能为 "\*"*

#### 需要确保要发送的Cookie满足SameSite条件

注意Chrome 80 后将默认值从原来的`None`改为`Lax`, 相关影响可以看如下文章

- [SameSite 属性变为 lax，我们应该怎么办](https://zhuanlan.zhihu.com/p/257860705)

## 参考文章

- [跨源资源共享（CORS）](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [SameSite cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)
- [Fetch](https://fetch.spec.whatwg.org/)
- [github/fetch](https://github.com/github/fetch)
