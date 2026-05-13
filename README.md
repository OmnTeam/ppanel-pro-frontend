<a name="readme-top"></a>

<div align="center">

<img width="160" src="https://raw.githubusercontent.com/perfect-panel/NPanel-assets/refs/heads/main/logo.svg">

<h1>NPanel Frontend</h1>

**The internet was built to connect humanity — not to divide it.**

[中文](./README.zh-CN.md)
·
[Changelog](./CHANGELOG.md)
·
[Report Bug][issues-link]
·
[Request Feature][issues-link]

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

> **Article 1.**
> All human beings are born free and equal in dignity and rights.
> They are endowed with reason and conscience and should act towards one another in a spirit of brotherhood.
>
> **Article 12.**
> No one shall be subjected to arbitrary interference with his privacy, family, home or correspondence, nor to attacks upon his honour and reputation.
> Everyone has the right to the protection of the law against such interference or attacks.
>
> **Article 19.**
> Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers.
>
> _Source: [United Nations – Universal Declaration of Human Rights (UN.org)](https://www.un.org/sites/un2.un.org/files/2021/03/udhr.pdf)_

---

## 🌏 Why We Exist

Every day, hundreds of millions of people wake up to an internet that has been filtered, throttled, or silenced.
Entire search results vanish. News is rewritten. Voices are erased — not by hackers, but by the very infrastructure meant to connect us.

**We believe that is wrong.**

Knowledge should flow freely. Journalism should travel without a passport. A student in one city should be able to read the same Wikipedia as a student on the other side of the world. A family should be able to video-call without their conversation being inspected. A dissident should be able to speak truth without fearing the knock at the door.

These are not radical ideas. They are the founding promises of the open internet, and of the Universal Declaration of Human Rights that the world's nations signed more than seventy years ago.

**NPanel exists to keep those promises.**

We are not building a product for profit. We are building infrastructure for people — open-source, auditable, and free — so that anyone with the will to run a server can offer their community a door back to the full, uncensored internet.

Every star on this repository is a person who understands what is at stake.
Every pull request is an act of solidarity.
Every deployment is a quiet act of defiance against digital walls.

> _"The Net interprets censorship as damage and routes around it."_
> — John Gilmore, 1993

We are the routing.

---

## 📦 Applications

| 📦 Application | 🖼️ Preview |
| :--- | :--- |
| [**NPanel User Web**][NPanel-user-web-github]<br/>The portal your users see — clean, fast, and built for every device. Multi-language, dark mode, one-click subscription import.<br/>[![One-Click Deploy](https://img.shields.io/badge/Deploy%20with-Vercel-blue?style=for-the-badge)][NPanel-user-web-deploy] | [![Preview][NPanel-user-web-cover]][NPanel-user-web-github] |
| [**NPanel Admin Web**][NPanel-admin-web-github]<br/>The command center for operators — full node management, analytics, user control, and billing, all in one dashboard.<br/>[![One-Click Deploy](https://img.shields.io/badge/Deploy%20with-Vercel-blue?style=for-the-badge)][NPanel-admin-web-deploy] | [![Preview][NPanel-admin-web-cover]][NPanel-admin-web-preview] |

---

## ⌨️ Local Development

You can use Github Codespaces for online development:

[![][codespaces-shield]][codespaces-link]

Or clone it for local development:

```bash
git clone https://github.com/OmnTeam/ppanel-pro-frontend.git
cd ppanel-pro-frontend

# Install dependencies
bun install

# Start the user portal dev server
bun run dev --filter=NPanel-user-web

# Start the admin portal dev server
bun run dev --filter=NPanel-admin-web
```

---

## 🤝 Contributing

This project lives and breathes through its contributors.
If you believe in what we are building, we would love your help — whether it is a bug report, a translation, a feature idea, or a line of code.

Freedom is not a spectator sport.

[![][pr-welcome-shield]][pr-welcome-link]

[![][contributors-contrib]][contributors-url]

<div align="right">

[![][back-to-top]](#readme-top)

</div>

---

## 📝 License

Copyright © 2024 [NPanel][profile-link].<br />
This project is licensed under the [GNU General Public License](./LICENSE) — because software that defends freedom must itself be free.

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
