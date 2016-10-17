title: Cocos2dx学习笔记——编译器提示LINK1104无法打开文件“libcocos2d_2013.lib”的问题
date: 2016-04-04 20:56:25 
tags:
- cocos2dx
- LINK1104
- libcocos2d_2013.lib
- 游戏开发

---

在编译项目的时候可能会出现这样的错误：
>LINK1104无法打开文件“libcocos2d_2013.lib”

这是因为VS无法找到这个库的原因。
解决方案有两个：
- 如果你的项目是带有完整源代码的版本，找到main.cpp文件。找到一段代码，删掉：
>#if _MSC_VER > 1800
#pragma comment(lib,"libcocos2d_2015.lib")
#pragma comment(lib,"libbox2d_2015.lib")
#pragma comment(lib,"libSpine_2015.lib")
#pragma comment(lib,"librecast_2015.lib")
#pragma comment(lib,"libbullet_2015.lib")
#else
#pragma comment(lib,"libcocos2d_2013.lib")
#pragma comment(lib,"libbox2d_2013.lib")
#pragma comment(lib,"libSpine_2013.lib")
#pragma comment(lib,"librecast_2013.lib")
#pragma comment(lib,"libbullet_2013.lib")
#endif

	这是VS请求连接原始版本cocos应对不同版本的预编译vs依赖库。在源代码版本的项目中是没有这些文件的。在第一次生成的时候会生成对应vs的库文件。

- 如果你的项目是预编译版本的项目工程文件。则右键项目----->属性---->链接器------>常规 -------> 附加库目录。添加原始cocos文件已经编译好的预编译库文件路径到新的一行。如果不知道文件的目录可以直接用windows自带的文件名搜索`libcocos2d_2013.lib`文件。其他同理