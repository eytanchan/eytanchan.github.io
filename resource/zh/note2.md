---
title: 使用Git同步Obsidian笔记
date: 2025-02-20
---

自22年开始，我一直使用Obsidian作为自己的笔记软件，无论是对Markdown语法的支持、社区插件生态，还是最开始吸引我的易用和免费，都让这款软件成为了伴随我最久，让我记录最多内容和想法的软件。
<!-- more -->

不过，除开保管库的目录日益庞杂以及标签体系的混乱，Obsidian有一个一直让我头疼的问题，那就是多端同步的解决方案。固然，Obsidian有官方提供的同步服务，不过，和对使用Notion同步笔记的顾虑一样，我比较担心数据的所有权不在自己手中。

我此前一直在检索云服务提供商如iCloud、Google Drive 或者Dropbox提供云存储来托管我的笔记保管库。但是我发现都存在不同系统间的同步问题。移动端是无法便捷地通过Obsidian的手机软件读取放在云端的存储库的。并且，使用云服务也就意味着是明文保存笔记仓库，这会增加我对隐私的一点小担心😥。于是即使在23年我就想要解决多端同步的问题，但一直苦于该方案实行的不方便程度而不了了之。

Git是我开始写博客后才接触到的版本控制和远程同步的解决方案。或许是因为思维固化，~~或许是因为懒，~~ 觉得这只是一个后端的同步工具，在最开始前，我并没有将其作为一种解决方案。在今天早晨，我再次检索同步方案时，发现了官方指南中对Git有分节的内容，中文和英文的检索结果显示，这是可行的解决方案并且稳定。建立个人的私有仓库也能够保证数据由自己掌控。

实施的方法是简单的，参考教程[The Easiest Way to Setup Obsidian Git (to backup notes)](https://forum.obsidian.md/t/the-easiest-way-to-setup-obsidian-git-to-backup-notes)即可


关于Git的安装使用的准备工作，可以回到[插件开发者的说明文档](https://publish.obsidian.md/git-doc/Start+here)中进行查找

关于以上教程的🍪食用注意事项和插件版本的更新，有几项是需要了解的：
1. 对于使用HTTPS进行同步的，需要使用`https://<Github_Token>@github.com/<user_name>/<repo_name>.git`的格式，直接复制仓库建议的地址可能需要重复验证
2. 如果是空仓库，会有`origin/main`的无法同步的提示，需要在需要同步的目录下进入终端，运行如下指令：
	```
	git branch --unset-upstream
	git push --set-upstream origin main
	```
3. 提交同步时，教程中的`Backup`选项[在官方文档的中已经停用](https://publish.obsidian.md/git-doc/Start+here#Backup+-+no+longer+in+use)，直接使用`<Commit-and-Sync>`或相似指令选项即可

**完成以上教程的步骤后可以顺利实现不同的桌面端间对仓库的拉取和提交，那么移动端呢？**

由于Github的支持对Markdown的预渲染，而我并没有移动端编辑笔记的习惯和需求，在移动端最大的需求是阅读和回顾，所以只需要下载软件登入账户即可，同时无存储负担，所以目前这是一套对我而言基本满分💯的解决方案。




