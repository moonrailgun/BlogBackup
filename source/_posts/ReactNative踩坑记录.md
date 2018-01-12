title: ReactNative踩坑记录
date: 2018-01-11 11:18:21
tags:
- React
- ReactNative
- 踩坑

---

## 原生交互

- 在iOS9之后，网络请求默认为Https请求，如需支持Http，修改info.plist文件添加键值对设置允许http访问
![/images/react/001.png](/images/react/001.png)

## 路由react-navigation

[Github](https://github.com/react-navigation/react-navigation)

- 路由插件解析需要依赖`babel-preset-react-native`插件:确保`.babelrc`文件中有`"presets": ["react-native"]`。否则会抛出语法错误
- 当使用`redux`嵌套多个`Navigator`的时候。如果外面是一个`StackNavigator`然后子路由是一个`DrawerNavigator`或`TabNavigator`会抛出异常`Cannot read property 'undefined' of undefined`。解决方案:[react-navigation#issues#1919](https://github.com/react-navigation/react-navigation/issues/1919#issuecomment-313060644)
