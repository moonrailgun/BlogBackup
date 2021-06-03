---
title: Webpack是个什么鬼——了解编译结果
tags:
  - webpack
  - esmodule
  - commonjs
date: 2021-06-03 10:33:08
---

## 简述

`webpack` 是一款现代化的前端打包工具，那么webpack是怎么将模块化代码能够在浏览器运行的？让我们来看一下

- [官方网站](https://webpack.js.org/)

## MVP

从一个最小`webpack`实例开始:

**src/index.js**
```javascript
console.log("Hello Webpack");
```

--------------------

我们直接使用命令行进行打包, 结果如下:

**webpack --mode development**
```javascript
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("console.log('Hello Webpack');\n\n\n//# sourceURL=webpack://webpack-demo/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/
/******/ })()
;
```



**webpack --mode development --devtool hidden-source-map**
```javascript
/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
console.log('Hello Webpack');

/******/ })()
;
```


**webpack --mode production**
```javascript
console.log("Hello Webpack");
```

可以看到, 对于简单代码来说, 是否使用webpack打包区别不大。稍微注意一下，在默认的`development`环境中引入了两个变量`__webpack_exports__` 和 `__webpack_modules__`。顾名思义，是分别管理导出内容与模块列表的两个代码

`__webpack_modules__` 是一个key为代码(模块)路径，值为模块执行结果的一个对象。

我们来试试稍微复杂一点的例子:

## 使用import

**src/index.js**
```javascript
import {add} from './utils'

console.log(add(1, 2));
```

**src/utils.js**
```javascript
export function add(a, b) {
    return a + b;
}
```

--------------------

我们直接使用命令行进行打包, 结果如下:

**webpack --mode development**
```javascript
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\n\nconsole.log((0,_utils__WEBPACK_IMPORTED_MODULE_0__.add)(1, 2));\n\n\n//# sourceURL=webpack://webpack-demo/./src/index.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"add\": () => (/* binding */ add)\n/* harmony export */ });\nfunction add(a, b) {\n    return a + b;\n}\n\n\n//# sourceURL=webpack://webpack-demo/./src/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/
/************************************************************************/
/******/
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/
/******/ })()
;
```


**webpack --mode development --devtool hidden-source-map**
```javascript
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "add": () => (/* binding */ add)
/* harmony export */ });
function add(a, b) {
    return a + b;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");


console.log((0,_utils__WEBPACK_IMPORTED_MODULE_0__.add)(1, 2));

})();

/******/ })()
;
```

*(可以看到`webpack --mode development --devtool hidden-source-map`这个命令执行的结果和直接development是一样的，但是代码可读性更加高。之后的文章将以这个命令的输出为准)*

**webpack --mode production**
```javascript
(()=>{"use strict";console.log(3)})();
```

可以看到，webpack一旦发现了模块系统，那么就会增加很多中间代码(从注释 `The module cache` 到 变量 `__webpack_exports__`)

首先webpack每块代码都是以`(() => {})()` 这种形式的闭包来处理的，防止污染外部空间。

然后每一段都有一段注释来告知下面这块代码的逻辑是要做什么

我们来一一看一下:
### module cache and require function
```javascript
// The module cache
var __webpack_module_cache__ = {};

// The require function
function __webpack_require__(moduleId) {
	// Check if module is in cache
	var cachedModule = __webpack_module_cache__[moduleId];
	if (cachedModule !== undefined) {
		return cachedModule.exports;
	}
	// Create a new module (and put it into the cache)
	var module = __webpack_module_cache__[moduleId] = {
		// no module.id needed
		// no module.loaded needed
		exports: {}
	};

	// Execute the module function
	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);

	// Return the exports of the module
	return module.exports;
}
```

定义了一个`__webpack_module_cache__`用于缓存模块

定义了一个`__webpack_require__`方法, 接受一个`moduleId`, 从下面可以看到`moduleId`是这个模块的路径(包括拓展名, 也即是`__webpack_modules__`管理的key值)

先判断缓存中是否存在这个模块，即是否加载，如果加载直接返回导出的数据，如果没有则在缓存中创建一个空对象`{exports: {}}`, 然后把`module, module.exports, __webpack_require__`作为参数去执行`__webpack_modules__`对应的方法

而`__webpack_modules__`的定义如下:
```javascript
var __webpack_modules__ = ({
  "./src/utils.js":
  ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      "add": () => (add)
    });
    function add(a, b) {
        return a + b;
    }
  })
});
```
可以看到，这里调用了一个`__webpack_require__.r`和一个`__webpack_require__.d`方法。目前我们不知道这两个方法是做什么用的。继续看下去。

### webpack/runtime/define property getters

```javascript
/* webpack/runtime/define property getters */
(() => {
	// define getter functions for harmony exports
	__webpack_require__.d = (exports, definition) => {
		for(var key in definition) {
			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
			}
		}
	};
})();
```

`d`是`define`的缩写。可以看到这个方法的作用就是定义导出的值。

其目的就是遍历`definition`对象将其一一填入`exports`。需要注意的是使用`__webpack_require__.d`的目的在于确保:
- 只能有一个`key`存在，如果`exports`中已经存在过了这个导出值，则不会重复导入
- 确保`exports`中的属性只有`getter`, 不能被外部设置

### make namespace object

```javascript
/* webpack/runtime/make namespace object */
(() => {
	// define __esModule on exports
	__webpack_require__.r = (exports) => {
		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
		}
		Object.defineProperty(exports, '__esModule', { value: true });
	};
})();
```

这个方法完成了两个目的。
- 在`exports`定义了`Symbol.toStringTag`的值为`Module`
  - [toStringTag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag)
- 在`exports`定义了`__esModule`的值为`true`

目的在于完成导出模块的兼容性

我们试试换一种导出方式:
**src/utils.js**
```javascript
exports.add = function(a, b) {
    return a + b;
}

```

结果:
```javascript
var __webpack_modules__ = ({
  "./src/utils.js":
  ((__unused_webpack_module, exports) => {
    exports.add = function(a, b) {
      return a + b;
    }
  })
});
```

可以看到输出简洁了很多。但是结果是一样的。都是在`exports`中插入导出的方法, 只不过`esmodule`的方式更加谨慎一点

那么前面的`__unused_webpack_module`又是干嘛的呢？我们修改一下代码
**src/utils.js**
```javascript
module.exports = function add(a, b) {
  return a + b;
}
```

结果:
```javascript
var __webpack_modules__ = ({
  "./src/utils.js":
  ((module) => {
    module.exports = function add(a, b) {
      return a + b;
    }
  })
});
```

那么到此我们的中间代码就看完了，顺便还介绍了一下`webpack`的导出结果。完整的中间代码列表可以看[这个文件](https://github.com/webpack/webpack/blob/HEAD/lib/RuntimeGlobals.js)


### 执行代码

在上面的示例中，我们得到以下代码:

```javascript
var __webpack_exports__ = {};
(() => {
  __webpack_require__.r(__webpack_exports__);
  var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/utils.js");


  console.log((0,_utils__WEBPACK_IMPORTED_MODULE_0__.add)(1, 2));
})();
```

该代码作为项目的入口代码, 完成了以下逻辑

- 通过 `__webpack_require__.r` 标记这个文件导出类型为`esmodule`
- 执行 `__webpack_require__` 并将导入的结果存放到临时变量 `_utils__WEBPACK_IMPORTED_MODULE_0__`
- 执行 `(0,_utils__WEBPACK_IMPORTED_MODULE_0__.add)(1, 2)` 并导出结果。这里的`(0, ...)`是为了重置方法的`this`指向
  - [Comma operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_Operator)
  - 这个方法等价于
    ```javascript
    const add = _utils__WEBPACK_IMPORTED_MODULE_0__.add
    add(1, 2)
    ```
