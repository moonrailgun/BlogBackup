---
title: Cocos2dx学习笔记——节点与层的父子坐标区别
tags:
  - cocos2dx
  - 父子关系
  - 游戏开发
abbrlink: d0d3ce00
date: 2016-03-25 17:27:28
---

在cocos2d中，我们一切ui的基础——节点的坐标系起始坐标依赖于父节点的坐标。当我们在一个node对象中使用addChild方法后，子节点的坐标是依赖于父节点。
也就是说如下代码：
```cpp
auto parent = Node::create();
parent->setPosition(Vec2(10,20));
addChild(parent);

auto child = Node::create();
child->setPosition(Vec2(5,10));
parent->addChild(child);
```
child个人坐标系的位置是(5,10),然而因为是parent的子节点。所以child的世界坐标系位置应该加上父节点的坐标，也就是(5+10,10+20)。
通过这个原理我们就能很方便的控制子节点与父节点的坐标关系。

而其中layer和一般的节点不同。虽然layer继承于node，可以成为另一个node的子节点，但是当layer成为一个node的子节点后。其坐标起始点并不会改变。因为在源码中：
```cpp
bool Layer::init()
{
    Director * director = Director::getInstance();
    setContentSize(director->getWinSize());
    return true;
}
```
规定了layer必须占满屏幕。所以不管父节点的坐标。layer必定占满整个屏幕。因此想通过父节点的坐标来控制子layer的坐标是办不到的。
