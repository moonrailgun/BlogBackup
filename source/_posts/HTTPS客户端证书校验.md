---
title: HTTPS客户端证书校验
tags:
  - auth
  - https
  - ssl
abbrlink: 2169e342
date: 2021-05-08 16:44:11
---

## 简介

互联网正在逐步走向越来越安全的趋势, `Chrome 90` 将默认使用`https`。而但凡对这方面有一定了解的都会知道`https`: 证书, 校验, 签发机构...等等等等。

而这些我们所熟知的东西, 即一般我们所说的通过ssl层进行传输与校验的, 一般指的是服务端证书。而我们今天要说说客户端安全证书。

## Client Authenticate

客户端安全证书一般不常见, 只出现在对安全有一定需求的内部系统中。他的作用是规定哪些人可以访问: 客户端根据服务端配置的证书签发来下的子证书来对服务端的资源进行访问, 而服务端会对其进行校验 —— 校验不通过则不允许访问。

服务端证书恰恰相反: 他是客户端来校验服务端是否是一个正确的, 没有被篡改过的服务端。

## Handshake

以下是一个客户端进行TLS握手授权的示例:

- 协商阶段
  - 客户端发送一个 `ClientHello` 消息到服务端
  - 服务端返回一个 `ServerHello` 消息
  - 服务端发送他的 `Certificate` 消息
  - 服务端发送他的 `ServerKeyExchange` 消息以用于交换秘钥
  - 服务端发送一个 `CertificateRequest` 来请求客户端发送他的证书
  - 服务端发送一个 `ServerHelloDone` 消息表示服务端已经完成了协商消息的发送
  - 客户端返回一个 `Certificate` 消息, 其中包含了客户端的证书
  - 客户端发送 `ClientKeyExchange` 消息, 其中包含了公钥或者公钥加密的 `PreMasterSecret`
  - 客户端发送 `CertificateVerify` 消息, 这是使用客户机证书的私钥对先前握手消息的签名。可以使用客户端证书的公钥来验证此签名。这让服务器知道客户端可以访问证书的私钥，以确保客户端是合法的。
  - 协商完毕, 现在他们双方有一个用于对称加密的随机数秘钥了
- 客户端发送一个`ChangeCipherSpec` 记录来告知服务器: 所有的信息都将进行身份验证
- 服务端返回 `ChangeCipherSpec`
- 握手完毕


## 参考文档
- [Transport_Layer_Security](https://en.wikipedia.org/wiki/Transport_Layer_Security#Client-authenticated_TLS_handshake)
- [CLIENT-SIDE CERTIFICATE AUTHENTICATION WITH NGINX](https://fardog.io/blog/2017/12/30/client-side-certificate-authentication-with-nginx/)
