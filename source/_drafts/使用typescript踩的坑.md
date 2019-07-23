---
title: 使用typescript踩的坑
tags:
  - typescript
  - javascript
abbrlink: 950cb759
date: 2019-06-07 17:47:59
---

## 简介

这是一个踩坑记录

### tsconfig-paths

由于node使用typescript的path数据需要特殊的操作。因此引入`tsconfig-paths`包来实现引用路径的重定向

方式:
```javascript
require('ts-node').register();
require('tsconfig-paths').register();
```

但是同时也踩了一个坑。就是在node的项目的path中，如果你的项目下还有多个node的子项目的话。千万千万不能使用如下配置:
```json
{
  "compilerOptions": {
    "paths": {
      "*": ["node_modules/*"]
    }
  }
}
```

因为他会直接把子项目的node require路径指向到父项目的`node_modules`(如果父项目的依赖包也有这个依赖的话)

解决方案就是把`"*": ["node_modules/*"]`删去即刻，node可以使用自己的require路径搜索机制
