---
title: React 注意事项
tags:
  - React
  - 学习笔记
abbrlink: 80587f52
date: 2020-09-09 16:17:17
---

## Inline Style 内联样式

内联样式有一些简写操作

比如:
```jsx
<div style={{height: 10}}></div>
```
转化为
```html
<div style="height: 10px"></div>
```

------------------

在jsx中会自动加上px单位。但需要注意的是, 并不是每种属性都会自动加上单位的。容易出问题的比如`lineHeight`

这里有一个列表，以下属性不会自动加上px
- animationIterationCount
- boxFlex
- boxFlexGroup
- boxOrdinalGroup
- columnCount
- fillOpacity
- flex
- flexGrow
- flexPositive
- flexShrink
- flexNegative
- flexOrder
- fontWeight
- lineClamp
- lineHeight
- opacity
- order
- orphans
- stopOpacity
- strokeDashoffset
- strokeOpacity
- strokeWidth
- tabSize
- widows
- zIndex
- zoom

参考文章: [Shorthand for Specifying Pixel Values in style props](https://react-cn.github.io/react/tips/style-props-value-px.html)
