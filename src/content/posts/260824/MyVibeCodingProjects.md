---
title: 我的Vibe Coding实践
published: 2026-08-24
description: '这段时间用 AI 辅助写的一些项目和Vibe Coding心得。'
image: './assets/2026-08-24-11-11-17-image.png'
tags: [编程, AI, 方法论]
category: '技术'
draft: false
lang: 'zh-CN'
---

Vibe Coding 真是好东西，以往需要巨大学习成本和学习时间的编程，在AI和Agent的加持下突然变得触手可及，以往只能存在脑海里的一些想法和创意终于能落地生根。

初次接触AI编程应该是去年刚开始写本博客的时候，当时使用的是阿里开发的一个叫“iFLOW”的工具（目前已卒），有很多免费的内置模型，只有TUI，而接触Codex、OpenCode之类的更主流的编程工具已经是今年的事了。

年初寒假的时候我接触了 [AstrBot](https://astrbot.app)，为了24小时托管Astrbot服务，开学后我买了一台N100准系统小主机和内存条，插上了闲置的SATA固态盘。从此有了属于自己的“家里云”。

![N100 小主机](./assets/N100.jpg)

开学的这段时间我提前进组在浙大做毕设，闲的时候也是非常闲，于是整天玩AI编程，逐渐养成了自己的工具习惯（首图展示的）。作为一个门外汉，自然选择的全是GUI界面的工具。就这样一路下来也做了不少小项目。

下面展示部分成果，感兴趣的还请点点star，谢谢啦❤️

---

## AstrBot 插件

### astrbot_plugin_suwayomi_server

::github{repo="FFFold/astrbot_plugin_suwayomi_server"}

[Suwayomi-Server](https://github.com/Suwayomi/Suwayomi-Server) 是自托管的漫画服务器，支持挂载社区的各种漫画源，此 AstrBot 插件将自托管的 Suwayomi-Server 同 Astrbot 框架进行对接，这样在 QQ 等平台上就能直接搜索、在线阅读、批量下载漫画，还能订阅更新，有新章节自动推送。

这个插件打磨了很久，作为一个「聊天机器人里看漫画」的方案，它已经达到了相当高的完成度。

### astrbot_plugin_yamibo

::github{repo="FFFold/astrbot_plugin_yamibo"}

一个百合会论坛的自动化插件，主要目的是服务我加的两个白河豚的 QQ 群，以及自动签到涨积分。支持自动签到、热榜推送、下载/转发楼内漫画、未读消息检查等功能。论坛是 Discuz 系统。开发时遇到了论坛的反爬问题无法解决，后来参考了 [RSSHub](https://github.com/DIYgod/RSSHub) 的路由源码得以解决。

### astrbot_plugin_mailer

::github{repo="FFFold/astrbot_plugin_mailer"}

功能非常单纯的小插件，注册了一个 LLM tool，给 AstrBot 增加了 SMTP 邮件能力，支持 HTML 正文、内嵌图片和附件，同时做了比较严格的安全限制（域名白名单、附件根目录限制等）。

### astrbot_plugin_Network_Connectivity_Check

::github{repo="FFFold/astrbot_plugin_Network_Connectivity_Check"}

为了确保小服务器的代理是否能正常工作，做了这个 AstrBot 网络连通性检查插件，支持 HTTP / Ping / TCP 三种检测方式，定时检查目标可达性，异常时通过 QQ 等消息平台发通知。

## MaiBot 插件

### bangumi_browse_plugin

::github{repo="FFFold/bangumi_browse_plugin"}

给 MaiBot 这个机器人框架做了一个 Bangumi 插件，接入了 Bangumi 的 API 和网页数据，让机器人能查询动画、游戏、书籍，看新番速览、每日放送，还能读单集吐槽和长评。这样群聊里聊动画的时候，机器人参与对话的时候显得不会那么ylg。

## 工具类

### yomigana-ebook

::github{repo="FFFold/yomigana-ebook"}

一个日文轻小说加振假名注音的工具，是在[原仓库](https://github.com/rabbit19981023/yomigana-ebook)的基础上进行二次开发的项目，改善了性能，增加了一个过滤纯中文段落的功能，打包了一个exe文件。

::spoiler[改这个项目是为了学日语，但是没有坚持下来，太懒了💔] 

### ZJUwebVPN-decode

::github{repo="FFFold/ZJUwebVPN-decode"}

浙江大学 WebVPN 的 URL 使用了 AES-128-CFB 加密，密钥和 IV 就等于固定的字符串 `wrdvpnisthebest!`，所以直接写了个在线工具和 Python 版，方便快速转换链接。

最初是CC98的坛友有需求，顺手做了一个简单工具。

### x-copy-link

::github{repo="FFFold/x-copy-link"}

给河豚群的群友转发百合美图的时候每次复制链接都要右键点好几次，很烦，所以写了这个油猴脚本：给 X.com（Twitter）的时间流里每条推文都加一个"复制链接"按钮，不用再右键多点几次了。需求很朴素，效果也很朴素。

### sub-proxy

::github{repo="FFFold/sub-proxy"}

代理订阅转换工具：在使用 [daed](https://github.com/daeuniverse/daed) 这个新型透明代理工具的时候，发现有些订阅源会根据 User-Agent 判断来源，daed 的 UA 无法被正常识别，导致订阅链接失效，甚至被风控。这个工具就是个中间代理，转发请求时用自定义的 UA 替换，让任意客户端都能直接订阅。虽然是单脚本工具但是还是做了个 docker 镜像方便使用。

## 学术

### CAR-M-Literature-search

::github{repo="FFFold/CAR-M-Literature-search"}

和一个科研课题配套的文献检索流水线。用 PubMed 的 esearch/efetch 挖掘 CAR-DC、CAR-Mac、CAR-Mono、CAR-T、CAR-NK 五个主题的文献，合并去重后用 LLM 对每篇论文做分类（主主题、关联度、作用机制、疾病标签），最终输出 CSV 供下游分析。目前语料库有 1 万多篇记录，全部用 Python 标准库实现。可能是第一次将AI编程用于专业学习。
