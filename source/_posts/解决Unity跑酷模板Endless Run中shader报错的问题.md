---
title: 解决Unity跑酷模板Endless Run中shader报错的问题
tags:
  - Unity
  - 游戏开发
  - Shader
abbrlink: '49910e89'
date: 2016-04-21 10:00:25
---

对于shader问题。很多处于中低级的Unity开发者都束手无策。在使用Endless Run模板项目的时候会出现报错：
`Shader error in 'Custom/Curved': variable 'o' used without having been completely initialized at line 42 (on d3d9)`

这个问题是说返回的`参数o`不完整。解决方案如下：
打开`/Assets/Endless Run/Curved.shader`文件。找到`v2f vert (appdata_full v){}`函数。在返回`变量o`之前进行参数补全。添加如下两行代码：
```GLSL
o.viewDir = v.texcoord1;
o.color = v.color;
```

自此你的项目就能够正常运行了
