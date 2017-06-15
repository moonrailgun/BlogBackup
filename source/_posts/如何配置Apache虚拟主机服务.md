title: 如何配置Apache虚拟主机服务
tags:
  - Apache
  - PHP
date: 2017-6-14 13:54:09

---

## 前言

为什么要配置虚拟主机？
- 为了让多个项目能同时放在一个服务器上，且相对路径都是服务器根目录
- 为了在一个服务器上分配多个2级域名指向的项目

## 配置方法

- 首先找到Apache安装目录。修改`/conf/httpd.conf`,将`Include conf/extra/httpd-vhosts.conf`这行启用。即引入`httpd-vhosts.conf`配置文件。
- 修改`/conf/extra/httpd-vhosts.conf`配置文件。可以看到已经提供了两个demo如下：
```
<VirtualHost *:80>
  ServerAdmin webmaster@dummy-host.example.com
  DocumentRoot "E:/XAMPP/htdocs/dummy-host.example.com"
  ServerName dummy-host.example.com
  ServerAlias www.dummy-host.example.com
  ErrorLog "logs/dummy-host.example.com-error.log"
  CustomLog "logs/dummy-host.example.com-access.log" common
</VirtualHost>
```
其中最主要的是`DocumentRoot`,`ServerName`两个字段。分别代表了`项目路径`与`服务器名`。这里需要注意服务器名就是完整的URL路径如`test.example.com`这样的2级域名或者三级域名。如果有特殊的需求也可以写作顶级域名。这个字段的作用是把监听端口的请求网址为服务名的请求指向对应的虚拟主机项目路径。
- 重启Apache服务器

## 访问虚拟主机
如果该服务器配置的顶级域名已经被DNS服务器解析完毕，则可以直接在浏览器中输入`ServerName`访问。如果该服务器域名未被解析，可以通过修改`HOSTS`方法强制指向服务器来访问

## 可能出现的问题
在添加虚拟主机以后，可能会出现原始项目路径不可用的情况。如果想保留原始访问地址可以引入别名模块。
在`/conf/httd.conf`中打开`LoadModule vhost_alias_module modules/mod_vhost_alias.so`这项来载入模块。
