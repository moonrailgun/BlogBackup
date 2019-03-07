---
title: Unreal学习笔记 - 使用steam来进行多人联机
tags:
  - Unreal
  - Steam
abbrlink: 4de36f08
date: 2016-10-05 17:23:16
---

## 配置 ##

在DefaultEngine.ini添加如下设置
```
[/Script/Engine.GameEngine]
+NetDriverDefinitions=(DefName="GameNetDriver",DriverClassName="OnlineSubsystemSteam.SteamNetDriver",DriverClassNameFallback="OnlineSubsystemUtils.IpNetDriver")

[OnlineSubsystem]
DefaultPlatformService=Steam

[OnlineSubsystemSteam]
bEnabled=true
SteamDevAppId=480

[/Script/OnlineSubsystemSteam.SteamNetDriver]
NetConnectionClassName="OnlineSubsystemSteam.SteamNetConnection"
```

完成对steam的引用。其中
> 480 SteamDevAppId 是 Valve 的测试应用 ID，所有人共享。随着工作的深入您需要自己的应用 Id，但 Steam 的大部分功能均可通过测试 ID 使用。

如果仅需要本地LAN联机。可以值添加
```
[OnlineSubsystem]
DefaultPlatformService=Steam
```

## 模块 ##
在项目插件选项中勾选`OnlineSubsystemSteam`完成steam在线子系统模块的导入。

## 使用 ##
### 创建会话 ###
![](/images/unreal/CreateSession.jpg)
### 加入会话 ###
![](/images/unreal/JoinSession.jpg)
### 查找会话 ###
![](/images/unreal/FindSessions.jpg)
### 销毁会话 ###
![](/images/unreal/DestroySession.jpg)

## 进阶 ##
不满足于默认的功能？想要诸如好友、成就、语音...这些steam的拓展功能？在UnrealForum有一款插件正是满足了这些需求[Advanced Sessions Plugin](https://forums.unrealengine.com/showthread.php?69901-Advanced-Sessions-Plugin)而且这款插件是完全免费的
