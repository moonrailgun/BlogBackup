---
title: k3s安装 OpenFaaS小记
tags:
  - k3s
  - k8s
  - 学习笔记
abbrlink: e7e551d1
date: 2021-12-01 20:47:23
---

## 官方手册

[https://docs.openfaas.com/deployment/kubernetes/](https://docs.openfaas.com/deployment/kubernetes/)

## 使用hosts

因为众所周知的原因，国内访问部分网站不是很顺畅，如以下步骤有网络问题。这里建议使用 [https://www.ipaddress.com/](https://www.ipaddress.com/) 这个网站来获取最佳的hosts

## First of all

```bash
# 获取 faas-cli
curl -sL https://cli.openfaas.com | sudo sh

# 获取 arkade
curl -SLsf https://dl.get-arkade.dev/ | sudo sh
```

`arkade` 是一个`helm` 的封装工具，用于一键安装应用到`k8s`集群

## 一键安装 openfaas

```bash
arkade install openfaas
```

在此过程中可能会出现集群无法抵达的问题，可以参考这个issue: [https://github.com/k3s-io/k3s/issues/1126](https://github.com/k3s-io/k3s/issues/1126)

```bash
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
```

## 安装完成

安装完成后会输出如下内容:

```
=======================================================================
= OpenFaaS has been installed.                                        =
=======================================================================

# Get the faas-cli
curl -SLsf https://cli.openfaas.com | sudo sh

# Forward the gateway to your machine
kubectl rollout status -n openfaas deploy/gateway
kubectl port-forward -n openfaas svc/gateway 8080:8080 &

# If basic auth is enabled, you can now log into your gateway:
PASSWORD=$(kubectl get secret -n openfaas basic-auth -o jsonpath="{.data.basic-auth-password}" | base64 --decode; echo)
echo -n $PASSWORD | faas-cli login --username admin --password-stdin

faas-cli store deploy figlet
faas-cli list

# For Raspberry Pi
faas-cli store list \
 --platform armhf

faas-cli store deploy figlet \
 --platform armhf

# Find out more at:
# https://github.com/openfaas/faas

Thanks for using arkade!
```
