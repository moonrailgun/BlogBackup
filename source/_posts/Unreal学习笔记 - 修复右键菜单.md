title: Unreal学习笔记 - 修复右键菜单
tags:
  - Unreal  
  - 注册表
date: 2016-10-2 17:14:23  

---

## 背景 ##
重装了一下Unreal。发现不知道为什么.uproject文件没有被自动关联。谷歌了一下找到了修复的解决方案。  
原文：[http://www.davidmoore.info/blog/2014/09/05/fix-the-missing-right-click-menu-for-unreal-engine-projects-uproject/](http://www.davidmoore.info/blog/2014/09/05/fix-the-missing-right-click-menu-for-unreal-engine-projects-uproject/)

~~不过可能是因为适用于老版本的Unreal。新版本的Unreal的文件结构发生了变化。包括很多谷歌上的描述也是使用的原文的结构。而我用的Unreal 4.13.1版本并不适用。因此进行了一些修改。贴出解决方案cmd命令行文件。~~  
不过该版本适用于自编译的Unreal引擎。对于使用Launcher安装的版本来说并不适用因此在原来的基础上进行了一些修改具体代码如下：

```bash
:: UnrealProjectMenuRegistration.cmd
::
:: This batch file will try to find where the Unreal Engine is installed, then update your registry
:: to register the Unreal Project File type (and its right click menu for things such as generating
:: Visual Studio project files, and launching)
::
:: Run as an Administrator, as it's required for writing to HKLM.
::
:: Author: David Moore <david@sadrobot.co.nz>
:: 
:: 二次修改:moonrailgun
:: http://www.moonrailgun.com/

::@ECHO OFF

echo.
echo Locating where Unreal Engine Launcher...
set UnrealLauncherDir= %~pd0

IF "%UnrealLauncherDir%"=="" GOTO CannotFindUnrealEngine

echo.
echo Using Unreal Engine directory: %UnrealLauncherDir%

set LauncherPath=%UnrealLauncherDir%Engine\Binaries\Win64\UnrealVersionSelector.exe

echo.
echo Adding registry keys for the Unreal Project right click menu...

:: HKLM\SOFTWARE\Classes\.uproject
reg ADD "HKLM\Software\Classes\.uproject" /ve /d Unreal.ProjectFile /f
IF ERRORLEVEL 1 (
    echo Couldn't write to registry. Did you forget to run this batch file as an administrator?
    goto TheEnd
)

:: HKLM\SOFTWARE\Classes\Unreal.ProjectFile
reg ADD "HKLM\Software\Classes\Unreal.ProjectFile" /ve /d "Unreal Engine Project File" /f

:: HKLM\SOFTWARE\Classes\Unreal.ProjectFile\DefaultIcon
reg ADD "HKLM\Software\Classes\Unreal.ProjectFile\DefaultIcon" /ve /d "\"%LauncherPath%\"" /f

:: HKLM\SOFTWARE\Classes\Unreal.ProjectFile\shell\open
reg ADD "HKLM\Software\Classes\Unreal.ProjectFile\shell\open" /ve /d "Open" /f
reg ADD "HKLM\Software\Classes\Unreal.ProjectFile\shell\open\command" /ve /d "\"%LauncherPath%\" /editor \"%%1\"" /f

:: HKLM\SOFTWARE\Classes\Unreal.ProjectFile\shell\run
reg ADD "HKLM\Software\Classes\Unreal.ProjectFile\shell\run" /ve /d "Launch game" /f
reg ADD "HKLM\Software\Classes\Unreal.ProjectFile\shell\run" /v Icon /t REG_SZ /d "\"%LauncherPath%\"" /f
reg ADD "HKLM\Software\Classes\Unreal.ProjectFile\shell\run\command" /ve /d "\"%LauncherPath%\" /game \"%%1\"" /f

:: HKLM\SOFTWARE\Classes\Unreal.ProjectFile\shell\rungenproj
reg ADD "HKLM\Software\Classes\Unreal.ProjectFile\shell\rungenproj" /ve /d "Generate Visual Studio project files" /f
reg ADD "HKLM\Software\Classes\Unreal.ProjectFile\shell\rungenproj" /v Icon /t REG_SZ /d "\"%LauncherPath%\"" /f
reg ADD "HKLM\Software\Classes\Unreal.ProjectFile\shell\rungenproj\command" /ve /d "\"%LauncherPath%\" /projectfiles \"%%1\"" /f

:: HKLM\SOFTWARE\Classes\Unreal.ProjectFile\shell\switchversion
reg ADD "HKLM\Software\Classes\Unreal.ProjectFile\shell\switchversion" /ve /d "Switch Unreal Engine version..." /f
reg ADD "HKLM\Software\Classes\Unreal.ProjectFile\shell\switchversion" /v Icon /t REG_SZ /d "\"%LauncherPath%\"" /f
reg ADD "HKLM\Software\Classes\Unreal.ProjectFile\shell\switchversion\command" /ve /d "\"%LauncherPath%\" /switchversion \"%%1\"" /f

:Done
echo.
echo Done.
echo.
goto TheEnd

:CannotFindUnrealEngine
echo.
echo DOH! Can't find the Unreal Engine.
echo.
goto TheEnd

:TheEnd
pause
```

## 用法 ##
将文件保存为`UnrealProjectMenuRegistration.cmd`到Epic Game根目录下(`Epic Games\Launcher\UnrealProjectMenuRegistration.cmd`)  
右键点击以`管理员的身份运行`。如果有杀软拦截请选择允许  
完成后尝试重启电脑/重启Epic Games Launcher完成关联操作