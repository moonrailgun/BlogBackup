---
title: 让Chrome显示完整网址
tags:
  - chrome
abbrlink: ed7510e5
date: 2020-07-20 17:01:48
---

Chrome 76+版本以后默认隐藏 `https://` , `www`等*无关紧要*的标识符

作为开发者，这些信息是非常有价值的。因此需要手动再将其重新开启

### 在flags页面中将其重新开启

地址栏`chrome://flags`, 进入flags页面

#### Chrome 版本小于83

将`Omnibox UI Hide Steay-State URL Scheme and Trivial Subdomains`设置为禁用

#### Chrome 版本大于等于83

将`Context menu show full URLs`设置为启用, 并右键地址栏选中`总是显示完整网址`
