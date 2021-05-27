---
title: requirejs踩坑记录
tags:
  - requirejs
abbrlink: 4c9731f9
date: 2021-05-27 16:16:47
---

## 灵异事件之薛定谔的白屏

#### 场景复现

```html
<html>
  <head>
    <script>
      setTimeout(function () {
        var sha1Script = document.createElement('script');
        sha1Script.src = 'https://xxx/sha1.min.js';
        sha1Script.addEventListener('load', () => {
          // any logic
        })
        document.body.appendChild(sha1Script);
      })
    </script>
  </head>

  <body>
    <script type="text/javascript" src="require.min.js"></script>
    <script type="text/javascript" src="main.js"></script>
  </body>
</html>
```

**main.js**:
```javascript
require.config({
  // ... here is config
});

requirejs.onError = function (err) {
  console.error(err);
};

require([
  // ...
], function () {
  // main logic
});
```

控制台会出现报错`Error: Mismatched anonymous define() module: function(){return y}`, 但是有时候白屏有时候正常。

#### 分析原因

可知白屏是因为标记为`main logic`的代码没有正常工作导致的。

分析下来可得如下结论

当出现错误时代码执行顺序为:
```
-> require.min.js
-> sha1.min.js
-> main.js
```

当出现正确时代码执行顺序为:
```
-> require.min.js
-> main.js
-> sha1.min.js
```

易得是代码执行时序的问题。那么问题来了, 为什么会出现这种情况?

#### 源码分析

我们可以看一下`requirejs`的源码: [https://github.com/requirejs/requirejs/blob/HEAD/require.js](https://github.com/requirejs/requirejs/blob/HEAD/require.js)

当我们执行`sha1.min.js`时, `sha1.min.js`检测到当前有amd环境，调用`define`将自己注入到`requirejs`的运行时中, 因为没有调用`require`相关方法, 因此`requirejs`将其定义推入自身的`globalDefQueue`中。(相关代码: [L2061](https://github.com/requirejs/requirejs/blob/898ff9e60eb6897500720151c0b488b8749fbe8d/require.js#L2061))。

当我们执行`main.js`时, 调用`require.config`时, `requirejs`会尝试消费所有的`globalDefQueue`, 此时在queue中的参数为[null, [], function(){...}], 因为第一个参数(name)为null, 则会抛出异常`Mismatched anonymous define() module...`(相关代码: [L1244](https://github.com/requirejs/requirejs/blob/898ff9e60eb6897500720151c0b488b8749fbe8d/require.js#L1244))

`requirejs` 会通过调用自身的`onError`方法抛出异常, 如果没有手动覆盖`onError`的话会调用内置的`defaultOnError`方法(相关代码: [L1870](https://github.com/requirejs/requirejs/blob/898ff9e60eb6897500720151c0b488b8749fbe8d/require.js#L1870)), 而`defaultOnError`的实现很简单:
```javascript
function defaultOnError(err) {
  throw err;
}
```

直接向顶层抛出异常, 导致整个script的运行时中断，后续的代码当然无法执行。

#### 解决方案

可以看见原来的实现是有onError的覆写的, 只不过因为在`require.config`之后执行导致没有执行。

最佳的解决方案是尽可能早的覆写`requirejs.onError`方法。

#### 吐槽

如果看源码的话。可以看到`requirejs`写明了允许匿名模块

> Allow for anonymous modules

[相关代码](https://github.com/requirejs/requirejs/blob/898ff9e60eb6897500720151c0b488b8749fbe8d/require.js#L2064)

但是实际使用中却会报错。而且默认的报错是直接向顶层抛出。

这种情况就是A做错了，但是却导致B无法正常执行。这种场景非常难debug
