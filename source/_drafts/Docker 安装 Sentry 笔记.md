---
title: Docker 安装 Sentry 笔记
tags:
  - linux
  - Docker
  - docker-compose
  - sentry
abbrlink: da3a45ef
date: 2019-03-07 14:57:23
---

官方docker仓库链接: [getsentry/onpremise](https://github.com/getsentry/onpremise)

需要资源： 我这边是用了至少`2GB内存+2GB交换空间`才安装完毕。常驻内存占用大约`600MB ~ 800MB`, 安装时会消耗比较大的资源去写表。注意OOM， 如遇到这种情况可以参考我的文章[Linux 小资源服务器使用经验总结](/posts/6769ba51/#善用交换内存)

1. `docker volume create --name=sentry-data && docker volume create --name=sentry-postgres` - Make our local database and sentry volumes
    Docker volumes have to be created manually, as they are declared as external to be more durable.
2. `cp -n .env.example .env` - create env config file
3. `docker-compose build` - Build and tag the Docker services
4. `docker-compose run --rm web config generate-secret-key` - Generate a secret key.
    Add it to `.env` as `SENTRY_SECRET_KEY`.
5. `docker-compose run --rm web upgrade` - Build the database.
    Use the interactive prompts to create a user account.
6. `docker-compose up -d` - Lift all services (detached/background mode).
7. Access your instance at `localhost:9000`!


## 遇到小问题
- 如果使用nginx是用docker安装的话注意ip地址。nginx的`127.0.0.1`与本机的`127.0.0.1`不同
- 如果使用nginx转发请求的话。请注意设置`proxy_set_header Host $http_host`，否则会出现用户反馈模块不能正常使用的问题（发送反馈信息时请求地址不正确）
