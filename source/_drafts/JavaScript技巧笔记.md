title: JavaScript技巧笔记
date: 2019-01-08 16:53:48
tags:
- js
- javascript
- 学习笔记

---

### 数据去重

```javascript
// 数组去重
var arr = [1,1,2,3,4,undefined,undefined,null,null,NaN,NaN]
arr.filter((item, index, arr) => arr.indexOf(item) === index) // ES5: return [1, 2, 3, 4, undefined, null]
Array.from(new Set(arr)) // ES6: return [1, 2, 3, 4, undefined, null, NaN]

// ES6数组合并并去重
var arr1 = [1,2,3,4,5,6]
var arr2 = [2,3,4,5,6,7]
Array.from(new Set([...arr1, ...arr2])) // return [1, 2, 3, 4, 5, 6, 7]
```

### 防调试

```javascript
setTimeout(function() {
  debugger;
}, 1000);
```
