---
title: Cocos2dx学习笔记——CCLog无法使用的问题
tags:
  - cocos2dx
  - CCLog
  - 游戏开发
abbrlink: a79c8a43
date: 2016-03-20 12:48:53
---

在cocos2dx中我们拥有多种调试输出日志的方法：
- CCLog
- CCLOG
- log
然而在实际使用中会报错，如：

```
错误	46	error LNK2019: 无法解析的外部符号 "__declspec(dllimport) void __cdecl cocos2d::CCLog(char const *,...)" (__imp_?CCLog@cocos2d@@YAXPBDZZ)，该符号在函数 "public: bool __thiscall XMLParser::initWithFile(char const *)" (?initWithFile@XMLParser@@QAE_NPBD@Z) 中被引用	G:\Study\Cocos\gfxz\proj.win32\XMLParser.obj
```

我们来看一下为什么。
首先CCLOG是一个宏指令。定义如下：
`#define CCLOG(format, ...)      cocos2d::log(format, ##__VA_ARGS__)`
**也就是说CCLOG与log等价。**

而CCLog是一个独立的函数。在CCDeprecated.h中可以看到：
```cpp
/** use log() instead */
CC_DEPRECATED_ATTRIBUTE void CC_DLL CCLog(const char * pszFormat, ...) CC_FORMAT_PRINTF(1, 2);
```
Cocos在注释中已经声明了**使用log命令来代替**使用。

我们来研究一下这条命令。
`CC_DEPRECATED_ATTRIBUTE`是一条宏语句。他的定义如下
```cpp
#if defined(__GNUC__) && ((__GNUC__ >= 4) || ((__GNUC__ == 3) && (__GNUC_MINOR__ >= 1)))
    #define CC_DEPRECATED_ATTRIBUTE __attribute__((deprecated))
#elif _MSC_VER >= 1400 //vs 2005 or higher
    #define CC_DEPRECATED_ATTRIBUTE __declspec(deprecated) 
#else
    #define CC_DEPRECATED_ATTRIBUTE
#endif 
```
在vs2005以上版本使用`__declspec`约定方式调用后面的函数。
> __declspec主要是用于说明DLL的引出函数的,在某些情况下用__declspec(dllexport)在DLL中生命引出函数,比用传统的DEF文件方便一些.在普通程序中也可以用__declspec(dllimport)说明函数是位于另一个DLL中的导出函数。

显示声明该函数是在另一个dll中而新版本cocos默认不引入该dll（被否定）因此会报错`LNK2019`。该错误常见于没有在项目中引入相关的dll。解决方案是引入相关dll或直接引入完整的源码文件（不建议）。

建议的解决方案：在新版cocos2d中使用log指令代替CCLog指令
