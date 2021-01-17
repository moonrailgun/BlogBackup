---
title: 简单实现一个callback回调的包装器
tags:
  - callback
  - javascript
abbrlink: 2a644d07
date: 2019-09-30 16:42:58
---

## 要求

- 不使用await
- 不使用Promise
- 要求并行指定一系列有callback的函数，并取到返回值

## 代码

```javascript
function fetch1(cb) {
  cb(1)
}

function fetch2(cb) {
  cb(2)
}

function fetch3(cb) {
  setTimeout(() => {
    cb(3)
  }, 10000);
}

function wrapFn(fns) {
  return function(onCompleted) {
    let flag1 = false;
    let flag2 = false;

    const flags = fns.map(() => false);
    const res = fns.map(() => null);
    const check = () => {
      if(!flags.includes(false)) {
        onCompleted(res);
      }
    }

    fns.forEach((fn, i) => {
      fn((ret) => {
        flags[i] = true;
        res[i] = ret;
        check();
      })
    })
  }
}


function main() {
  // 测试代码
  wrapFn([fetch1, fetch2, fetch3])((res) => {
    console.log('全部执行完毕');
    console.log('结果:', res);
  })
}
main();
```
