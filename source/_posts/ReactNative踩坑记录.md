---
title: ReactNative踩坑记录
tags:
  - React
  - ReactNative
  - 踩坑
abbrlink: 33f59699
date: 2018-07-16 11:19:59
---

## 原生交互

- 在iOS9之后，网络请求默认为Https请求，如需支持Http，修改info.plist文件添加键值对设置允许http访问
![/images/react/001.png](/images/react/001.png)
- 编译后抛出错误`$export is not a function`,原因: react-native 无法正常使用babel的runtime-transform插件,原因不明
- react-native安卓端允许的最大长计时器时间为60000ms,而socket.io默认ping计时器为85000ms.为了解决这个警告你需要在服务端设置`pingInterval(默认25000)`和`pingTimeout(默认60000)`使两者之和小于等于60000ms

## 路由react-navigation

[Github](https://github.com/react-navigation/react-navigation)

- 路由插件解析需要依赖`babel-preset-react-native`插件:确保`.babelrc`文件中有`"presets": ["react-native"]`。否则会抛出语法错误
- 当使用`redux`嵌套多个`Navigator`的时候。如果外面是一个`StackNavigator`然后子路由是一个`DrawerNavigator`或`TabNavigator`会抛出异常`Cannot read property 'undefined' of undefined`。解决方案:[react-navigation#issues#1919](https://github.com/react-navigation/react-navigation/issues/1919#issuecomment-313060644)

## 编译打包

安卓: `cd android && ./gradlew assembleRelease`

- 当使用64位linux系统打包时抛出找不到`aapt`, 如果该路径下有aapt文件的话那么则是64位系统的问题。apktool需要32位编译环境。安装`ia32-libs`即可解决问题，如为centos则使用命令`yum install libstdc++.i686 glibc.i686 zlib.i686`
- 如出现`:app:bundleReleaseJsAndAssets` 错误。可能是由于系统配置过低导致的编译文件超时的问题。解决方案是手动编译js文件后再打包
> ```bash
> mkdir -p android/app/build/intermediates/assets/release
> mkdir -p android/app/build/intermediates/res/merged
> node node_modules/react-native/local-cli/cli.js bundle --platform android --dev false --reset-cache --entry-file src/app/index.js --bundle-output android/app/build/intermediates/assets/release/index.android.bundle --assets-dest android/app/build/intermediates/res/merged/release
> ```
