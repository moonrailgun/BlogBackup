title: Cocos2dx学习笔记——Ref对象管理之保留与释放
date: 2016-04-07 18:09:03 
tags:
- cocos2dx
- Ref
- autorelease
- 游戏开发

---

在Cocos中，我们一切的智能类都继承于Ref引用类。方便内存的优化与管理。这是推荐的自定义类方法。
而推荐的创建（对象实例化）方法是在头文件中使用`CREATE_FUNC(__TYPE__)`方法来创建。创建的时候需要配上一个自定义init()来对类数据进行初始化。

这里需要注意一点。那就是对象的自动释放:
`pRet->autorelease();`
cocos在`CREATE_FUNC`宏中配置自动释放的机制。这个方法使得内存的管理变得很方便。因为很多时候一些数据只需要调用一次。
我们来看看`autorelease()`方法的说明：
> Ref *  autorelease () 
  在下一帧自动释放 Ref 对象的所有权。  

那么如果当我们需要让这个类能够长久的存在下去、比如全局管理类。那么这个方法就会很明显的影响到代码的逻辑实现。因为在下一帧以后数据都被自动释放掉了。如果我们还想访问的话就会报错。因为此时地址都指向`0xfeeefeee`（该指针指向的对象已经被释放，地址就会指向`0xfeeefeee`）。

解决方案：**在该对象初始化的时候接管对象的所有权。即保留该对象不让它被自动释放。**

如在init()函数中声明：`this->retain();`
当需要释放的时候手动释放：`this->this->retain();`

我们来看一下这两个方法的说明
>void  retain () 
保留 Ref 对象的所有权。 会将 Ref 对象的引用计数 +1。 

>void  release () 
释放 Ref 对象的所有权。 会将 Ref 对象的引用计数 -1 


注意：多层对象需要每个都进行保留处理。
比如如下结构：
```cpp
class Test: public Ref{
public:
	Ref* a;
	Ref* b;
}
```
我们在一个Test中存了a,b两个对象的地址。那么我们对内存进行管理的时候需要把每个都进行retain()方法。
```cpp
this->retain();
a->retain();
b->retain();
```

如果仅仅执行`this->retain();`操作。那么只会保留a,b两个对象的引用不被释放。而a和b里面可以被自动释放的引用都会被自动释放。
为什么要这么做？如果一个`Node* node`对象没有立刻（这一帧）中被addChild。那么在下一帧以后进行addChild就会失败因为addChild会判定该对象的父节点是否为空。如果不为空则不能被添加。在代码中的判定是node->_parent == nullptr。即node->_parent地址是否为0,而我们都知道释放后的地址会指向`0xfeeefeee`。因此会出现bug。