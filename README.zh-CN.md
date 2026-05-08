<a name="readme-top"></a>

<div align="center">

<img width="160" src="https://raw.githubusercontent.com/perfect-panel/NPanel-assets/refs/heads/main/logo.svg">

<h1>NPanel 前端</h1>

**互联网生来是为了连接人类——而不是分裂人类。**

[English](./README.md)
·
中文
·
[更新日志](./CHANGELOG.md)
·
[报告问题][issues-link]
·
[请求功能][issues-link]

<!-- SHIELD GROUP -->

[![][github-release-shield]][github-release-link]
[![][github-releasedate-shield]][github-releasedate-link]
[![][github-action-test-shield]][github-action-test-link]
[![][github-action-release-shield]][github-action-release-link]<br/>
[![][github-contributors-shield]][github-contributors-link]
[![][github-forks-shield]][github-forks-link]
[![][github-stars-shield]][github-stars-link]
[![][github-issues-shield]][github-issues-link]
[![][github-license-shield]][github-license-link]

![][split]

</div>

---

> **第一条**
> 人人生而自由，在尊严与权利上一律平等。
> 他们赋有理性与良知，应当以兄弟般的精神彼此相待。
>
> **第十二条**
> 任何人的隐私、家庭、住宅和通信不得任意干涉，其名誉与荣誉不得加以攻击。
> 人人有权受到法律的保护，以免遭受这种干涉或攻击。
>
> **第十九条**
> 人人有思想与表达的自由；此项自由包括持有主张而不受干预，以及通过任何媒介、无论国界，自由寻求、接受和传播信息与思想。
>
> _来源：[联合国《世界人权宣言》](https://www.un.org/sites/un2.un.org/files/2021/03/udhr.pdf)_

---

## 🌏 我们为何而来

每一天，数以亿计的人醒来，面对的是一个被过滤、被限速、被噤声的互联网。
搜索结果凭空消失，新闻被悄然改写，声音被抹去——不是被黑客，而是被那些本应连接我们的基础设施本身。

**我们认为，这是错的。**

知识应当自由流动。新闻不应需要护照才能旅行。一座城市的学生应该能读到和世界另一端的学生一样的维基百科。一个家庭应该能够视频通话，而不必担心谈话被监听。一个敢于说出真相的人，不应活在午夜敲门声的恐惧中。

这些不是激进的想法。它们是开放互联网的奠基承诺，是七十多年前世界���国共同签署的《世界人权宣言》中明文写就的权利。

**NPanel 的存在，就是为了兑现这些承诺。**

我们不是在为利润打造一款产品。我们是在为人民构建基础设施——开源、可审计、免费——让每一个有意愿运行服务器的人，都能为自己的社群打开一扇通往完整、未经审查的互联网的门。

这个仓库的每一颗星，都代表一个理解这一切的人。
每一个 Pull Request，都是一份连结彼此的声援。
每一次部署，都是对数字高墙无声的反抗。

> _"网络将审查视为损坏，并绕道而行。"_
> — John Gilmore，1993

我们，就是那条绕行的路。

---

## 📦 应用列表

| 📦 应用 | 🖼️ 预览 |
| :--- | :--- |
| [**NPanel 用户端**][NPanel-user-web-github]<br/>用户看到的门户——简洁、快速、适配每一种设备。多语言、深色模式、一键导入订阅。<br/>[![一键部署](https://img.shields.io/badge/Deploy%20with-Vercel-blue?style=for-the-badge)][NPanel-user-web-deploy] | [![预览][NPanel-user-web-cover]][NPanel-user-web-github] |
| [**NPanel 管理端**][NPanel-admin-web-github]<br/>运营者的指挥中心——完整的节点管理、数据分析、用户控制与账单系统，尽在一个仪表盘。<br/>[![一键部署](https://img.shields.io/badge/Deploy%20with-Vercel-blue?style=for-the-badge)][NPanel-admin-web-deploy] | [![预览][NPanel-admin-web-cover]][NPanel-admin-web-preview] |

---

## ⌨️ 本地开发

您可以使用 Github Codespaces 进行在线开发：

[![][codespaces-shield]][codespaces-link]

或者克隆项目进行本地开发：

```bash
git clone https://github.com/OmnTeam/ppanel-pro-frontend.git
cd ppanel-pro-frontend

# 安装依赖
bun install

# 启动用户端开发服务器
bun run dev --filter=user

# 启动管理端开发服务器
bun run dev --filter=admin
```

---

## 🤝 参与贡献

这个项目因贡献者而生，因贡献者而活。
如果你相信我们正在做的事，我们期待你的参与——无论是一份 Bug 反馈、一段翻译、一个功能想法，还是一行代码。

自由不是旁观者的权利。

[![][pr-welcome-shield]][pr-welcome-link]

[![][contributors-contrib]][contributors-url]

<div align="right">

[![][back-to-top]](#readme-top)

</div>

---

## 📝 许可证

版权所有 © 2024 [NPanel][profile-link]。<br />
本项目使用 [GNU 通用公共许可证](./LICENSE)——因为守护自由的软件，本身也必须是自由的。

<!-- LINK GROUP -->

[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square
[codespaces-link]: https://codespaces.new/OmnTeam/ppanel-pro-frontend
[codespaces-shield]: https://github.com/codespaces/badge.svg
[contributors-contrib]: https://contrib.rocks/image?repo=OmnTeam/ppanel-pro-frontend
[contributors-url]: https://github.com/OmnTeam/ppanel-pro-frontend/graphs/contributors
[github-action-release-link]: https://github.com/OmnTeam/ppanel-pro-frontend/actions/workflows/release.yml
[github-action-release-shield]: https://img.shields.io/github/actions/workflow/status/OmnTeam/ppanel-pro-frontend/release.yml?label=release&labelColor=black&logo=githubactions&logoColor=white&style=flat-square
[github-action-test-link]: https://github.com/OmnTeam/ppanel-pro-frontend/actions/workflows/test.yml
[github-action-test-shield]: https://img.shields.io/github/actions/workflow/status/OmnTeam/ppanel-pro-frontend/test.yml?label=test&labelColor=black&logo=githubactions&logoColor=white&style=flat-square
[github-contributors-link]: https://github.com/OmnTeam/ppanel-pro-frontend/graphs/contributors
[github-contributors-shield]: https://img.shields.io/github/contributors/OmnTeam/ppanel-pro-frontend?color=c4f042&labelColor=black&style=flat-square
[github-forks-link]: https://github.com/OmnTeam/ppanel-pro-frontend/network/members
[github-forks-shield]: https://img.shields.io/github/forks/OmnTeam/ppanel-pro-frontend?color=8ae8ff&labelColor=black&style=flat-square
[github-issues-link]: https://github.com/OmnTeam/ppanel-pro-frontend/issues
[github-issues-shield]: https://img.shields.io/github/issues/OmnTeam/ppanel-pro-frontend?color=ff80eb&labelColor=black&style=flat-square
[github-license-link]: https://github.com/OmnTeam/ppanel-pro-frontend/blob/main/LICENSE
[github-license-shield]: https://img.shields.io/github/license/OmnTeam/ppanel-pro-frontend?color=white&labelColor=black&style=flat-square
[github-release-link]: https://github.com/OmnTeam/ppanel-pro-frontend/releases
[github-release-shield]: https://img.shields.io/github/v/release/OmnTeam/ppanel-pro-frontend?style=flat-square&sort=semver&logo=github
[github-releasedate-link]: https://github.com/OmnTeam/ppanel-pro-frontend/releases
[github-releasedate-shield]: https://img.shields.io/github/release-date/OmnTeam/ppanel-pro-frontend?labelColor=black&style=flat-square
[github-stars-link]: https://github.com/OmnTeam/ppanel-pro-frontend/stargazers
[github-stars-shield]: https://img.shields.io/github/stars/OmnTeam/ppanel-pro-frontend?color=ffcb47&labelColor=black&style=flat-square
[gitpod-link]: https://gitpod.io/#https://github.com/OmnTeam/ppanel-pro-frontend
[issues-link]: https://github.com/OmnTeam/ppanel-pro-frontend/issues/new/choose
[pr-welcome-link]: https://github.com/OmnTeam/ppanel-pro-frontend/pulls
[pr-welcome-shield]: https://img.shields.io/badge/🤯_pr_welcome-%E2%86%92-ffcb47?labelColor=black&style=for-the-badge
[profile-link]: https://github.com/OmnTeam
[split]: https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png
[NPanel-user-web-github]: https://github.com/OmnTeam/ppanel-pro-frontend/tree/main/apps/user
[NPanel-user-web-cover]: https://urlscan.io/liveshot/?width=1920&height=1080&url=https://user.npanel.dev
[NPanel-user-web-preview]: https://user.npanel.dev
[NPanel-user-web-deploy]: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FOmnTeam%2Fppanel-pro-frontend&root-directory=apps%2Fuser&project-name=npanel-user-web&repository-name=ppanel-pro-frontend&skippable-integrations=1
[NPanel-admin-web-github]: https://github.com/OmnTeam/ppanel-pro-frontend/tree/main/apps/admin
[NPanel-admin-web-cover]: https://urlscan.io/liveshot/?width=1920&height=1080&url=https://admin.npanel.dev
[NPanel-admin-web-preview]: https://admin.npanel.dev
[NPanel-admin-web-deploy]: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FOmnTeam%2Fppanel-pro-frontend&root-directory=apps%2Fadmin&project-name=npanel-admin-web&repository-name=ppanel-pro-frontend&skippable-integrations=1
