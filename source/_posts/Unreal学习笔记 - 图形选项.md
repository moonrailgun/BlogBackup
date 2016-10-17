title: Unreal学习笔记 - 图形选项
tags:
  - Unreal  
date: 2016-10-08 17:05:31 

---

### 在选项中用户根据自己的环境调整游戏的画质 ###

**使用`Execute Console Command`输入指令**

- 屏幕缩放 r.screenPercentage [百分比][0~100]
- 视距 sg.ViewDistanceQuality [Low|Medium|High|Wow][0|1|2|3]
- 抗锯齿 sg.AntiAliasingQuality [Low|Medium|High|Epic][0|1|2|3]
- 后期处理特效(视觉效果) sg.PostProcessQuality [Low|Medium|High|Epic][0|1|2|3]
- 阴影质量 sg.ShadowQuality [Low|Medium|High|Epic][0|1|2|3]
- 贴图质量 sg.TextureQuality [Low|Medium|High|Epic][0|1|2|3]
- 特效 sg.EffectsQuality [Low|Medium|High|Epic][0|1|2|3]
- 垂直同步 r.VSync [0|1]
- 设置屏幕分辨率 r.SetRest [640x480|1280x720|1366x768|1920x1080|..(格式为 宽度x长度 后缀可以跟上`w`或`f`表示window或fullscreen)]
- 设置全屏模式 r.FullScreenMode [0|1|2]
> 0: normal full screen (renders faster, more control over vsync, less GPU memory, 10bit color if possible)  
> 1: windowed full screen, desktop resolution (quick switch between applications and window mode, full quality)  
> 2: windowed full screen, specified resolution (like 1 but no unintuitive performance cliff, can be blurry, default)