---
title: k3s安装小记
tags:
  - k3s
  - 学习笔记
  - devops
abbrlink: 32dfd7d0
date: 2022-08-31 10:52:43
---

[官方网站](https://k3s.io/)

## 外网访问k3s集群

可以通过 `/etc/rancher/k3s/k3s.yaml` 获取集群链接配置，将里面的内网ip改为公网ip即可

另外对于外网访问来说，需要在k3s中声明外网来源，以允许链接。可以在启动的默认配置中修改

参考:
```yaml
write-kubeconfig-mode: "0644"
tls-san:
  - "foo.local"
```

> 相关文档: [https://docs.rancher.cn/docs/k3s/installation/install-options/_index/#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6](https://docs.rancher.cn/docs/k3s/installation/install-options/_index/#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)


修改完毕无需重启即可生效

## 释放80和443端口

`k3s`默认会安装`traefik`来替代`k8s`的`ingress`来代理流量，此时默认情况会占据系统的 `80` 和 `443` 端口。
> 因为通过iptables来转发流量所以lsof不会找到该应用，因为接管80/443端口的是service而不是traefik这个pod

如果不想被占用的话需要修改配置以释放这两个端口。

详情见这个 [issue](https://github.com/k3s-io/k3s/issues/2403)

在配置中禁用参考配置

`/etc/rancher/k3s/k3s.yaml`:
```yaml
disable:
  - traefik
```

## 参考文档

- [K3s Server Configuration Reference](https://rancher.com/docs/k3s/latest/en/installation/install-options/server-config/)
- [K3s Agent Configuration Reference](https://rancher.com/docs/k3s/latest/en/installation/install-options/agent-config/)
- [一份民间的配置示例](https://wener.me/notes/devops/kubernetes/distro/k3s-conf)
