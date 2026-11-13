---
title: 常用 OI 软件美化教程
date: 2026-11-11 13:17:34
categories: 科技·工程
tags: OI，美化
description: 洛谷，ATcoder，Codeforces的美化教程，基于篡改猴与Stylus
top_img: https://a1.boltp.com/2026/11/11/6af3fc31524db.jpg
cover: https://a1.boltp.com/2026/11/11/6af3fc31524db.jpg
swiper_index: 2
---
# Part.0 观前须知

- 本文中提到的脚本与样式，大多为活跃在编程社区的大手子用自己的课余时间编写，并非本人编写，所有我能查到出处的脚本与样式，都会标上原创作者名字与链接，如果有侵权，私信我的洛谷账号（uid：1630197），我会马上删文章。
- 本文中所有效果展示中的个人主页部分，都是我的各大 OJ 自己的号，且所有图片都不包含隐私内容，可以放心观看。
- 本文的创作者为 Lemon_eggplant，欢迎各位大手子转载，最好标明出处。

# Part.1 美化前的准备

一提到网页的美化与修改，都绕不过两个著名的插件：Stylus 和 Tampermonkey（以下简称篡改猴），其中 Stylus 主要负责网页的 css，而篡改猴不仅可以修改 css，还可以对 js 进行修改，所以经常对美化网页起到美化与维护的作用（当然也有很多非常好用的插件，下文会提到）。

## 1.1 Stylus 的下载

如果你用的是 Google 浏览器，并且可以找到 Stylus 的商店，可以[链接直达](https://chromewebstore.google.com/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne?hl=zh-CN&utm_source=ext_sidebar)，如果不可以，或者使用其他浏览器，我会给出一个通用的方案。

首先[点击这个链接](https://github.com/openstyles/stylus/)，去到 Stylus 的 github 发布页，点击对应的浏览器下载（不是 chrome 或者 furefox 可以点第三个，如果不行可以上网查一查教程）。

![](https://a1.boltp.com/2026/10/08/6ac735771aa05.png)

随后，将下载好的压缩包拖进我的扩展，等他下载好就可以看到了。

![](https://a1.boltp.com/2026/10/08/6ac736caa3cea.png)

## 1.2 篡改猴的下载

篡改猴相比 Stylus 更加简单，在扩展商店里找到篡改猴，直接获取就可以了。

![](https://a1.boltp.com/2026/10/08/6ac73820706f1.png)

搞好准备工作就可以正式开始美化了。

---

# Part.2 洛谷

众所周知，在 $2026$ 之间，洛谷的美化社区非常丰富，有氩洛谷，Smart-luogu 等高质量美化样式。但是，洛谷在 $2026$ 年进行了多次重大更新，包括多次主题商店的变化及 css 模板的变更，这使得这些插件的功能都收到了影响。

不过，好在现在新生代洛谷美化插件已经在逐渐冒头，如可高度自定义的氧洛谷 $2026$，氩洛谷 $2.0$，等等，大家可以去 [Stylus 的洛谷插件社区](https://userstyles.world/search?q=%E6%B4%9B%E8%B0%B7)查看，不过今天，我要重点介绍的是洛谷新生代的优化主题，由 Stars-Twinkle 编写的：BigBallOfMud Luogu。

## 2.1 效果展示

### 主页

![](https://a1.boltp.com/2026/10/08/6ac73e59e24af.png)
### 题目列表

![](https://a1.boltp.com/2026/10/08/6ac73eb7449cb.png)
### 评测记录

![](https://a1.boltp.com/2026/10/08/6ac73fa9ab768.png)
### 练习情况

![](https://a1.boltp.com/2026/10/08/6ac73f2e65a93.png)

### 暗色模式（主页）

![](https://a1.boltp.com/2026/10/08/6ac7403a6c346.png)

如果觉得这个样式比较好看，就开始下载吧。

## 2.2 下载方法
下载这个样式的方法非常简单，[点开 github 仓库地址](https://github.com/Stars-Twinkle/BigBallOfMud-Luogu)，点击“点这里安装”的两个按钮，然后一直点确定就可以了。

![](https://a1.boltp.com/2026/10/08/6ac74117ec5f6.png)

不过，正如作者在下面的介绍里面说的那样，这一套样式对于渣机来说，是相对而言比较卡的（本人就是受害者），所以，我们需要对样式和脚本进行优化。

本人已经给这两个部分都做了优化，大家可以按照自己的喜好和提示进行进一步的调整，经过本人优化后的洛谷已经是流畅的了（温馨提示：模糊度不要调太高，不然会很卡）。

:::success[美化样式]
洛谷云剪贴板链接（放在 Stylus 里面）：[美化样式](https://www.luogu.com.cn/paste/2njcqf8a)。
:::

:::success[脚本]
洛谷云剪贴板链接（放在篡改猴里面）：[脚本](https://www.luogu.com.cn/paste/n2chn8sp)。
:::

## 2.3 其他使用脚本的推荐

首先，相信很多人都装了沉石鱼惊旋老师的[洛谷提交记录美化](https://www.luogu.com/article/xscqjzbk)，但是你会发现装完洛谷页面美化，会把提交记录的动图也给覆盖掉，所以我将沉石鱼惊旋老师的原文进行了略微的修改，使它可以跟市面上绝大多数界面美化的脚本兼容。

:::success[洛谷提交记录美化（修改版）]
洛谷云剪贴板链接（放在篡改猴里面）：[洛谷提交记录美化（修改版）](https://www.luogu.com.cn/paste/hvbm14aa)
:::

还有一些洛谷优化以及实用脚本，大家可以参考以下两篇文章：

1. [Moon_Traveller](https://www.luogu.com/user/682394) ：[洛谷的一些好用的插件](https://www.luogu.com/article/xjsqw3up)。
2. [\_\_CrossBow_EXE\_\_](https://www.luogu.com/user/967841)：[洛谷热门脚本安装教程+详解](https://www.luogu.com/article/93ovod34)。

---

# Part.3 Codeforces

Codeforces 是当今世界 OI 圈内最为著名，使用人数最多的 OJ（中国目前洛谷比 Codeforces 知名的多），想要提升 Codeforces 的使用舒适度，重点在于翻译与微调界面美观度。

## 3.1 效果展示

### 主页

![](https://a1.boltp.com/2026/10/08/6ac76b83c315d.png)
### 比赛

![](https://a1.boltp.com/2026/10/08/6ac76bc7b7389.png)
### 个人主页

![](https://a1.boltp.com/2026/10/08/6ac76c434aeef.png)

## 3.2 下载方法

### Smart Codeforces

作者：OIerZhang。

[点开这个链接](https://userstyles.world/style/20748/smart-codeforces)，点击介绍图片下面的 install 按钮，确定安装样式就可以。

可以在编辑样式中按照自己的喜好自定义背景和玻璃的透明效果，卡片亚克力模糊半径越高越模糊，这里分享一下自己的配置。

:::success[替换掉自定义变量的部分]
```stylus
:root /* 自定义变量 */
{
    --Background: url(https://a1.boltp.com/2026/09/23/6ab3646e56f4e.png); /* 自定义背景 URL */

    --Card-Radius: 10px; /* 卡片圆角大小 */
    --Card-Background: #FFFFFFC0; /* 卡片背景颜色 */
    --Card-BlurRadius: 0px; /* 卡片亚克力模糊半径 */

    --Button-Background: #FFFFFFC0; /* 按钮背景颜色 */
    --Button-Background-Dark: #00000030; /* 按钮深色背景颜色 */
    --Button-Radius: 5px; /* 按钮圆角大小 */

    --Text-Dark: #000000; /* 深色文字 */
    --Text-Light: #FFFFFF; /* 浅色文字 */
}
```
:::

### Codeforces Better

作者：北极小狐。

[点开这个链接](https://home.greasyfork.org.cn/zh-hans/info#/zh-CN/scripts/465777/detail)，点击安装脚本就可以了。

主要功能：

- 可以调黑暗和白天模式，
- 可以给题目进行只能的 AI 翻译。
- 可以提供很多方便快捷的组件和功能。

可以说是 Codeforces 目前功能最完整，最方便快捷的脚本了。

---

# Part.4 Atcoder

Atcoder 是日本的一个 OJ，以题目质量高而闻名，作者还很菜，没打过几场比赛，也只需要简单的两个脚本和样式就能大大提高观感。

## 4.1 效果展示

### 主页

![](https://a1.boltp.com/2026/10/08/6ac7721130781.png)
### 比赛

![](https://a1.boltp.com/2026/10/08/6ac7737f8eca8.png)
### 个人主页

![](https://a1.boltp.com/2026/10/08/6ac773b911752.png)

## 4.2 下载方法

### Smart Atcoder

作者：hhy8399

[点开这个链接](https://userstyles.world/style/21178/)，点击介绍图片下面的 install 按钮，确定安装样式就可以。

按照自己的需要进行自定义背景和玻璃模糊度调节即可。

### Atcoder Better

作者：北极小狐。

[点开这个链接](https://home.greasyfork.org.cn/zh-hans/info#/zh-CN/scripts/471106/detail)，点击安装脚本就可以了。

由于与 Codeforces Better 为同一个作者，且主要功能也差不多，这里不再叙述。

---

:::success[小提示]
作者使用的是 edge 浏览器，如果其他浏览器遇到问题，可以多多查阅资料，多多尝试。
:::
**The end.**