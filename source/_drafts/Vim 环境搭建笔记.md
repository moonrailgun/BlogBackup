---
title: Vim 环境搭建笔记
tags:
  - vim
date: 2019-12-05 16:23:23
---

## 起因

听说Vim对开发者开发效率有比较大的提升，正好最近在寻求突破，就开始尝试一下一直想尝试使用的vim

系统环境: 
- Mac
- zsh

## 替换系统自带的vim

```bash
# 使用 brew 安装 vim
$ brew install vim

$ echo "vim=/usr/local/bin/vim" >> ~/.zshrc

```

## 划分vim配置

```
~
├── .vimrc
└── .vim
    ├── autoload
    ├── general.vim
    ├── mappings.vim
    └── plugins.vim
```

## 安装包管理器

使用[vim-plug](https://github.com/junegunn/vim-plug) 作为包管理器

## 插件、主题、配置


## 技巧

- 退出时保存会话并在下次打开时恢复
```
au VimLeave * mks! ~/Session.vim
if expand("%")==""
  if(expand("~/Session.vim")==findfile("~/Session.vim"))
    silent :source ~/Session.vim
  endif
endif
```
