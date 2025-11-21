---
title: 博客站点的改动记录
date: 2024-10-23
---

在此处，记录本站点的变动，或大或小，会不小心迟到，也会一直优化升级🌟
<!-- more -->

~~使用git连接部署时请不要使用代理的TUN模式~~😜

- 2024-10-23 增加了"最近在看"页面
> ✨  
> 调用了Hexo的Bangumi gallery插件生成页面，自定义页面名称，如"anime"，在首页新增菜单选项“最近在看”并实现跳转。示例如下：

``` YAML
bangumi_gallery:      # 插件自定义
path: /anime.html     # 番剧墙页面的路径

menu:                          # 首页菜单选项设置
最近在看: /anime || fa fa-film  # 目录内链接，'/anime'之后不需要加'/'，图标设置为'fa-film', 即Font Awesome icon

```

