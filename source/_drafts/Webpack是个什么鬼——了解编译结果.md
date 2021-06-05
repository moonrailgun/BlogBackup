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

让我们来微调一下代码:
```javascript
const add = require('./utils')

console.log(add(1, 2));
```

输出:
```javascript
var __webpack_exports__ = {};
(() => {
  const add = __webpack_require__("./src/utils.js")
  console.log(add(1, 2));
})();
```

可以看到, 其主要的区别就是`__webpack_require__.r`, 其他的区别不是很大。


## 动态代码

修改部分代码:

**src/index.js**
```javascript
import('./utils').then(({add}) => {
  console.log(add(1,2))
})
```

生成代码:

**webpack --mode development --devtool hidden-source-map**

**dist/main.js**
```javascript
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({});
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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
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
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "webpack-demo:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/
/******/ 		// no prefetching
/******/
/******/ 		// no preloaded
/******/
/******/ 		// no HMR
/******/
/******/ 		// no HMR manifest
/******/
/******/ 		// no on chunks loaded
/******/
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/
/******/ 		}
/******/
/******/ 		var chunkLoadingGlobal = self["webpackChunkwebpack_demo"] = self["webpackChunkwebpack_demo"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.e(/*! import() */ "src_utils_js").then(__webpack_require__.bind(__webpack_require__, /*! ./utils */ "./src/utils.js")).then(({add}) => {
    console.log(add(1,2))
})

/******/ })()
;
```

**dist/src/utils_js.js**
```javascript
(self["webpackChunkwebpack_demo"] = self["webpackChunkwebpack_demo"] || []).push([["src_utils_js"],{

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "add": () => (/* binding */ add)
/* harmony export */ });
function add(a, b) {
    return a + b;
}


/***/ })

}]);
```

相同的代码我们跳过，我们首先来看一下入口文件的执行代码:

```javascript
var __webpack_exports__ = {};
__webpack_require__.e("src_utils_js")
  .then(__webpack_require__.bind(__webpack_require__, "./src/utils.js"))
  .then(({add}) => {
    console.log(add(1,2))
  })
```

这个代码主要分成三部分:
- 第一部分执行`__webpack_require__.e`
- 第二部分生成一个`__webpack_require__`方法并绑定参数
- 第三部分去执行实际逻辑。

我们来看下主要核心的中间代码`__webpack_require__.e`:
```javascript
/* webpack/runtime/ensure chunk */
(() => {
	__webpack_require__.f = {};
	__webpack_require__.e = (chunkId) => {
		return Promise.all(
      Object.keys(__webpack_require__.f).reduce((promises, key) => {
        __webpack_require__.f[key](chunkId, promises);
        return promises;
      }, [])
    );
	};
})();
```

简单了解一下[reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

这段代码很奇怪，看上去来说实际可以视为作为一个`forEach`在使用。目的是试图去执行`__webpack_require__.f`这个对象中的所有方法，最后返回一个总的`Promise`。

至于执行的方法，目前只有一个`__webpack_require__.f.j`，里面是一堆代码总之暂且放置不看，我们可以将其视为加载js文件即可(通过生成script的方式)。

我们可以将其视为加载好`dist/src/utils_js.js`并将该文件里声明的对象的map添加到`__webpack_modules__`即可。

此时使用`__webpack_require__`去走之前的逻辑就可以正常调用模块了。

这样就实现了代码分割。

### 一些动态加载的小细节

```javascript
// main
var chunkLoadingGlobal = self["webpackChunkwebpack_demo"] = self["webpackChunkwebpack_demo"] || [];

// src_utils_js.js
(self["webpackChunkwebpack_demo"] = self["webpackChunkwebpack_demo"] || []).push([["src_utils_js"],{...})
```
通过这种命名空间方式解决了单页面多项目可能错误添加动态加载代码的问题。

```javascript
chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
```
重写数组的`push`方法,在`push`时做一些额外的操作
即执行`chunkLoadingGlobal.push(arg1, arg2)`时。执行`webpackJsonpCallback(chunkLoadingGlobal.push, arg1, arg2)`这种方式。老实说我没有想到这种写法的好处，但也算一种小技巧

## 总结

### 统一module方式

webpack 将两种形式导出方式进行了一定程度上的统一，即不论写法如何，都通过`__webpack_require__`对模块进行引入，而对于导出的模块来说，都统一成module的样式。

区别在于`esmodule`的`default`导出和`commonjs`的module.exports导出略有区别
> *`esmodule`的`default`导出在生成的代码中地位和一般的`export`导出是一样的*
