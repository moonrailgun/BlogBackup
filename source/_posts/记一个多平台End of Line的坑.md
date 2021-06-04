---
title: 记一个多平台End of Line的坑
tags:
  - 跨平台
  - node
  - npm
abbrlink: 4b9f1f29
date: 2021-06-04 10:06:20
---

## 问题

在执行自己编译的cli时出现:
```
env: node\r: No such file or directory
```

## 原因

在windows电脑发布代码, 其单行结束符为`\r\n`。然后mac执行时仅将`\n`视为换行符。因此程序试图去找`node\r`这个程序。当然是找不到的了。

## 如何处理该问题?

```
npx crlf --set=LF ./**/*.js
```

可以在发布脚本执行前执行一下以确保`End of Line`的正确。

相关库
- [https://www.npmjs.com/package/crlf](https://www.npmjs.com/package/crlf)


## 参考资料

- [https://zhuanlan.zhihu.com/p/361710559](https://zhuanlan.zhihu.com/p/361710559)
