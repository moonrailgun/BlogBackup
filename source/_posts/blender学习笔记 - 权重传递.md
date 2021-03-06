---
title: blender学习笔记 - 权重传递
tags:
  - Blender
abbrlink: 13f139b9
date: 2017-06-16 14:27:05
---

## 概述
在使用Blender为角色做衣服，特别是贴身衣物的时候，会出现这样的一个问题：权重不好刷，没法完全的和人物基础模型保持一致。为了解决这个问题，blender给我们提供了一个非常好用的工具：权重传递。

## 使用前提

权重传递需要几个前提：
- 一个已经刷好权重的身体
- 一个适配身体的骨架
- 一个在基础建模上已经匹配身体的衣服模型

## 传递权重

首先确保两个模型都绑定在同一个骨骼上（为了防止出现错误与方便测试），然后先选中身体模型，再选中衣服模型，衣服模型切换到权重模式以保证T栏出现权重工具。  
点击权重工具，即可完成传递权重的操作。按下`F6`可以对传递权重进行一些细微的修改上的配置。一般默认即可。  
那么现在就可以开始随便动动骨骼测试一下结果啦。
