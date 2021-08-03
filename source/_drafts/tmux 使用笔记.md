---
title: tmux 使用笔记
tags:
  - tmux
date: 2021-08-03 10:15:57
---

- 在iterm2中，在tmux中使用选择复制时，可能会出现黄色背景复选框，当松开鼠标后会取消锁定，此时iterm2会弹出提示:
  ```
  Looks like you're trying to copy to the pasteboard but mouse reporting has prevented making a selection disable mouse reporting?
  ```
  此时不要进行任何设置，因为如果进行了设置以后会无法在tmux中进行正确的窗口滚动，正确的做法是关闭提示，打开`Preference -> Profiles -> Terminal -> Enable mouse reporting` 取消选中 `Report mouse click & drag`。这样就可以正常进行复制而同时也可以使用滚动对当前屏幕进行翻页
