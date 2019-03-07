title: Docker 安装 Sentry 笔记
date: 2019-03-07 14:57:23
tags:
- linux
- Docker
- docker-compose

---

官方docker仓库链接: [getsentry/onpremise](https://github.com/getsentry/onpremise)

需要资源： 我这边是用了至少`2GB内存+4GB交换空间`才安装完毕。常驻内存占用大约`600MB`

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
