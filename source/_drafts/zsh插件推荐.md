---
title: zsh插件推荐
tags:
  - ohmyzsh
abbrlink: c2b55725
date: 2019-01-18 14:18:47
---

## 依赖

需要已安装`zsh`和`oh-my-zsh`。如果没有安装请自行查找安装文档  
[oh-my-zsh官方文档](https://ohmyz.sh/)  

#### 快速安装指令

- 通过curl: `$ sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"`
- 通过wget: `$ sh -c "$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"`


## 优化显示

- [**zsh-syntax-highlighting**](https://github.com/zsh-users/zsh-syntax-highlighting) 输入可执行的程序与错误的命令会进行语法高亮提示
> git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

## 效率提升

- [**zsh-autosuggestions**](https://github.com/zsh-users/zsh-autosuggestions) 命令自动补全
> git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
