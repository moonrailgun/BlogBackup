title: python学习笔记
date: 2018-02-10 10:25:23
tags:
- python
---

## Flask

`flask`是一个轻量级的web框架。

## PIL 相关内容

- **混合半透明图片与半透明图片时会出现中空透明项目的问题**

  `im` 与 `layer` 为两张半透明图，如下图所示:  
  ![](/images/img1.png)  
  *im(100x100)*  
  ![](/images/img2.png)  
  *layer(100x100)*  

  执行:
  ```
  im.paste(layer, mask=layer)
  ```
  返回  
  ![](/images/after1.png)

  会发现里面有透明像素，而不是我们想要的`layer`叠加到`im`上的效果  
  这是因为layer本身拥有一个渐变的alpha通道，通过`mask`指定的alpha通道蒙版会在`im`抠出一个渐变的圆形。然后再把拥有渐变效果的`layer`叠加到`im`上。  
  这就相当于在两个地方处理了两次透明处理。解决方法很简单，就是在粘贴`layer`的时候丢弃掉它的alpha通道即可

  返回  
  ![](/images/after2.png)
