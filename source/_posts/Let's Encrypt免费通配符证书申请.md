---
title: Let's Encrypt免费通配符证书申请
tags:
  - HTTPS
  - SSL
abbrlink: 5cf47e08
date: 2019-06-17 11:04:43
---

## 依赖

```bash
git clone https://github.com/certbot/certbot.git
```

## 命令

示例:
```bash
./certbot-auto certonly  -d *.moonrailgun.com --manual --preferred-challenges dns --server https://acme-v02.api.letsencrypt.org/directory
```

参数说明:
- `certonly` 表示安装模式，Certbot 有安装模式和验证模式两种类型的插件。
- `--manual` 表示手动安装插件，Certbot 有很多插件，不同的插件都可以申请证书，用户可以根据需要自行选择
- `-d` 为那些主机申请证书，如果是通配符，输入 *.yourdomain.com
- `--preferred-challenges dns` 使用 DNS 方式校验域名所有权
- `--server` Let's Encrypt ACME v2 版本使用的服务器不同于 v1 版本，需要显示指定。

## 参考文章

- [Let's Encrypt 终于支持通配符证书了](https://www.jianshu.com/p/c5c9d071e395)
