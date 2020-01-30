---
title: 浅谈节流(throttle)与防抖动(debounce)
tags:
  - throttle
  - debounce
  - lodash
  - 性能优化
date: 2020-1-30 15:46:16
---

## 简介

节流与防抖是性能优化常见的方式，用于限制一些高频操作导致对cpu无意义的负担。  
我搜索了网络上很多相关的文章，都没有办法直观表现出两者的区别。因此我自己总结了一下两者的区别，并用几个例子来解释一下两者区别

一下内容均以 `lodash` 的实现为例

## 防抖动debounce

防抖动的核心概念是当停止调用函数一段时间后。调用该函数

example:
```javascript
const d = _.debounce(() => console.log('call func'), 1000, {leading: true, trailing: true});

const dt = setInterval(() => {
  console.log('call timer');
  d();
}, 200);
```

输出结果如下:

```bash
call func # 如果 leading 为true
call timer
call timer
call timer
call timer
call timer
...
call timer
call timer
call timer
(执行clearInterval(dt))
(等待1s后)
call func # 如果 trailing 为true
```

即如果在限定时间(本例为1s)内不断调用防抖函数，则永远不会触发1s后的trailing的输出

## 节流throttle

节流的核心概念是一段时间内，函数最多只能被调用一次。

example:
```javascript
const t1 = _.throttle(() => console.log('call func'), 1000, {leading: true, trailing: true});
t1(); // 立即输出call func

const t2 = _.throttle(() => console.log('call func'), 1000, {leading: false, trailing: true});
t2(); // 一秒后输出call func

const t3 = _.throttle(() => console.log('call func'), 1000, {leading: false, trailing: false});
t3(); // 无反应

const t4 = _.throttle(() => console.log('call func'), 1000, {leading: true, trailing: true});
const t4t = setInterval(t4, 200); // 立即输出call func, 之后每秒输出一次

const t5 = _.throttle(() => console.log('call func'), 1000, {leading: false, trailing: true});
const t5t = setInterval(t5, 200); // 一秒后输出call func, 之后每秒输出一次

const t6 = _.throttle(() => console.log('call func'), 1000, {leading: false, trailing: false});
const t6t = setInterval(t6, 200); // 一秒后输出call func, 之后每秒输出一次 因为内部是通过 debounce 的 maxWait来实现的
```

如果在 `throttle` 规定的时间内有多次触发的话。必定会在时间段结束时触发函数调用  
如果只有一次触发的话。如果 `leading` 和 `trailing` 都为 `true` 。只会触发开始的那次函数调用

## 共同点

对于lodash来说
throttle的实现是通过debounce来实现的

*https://github.com/lodash/lodash/blob/master/throttle.js*
```javascript
throttle(func, wait, options);

// 等价于

debounce(func, wait, {
  options.leading || true,
  options.trailing || true,
  'maxWait': wait
});
```


## 参考文章

https://css-tricks.com/debouncing-throttling-explained-examples/
