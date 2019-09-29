---
title: Git骚操作之从一个分支中批量将离散的commit 迁移到另一个分支
tags:
  - git
  - cherry-pick
abbrlink: ec6df031
date: 2019-09-29 16:16:28
---

## 背景

因为某些原因。分支A与分支B在某个点分叉了。且分叉出来的分支B拥有很多乱七八糟的commit。现在希望将分支B中的代码迁移到分支A中。但因为分支B中有很多其他的commit。因此希望把分支B舍弃，只保留想要的一些commit。

本例是指仅作者为我自己的commit

## 方案

使用`git log`将自己的commit选出来。然后切换到分支A上。将选出来的commit cherry-pick。

首先根据某些条件选出想要迁移的commit。最终输出成空格分割的hash号

bash语句如下:
```bash
# 本例假设起始commit为4524cb34ea4
# 当前所在分支: 分支B
git log --author moonrailgun --oneline 4524cb34ea4^1...HEAD | awk '{print $1}' | sed '1!G;h;$!d' | xargs echo
```

语句解释:
- `git log --author moonrailgun --oneline 4524cb34ea4^1...HEAD` 获取范围`4524cb34ea4(包含该commit)~当前commit`的commit中作者是(包含)moonrailgun的列并用单行显示
- `awk '{print $1}'` 获取每行中以空格分割的第一列
- `sed '1!G;h;$!d'` 将输入按行倒序输出(因为`git log`输出的最后一行在最上面)
- `xargs echo` 将输入的行变成一行

由此可以得到一串用空格分割的hash字符串


然后`git checkout A`切换到分支A。执行`git cherry-pick <此处输入刚刚得到的字符串>`  
如有冲突，解决冲突后`git cherry-pick --continue`即可

## 结论

- 不会丢失代码
- 若有冲突能马上解决
- 保留commit细节
- 解放生产力
