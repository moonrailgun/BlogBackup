---
title: PostgreSQL学习笔记
tags:
  - PostgreSQL
  - 学习笔记
abbrlink: 95327e2f
date: 2019-06-13 17:21:14
---

## 清理Schema

```
如果想删除某个 schema下的所有表，一句话足以。

 DROP SCHEMA public CASCADE;

则会自动删除 public 下的所有表及函数。 之后再创建public；

create schema public;

grant all on schema ... to ... ;  授权
```
