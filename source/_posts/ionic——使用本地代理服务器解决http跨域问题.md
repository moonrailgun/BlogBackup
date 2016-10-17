title: ionic——使用本地代理服务器解决http跨域问题
tags:
  - ionic
  - http
  - 跨域
date: 2016-09-02 15:38:38 
---

在ionic开发中我们常常会遇到http请求相关问题。在设备中我们常用的方法是使用白名单插件`cordova-plugin-whitelist`。通过在`config.xml`中配置`<access origin="*"/>`参数来对http请求进行本地化而解决跨域问题。但是我们在实际开发中我们经常使用`ionic serve`或`ionic run ios -l -c -s`来进行调试工作。使用白名单插件无法正常运行。这里就要使用代理服务器了。

# 什么是代理服务器 #
代理服务器就是一个将http请求进行中转的服务器。以代理服务器的名义去访问远程服务器。而`ionic CLI`就提供了一个本地的代理服务器来解决`$http`跨域的问题

# 如何使用代理服务器 #
在项目根目录下找到文件`ionic.config.json`添加`proxies`字段。如下：
```json
{
  "name": "test",
  "app_id": "",
  "proxies": [
    {
      "path": "/api",
      "proxyUrl": "http://api.yourdomain.com"
    }
  ]
}
```
使代理服务器监控`path`字段的http请求。将相应请求通过代理服务器中转发送到`proxyUrl`字段的地址上

当你访问`/api`的时候。实际上是发送到`http://api.yourdomain.com`。如请求`/api/data.json`。实际上请求的是远程服务器`http://api.yourdomain.com/data.json`的数据。在项目目录中`api文件夹`其实不存在

同时代理服务器能设置多个以满足不同的需求

# 定义常量方便切换开发环境与发布环境 #
代理服务器的使用仅在`ionic CLI`环境在才能工作。在真机下实际上是会真的访问`/api`目录导致`404错误`的。为了解决问题需要设置全局常量以方便不同环境下的切换。
``` javascript
.constant('ApiServer', '/api')
//.constant('ApiServer', 'http://api.yourdomain.com')
```

使用如下：
```javascript
.controller('test',function($scope, ApiServer){
	var url = ApiServer + "/data.json"
	$http.get(url)
	  .success(function(data,status,headers,config) {
	    console.log(data);
	  }).error(function(data,status,headers,config){
	    console.log(status);
	  });
})
```