---
title: Linux终端应用记录
tags:
  - Linux
abbrlink: 879c760d
date: 2019-09-25 09:32:04
---

## 系统相关

- `cloc`: 命令行的代码统计工具
- `fzf`: 模糊查找工具: 命令与文件
- `htop`: 命令行任务管理器
- `ncdu`: 大文件检索工具
- `iftop`: 用于查看当前流量的工具
- `fd`: 更好的find命令替代


## 应用相关

- `pm2`: node常驻服务管理工具


## 应用配置

### fzf

增加过滤条件与内容预览
- 依赖应用
  - fd
  - highlight

```bash
# .zshrc
export FZF_DEFAULT_COMMAND="fd --exclude={.git,.idea,.vscode,.sass-cache,node_modules,build} --type f"
export FZF_DEFAULT_OPTS="--height 40% --layout=reverse --preview '(highlight -O ansi {} || cat {}) 2> /dev/null | head -500'"
```
