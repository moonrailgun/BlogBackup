---
title: MySQL学习笔记
tags:
  - MySQL
  - 学习笔记
abbrlink: f12cbde5
date: 2018-09-10 14:16:28
---

## 概述

主要是记录一下在日常使用mysql遇到的一些问题和解决方案。

## 创建数据库并指定编码信息

**utf8**
`CREATE DATABASE IF NOT EXISTS <yourdbname> DEFAULT CHARSET utf8 COLLATE utf8_general_ci;`

**gbk**
`CREATE DATABASE IF NOT EXISTS <yourdbname> DEFAULT CHARACTER SET gbk COLLATE gbk_chinese_ci;`

#### 关于 CHARSET 和 CHARACTER SET 的区别

```
前者包含：client | result | connection
后者包影响的就：connection
```


## 如何清除有外键关联关系的表

解决方案: 只要在当前session执行`SET FOREIGN_KEY_CHECKS = 0;`即可忽略外键检查。然后就可以随意清除数据表了。  
使用完以后执行`SET FOREIGN_KEY_CHECKS = 1;`回到正常状态。

**列出所有的表的清除语句**:
```
SELECT concat('DROP TABLE IF EXISTS ', table_name, ';')
FROM information_schema.tables
WHERE table_schema = 'MyDatabaseName'; -- MyDatabaseName需要替换为要列出的数据库名
```

## 修改密码

```sql
-- 使用传统加密方式
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

-- 使用默认加密方式
ALTER user 'root'@'localhost' IDENTIFIED BY 'root'
```
