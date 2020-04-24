---
title: Linux常用命令记录
tags:
  - Linux
abbrlink: 30a497b6
date: 2018-07-06 16:50:37
---

## 简介
主要是为了记录一下linux使用过程中常用的命令。方便日后检索

## 快捷键
- `ctrl+z` 将当前任务暂停，回到终端页面。可以使用`fg`回到任务或使用`bg`将当前任务挂到后台

## 常用命令
- `cp from to` 复制
- `mv from to` 移动
- `rm file` 删除
- `cat file` 输出文件
- `pwd` 输出当前工作空间
- `who` 当前登录所有用户
- `whoami` 当前登录用户名
- `wget url` 下载文件
- `curl url` 发送请求
- `free -h` 查看系统内存
- `df -h` 查看硬盘空间
- `du -h ./` 查看文件占用
- `tail -f` 持续跟踪文件
- `uname -a` 查看系统信息
- `netstat -tulpn` 查看系统网络情况
- `lsof -i:80` 查看系统端口监听
- `grep -r "str" ./` 在文件中查找字符串
- `find ./ -name filename` 在路径下根据文件名查找文件
- `top` 任务管理器
- `uptime` 启动时间，登录用户数，系统资源占用率
- `kill -9 pid` 杀死进程
- `ps aux | grep name` 查看某进程情况
- `nohup command &` 后台运行某命令
- `scp [[user@]host1:]file1 [[user@]host2:]file2` ssh cp
- `su username` 切换用户

## 有用但不常用命令
- `mount --bind test1 test2` 挂载文件
- `tree` 生成文件结构
- `history` 查看用户历史命令
- `last` 查看用户登录记录
- `lastb` 查看用户登录失败记录
- `dmesg` 查看系统诊断日志
- `dd if=/dev/zero of=/root/swapfile bs=1M count=1024` 创建一个1024*1M大小的文件。位置为of,内容为if
- `mkswap /root/swapfile` 创建交换空间
- `swapon /root/swapfile` 开启交换空间

## 压缩
- `tar -cvf jpg.tar *.jpg` 将目录里所有jpg文件打包成tar.jpg
- `tar -czf jpg.tar.gz *.jpg` 将目录里所有jpg文件打包成jpg.tar后，并且将其用gzip压缩，生成一个gzip压缩过的包，命名为jpg.tar.gz
- `tar -cjf jpg.tar.bz2 *.jpg` 将目录里所有jpg文件打包成jpg.tar后，并且将其用bzip2压缩，生成一个bzip2压缩过的包，命名为jpg.tar.bz2
- `tar -cZf jpg.tar.Z *.jpg` 将目录里所有jpg文件打包成jpg.tar后，并且将其用compress压缩，生成一个umcompress压缩过的包，命名为jpg.tar.Z
- `rar a jpg.rar *.jpg` rar格式的压缩，需要先下载rar for linux
- `zip jpg.zip *.jpg` zip格式的压缩，需要先下载zip for linux

## 解压
- `tar -xvf file.tar` 解压 tar包
- `tar -zxvf file.tar.gz` 解压tar.gz
- `tar -jxvf file.tar.bz2` 解压 tar.bz2
- `tar -Zxvf file.tar.Z` 解压tar.Z
- `unrar e file.rar` 解压rar
- `unzip file.zip` 解压zip
