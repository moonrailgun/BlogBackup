---
title: Linux 小资源服务器使用经验总结
tags:
  - Linux
  - Swap
  - OOM Killer
abbrlink: 6769ba51
date: 2019-03-01 17:16:35
---


### 善用交换内存
有些时候。作为个人用的服务器我们往往不会去购买一些性能很好的服务器。但是在某些情况下我们却要临时去使用一个比较高的内存去执行某个程序，但是我们当前服务器的资源却无法执行。因为linux为了防止自身系统崩溃，引入了一个OOM Killer机制。即当一个进程占用过多内存时，系统会直接kill掉这个进程并抛出Out of memory错误。  
我们可以通过`grep "Out of memory" /var/log/messages`来查看相关日志。  
这个时候我们就可以使用交换内存来用磁盘空间换内存了。

##### 第一步: 创建一个空白文件
使用命令`dd if=/dev/zero of=/opt/swapfile bs=1M count=1024`来创建一个1GB的空白文件到`/opt/swapfile`。同样的可以按照这个方法创建其他大小的空白文件。我一般会创建和内存一样大小的交换空间

##### 第二步: 创建交换空间
使用命令`mkswap /opt/swapfile`来将这个空白文件变成一个swap文件。只有该文件才能将对应的磁盘空间作为一个临时内存。

##### 第三部: 应用交换文件
使用命令`swapon /opt/swapfile`将该交换空间应用到系统中。此时执行`free -h`可以看到swap一行多出了1GB空间


### 交换空间应该设定多大？

| 实际内存 | 推荐交换空间 | 推荐交换空间(开启休眠模式) |
| ------- | ---------- | --------------------- |
| ⩽ 2GB   | 2倍        | 3倍          |
| 2GB - 8GB | 1倍      | 2倍          |
| 8GB - 64GB | 至少4GB | 1.5倍        |
| > 64GB  | 至少4GB    | 不推荐        |

参考文章:
- [redhat](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/installation_guide/s2-diskpartrecommend-ppc)
- [ubuntu](https://help.ubuntu.com/community/SwapFaq)
