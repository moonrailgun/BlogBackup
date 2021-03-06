---
title: Vim 操作笔记
tags:
  - vim
abbrlink: 49d9534d
date: 2019-12-05 16:23:23
---

## 起因

听说Vim对开发者开发效率有比较大的提升，正好最近在寻求突破，就开始尝试一下一直想尝试使用的vim

此处主要记录了配置vim的一些关键

系统环境:
- Mac
- zsh

## 替换系统自带的vim

```bash
# 使用 brew 安装 vim
$ brew install vim

$ echo "vim=/usr/local/bin/vim" >> ~/.zshrc

```

## 安装包管理器

使用[vim-plug](https://github.com/junegunn/vim-plug) 作为包管理器

## 划分vim配置(可选)

```
~
├── .vimrc
└── .vim
    ├── autoload
    ├── general.vim
    ├── mappings.vim
    └── plugins.vim
```

在`.vimrc`中使用如下命令进行子配置运行
```
runtime! mappings.vim
runtime! general.vim
runtime! plugins.vim
```

## 插件、主题、配置

<!-- TODO -->

## 快捷键

#### 不常见但实用
- `Ctrl + o`: 跳到上一个位置
- `Ctrl + i`: 跳到下一个位置
- `Ctrl + u`: 上翻半页
- `Ctrl + d`: 下翻半页
- `Shift + *`: 在当前文件中搜索光标指定位置的文本
- `Ctrl + r`: 在命令模式如插入寄存器中的文本。如`Ctrl+r` `"`

- `cw`: 替换从光标所在位置后到一个单词结尾的字符

## 技巧

- 智能大小写匹配

  如果搜索字符串有大写时则对大小写敏感
  ```
  set ignorecase
  set smartcase
  ```
  **必须设置了ignorecase后smartcase才生效**

- 让vim支持系统剪切板

  首先需要vim支持剪切板功能，如果没有的话就下载完整的包
  ```bash
  $ vim --version | grep clipboard
  ```
  如果`clipboard`属性前为+则说明vim已支持剪切板

  然后设置`.vimrc`
  ```
  set clipboard=unnamed
  ```

- 退出时保存会话并在下次打开时恢复

  ```
  au VimLeave * mks! ~/Session.vim
  if expand("%")==""
    if(expand("~/Session.vim")==findfile("~/Session.vim"))
      silent :source ~/Session.vim
    endif
  endif
  ```

## 参考文章
- [简明 VIM 练级攻略](https://coolshell.cn/articles/5426.html)
