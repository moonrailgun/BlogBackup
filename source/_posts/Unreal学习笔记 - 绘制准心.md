title: Unreal学习笔记 - 绘制准心
tags:
  - Unreal  
date: 2016-10-12 12:47:24 

---

# 在屏幕中央绘制准心 #

创建继承于HUD的蓝图类。在Gamemode中将原始HUD指向到新的HUD蓝图上  

然后在创建的蓝图类中加入如下节点：
![/images/unreal/HudDrawTexture.png]()  
ReceiveDrawHUD为绘制事件调用
DrawTexture为绘制贴图的方法，需要传入绘制贴图，屏幕坐标，绘制大小，UV宽高，填充颜色（纯白贴图可以通过修改填充颜色的方法来修改绘制图形颜色）