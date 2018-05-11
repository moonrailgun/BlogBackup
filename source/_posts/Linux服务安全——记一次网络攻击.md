title: Linux服务安全——记一次网络攻击  
tags:
  - Linux  
  - 安全  
date: 2018-4-14 14:02:47
---

## 背景  
使用linode服务器第二天就经历一次网络攻击，对方通过暴力破解root账号成功攻陷了我密码强度相对较低的服务器并通过我的服务器向外发起DDOS攻击导致在2小时间流失上行流量500G。造成了相当的损失

## 日志查询
```
# lastb
```
`lastb`命令查询试图通过SSH访问服务器密码失败的记录。可以查询到有来自印度，韩国与一个不知名国家的ip的重复尝试请求，由于访问次数多、频率高，可以看出是通过脚本来实现暴力破解的行为

```
# last
```
`last` 查询登录记录，在登录记录中查看到在事发时间没有任何登录请求。可能原因有二：
- 对方在拿到root权限账号后清除了自己的登录记录
- 对方在之前就拿到了root权限并留下了木马之类的后门，在事发时间通过服务端口远程访问

同时可以通过查看`/var/log/secure`日志文件查询用户登录记录

## 安全策略

[https://www.linode.com/docs/security/securing-your-server/](https://www.linode.com/docs/security/securing-your-server/)
[https://www.cnblogs.com/alimac/p/5848372.html](https://www.cnblogs.com/alimac/p/5848372.html)

## 相关命令
```
# 查看当前网络服务
sudo netstat -tulpn

# 重启sshd
sudo service sshd restart
```

## 解决方案
- yum update
- 增加第二管理员账号
- 增加第二管理员sudo权限
- 禁止root用户直接通过ssh登录
- 关闭密码登录，使用秘钥对登录
- 配置iptables(可选)

### .ssh文件权限
- `700` .ssh
- `600` authorized_keys
