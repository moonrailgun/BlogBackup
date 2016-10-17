title: WebCollector
date: 2015-11-21 16:53:04
---
## 概述 ##
![](logo-web.png)  
一款基于HTML5跨平台技术与PHP作为后台的开源项目
[http://otaku.moonrailgun.com](http://otaku.moonrailgun.com)

## 源码 ##

#### 跨平台手机前端APP ####
基于cordova+ionic+angularjs
github:[https://github.com/moonrailgun/otaku-for-cordova](https://github.com/moonrailgun/otaku-for-cordova)

#### 管理后台 ####
基于OSAdmin架构实现
github:[https://github.com/moonrailgun/otaku-website](https://github.com/moonrailgun/otaku-website)

## 编译 ##
### 安装开发环境 ###
若没有npm请先安装nodejs开发环境

**安装cordova、ionic**
```bash
npm install -g cordova
npm install -g ionic
```

**从github上下载源码**
```bash
git clone https://github.com/moonrailgun/otaku-for-cordova.git
```

**自动安装依赖**
```bash
cd otaku-for-cordova/
ionic state restore
```

**开始编译**
```bash
ionic run/emulate/build andriod #在安卓平台编译
ionic run/emulate/build ios #在iOS平台编译
```
## 后台网站初始化 ##
从`github release`上下载sql目录结构。导入到数据库中。修改`/admin/include/config/config.inc.php`配置
初始用户信息见`github release`

## 进度 ##

### 后台 ###
- 用户管理
- 权限管理
- 功能管理
- ...
- 应用列表
- 应用创建
- 应用编辑
- 应用删除

## 开源申明 ##
基于GPLv2协议进行开源。在保留原作者署名的情况下同意在此项目上进行二次开发，发布。其衍生产品必须继承GPLv2协议