title: Cocos2dx学习笔记——CSLoader创建FileNode的报错问题
date: 2016-03-15 16:05:59 
tags:
- cocos2dx
- CSLoader
- 游戏开发

---

使用`CSLoader::createNode("IndexScene.csb");`创建节点时发生错误。原因在于文件节点。其结构如下：
- Scene
	- FileNode
		- Background
		- Button

出现错误。
原因可能为无法解析文件节点的问题
临时解决方案：不使用文件节点进行嵌套。简化csb文件结构。