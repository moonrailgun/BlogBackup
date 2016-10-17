title: WebCollector
date: 2015-11-21 16:53:04
---
## 概述 ##

WebCollector是一个基于NodeJS的高性能网站抓取工具。

## 源码 ##

- [github](https://github.com/moonrailgun/WebCollector)

## 使用 ##

### 基本使用方法 ###

    $ node app [taskname]

### 下载安装 ###

**git安装**

打开git bash，输入：
```bash
$ git clone https://github.com/moonrailgun/WebCollector
$ cd WebCollector
$ node app [taskname]
```
taskname为任务名称，如demo

### 制定任务 ###
文件根目录下有文件夹tasks,在创建一个JSON文件并按照固定的格式填写响应的内容来创建个性化任务

### 任务JSON文件格式 ###
- name 任务名
- startURL 起始网页
- timeout 连接超时时间
- encoding 网页编码格式
- urlMap 网页地图获取选择器
	- page
		- url
		- next
		- maxPage
		- page
			- url
			- next
			- ...

其中page代表网页内容。url是抓取页面的DOM选择器，next是下一页的DOM选择器，maxPage是该层页最多抓取数量  
**page本身可以被无限迭代，实现对任意层级的网站抓取**

## 进度 ##

目前完成的有
- mapGenerator.js