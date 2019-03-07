---
title: Unreal学习笔记 - 使用JoinSession成功加入服务器但是无法跳转到服务器当前地图
tags:
  - Unreal
  - Session
abbrlink: '67516082'
date: 2016-10-06 16:13:54
---

## 现象 ##

创建session后。第二个找到可用的session，但是当前玩家数量显示为0。并且加入后无法跳转到服务器当前的地图。
日志如下：
```
LogGameMode:Display: Match State Changed from InProgress to LeavingMap
LogGameState: Match State Changed from InProgress to LeavingMap
LogNet: Browse: 10.10.85.66:0//Game/Maps/StartLevel
LogInit: WinSock: Socket queue 32768 / 32768
PacketHandlerLog: Loaded PacketHandler component: Engine.EngineHandlerComponentFactory (StatelessConnectHandlerComponent)
LogNet: Game client on port 0, rate 10000
LogNet: UPendingNetGame::InitNetDriver: Sending hello. [UNetConnection] RemoteAddr: 10.10.85.66:0, Name: IpConnection_78, Driver: PendingNetDriver IpNetDriver_77, IsServer: NO, PC: NULL, Owner: NULL
```

## 解决方案 ##
原因在于使用`CreateSession`创建完毕后使用`OpenLevel`进行跳转。需要给予`OpenLevel`参数`Options`中写入`listen`关键字才可以成功跳转

具体原因可以查看Unreal控制台命令相关说明
