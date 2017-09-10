title: node遇见问题汇总
date: 2017-9-3 18:26:46
tags:
- node
- npm
---

- 使用`npm adduser`出现错误

在确定用户名密码无误的情况下出现如下错误：
```
Username: moonrailgun
Password:
Email: (this IS public) moonrailgun@gmail.com
npm WARN adduser Incorrect username or password
npm WARN adduser You can reset your account by visiting:
npm WARN adduser
npm WARN adduser     https://npmjs.org/forgot
npm WARN adduser
npm ERR! code E401
npm ERR! unauthorized Login first: -/user/org.couchdb.user:moonrailgun/-rev/undefined
```

如果你在全局设定过 **淘宝镜像**，那么你有可能是 **淘宝镜像** 的受害者。

**解决方案**  
删除在个人用户文件夹目录下的`.npmrc`文件即可。
如`window`则是在`C:\Users\username`文件夹下

- 使用`npm install`时不安装devDependencies需要的包

如果发生这种情况那么你有可能是因为升级到了`npm@5`。解决方案要么降级npm，要么进行一下npm配置。因为`npm@5`以后默认为生产环境。尝试输入：  
`npm config set -g production false`  
来解决这个问题
