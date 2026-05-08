---
layout: home

tk:
  teekHome: false

hero:
  name: NPanel
  text: Pure Professional Perfect
  tagline: 以优雅的开源控制平面驾驭任意代理集群
  actions:
    - theme: brand
      text: 安装 NPanel
      link: /zh/guide/installation/
    - theme: alt
      text: 项目概览
      link: /zh/guide/intro
  image:
    src: /logo.svg
    alt: NPanel

features:
  - icon: 🎯
    title: 完整的管理功能
    details: 在一个控制台内完成服务器接入、节点编排、订阅与产品发布。
  - icon: 💼
    title: 商务运营工具
    details: 优惠券、营销、订单与公告全流程自动化，随时可扩展。
  - icon: 👥
    title: 用户支持体系
    details: 用户目录、工单、文档三位一体，快速响应客户诉求。
  - icon: 📊
    title: 数据分析
    details: 12 种日志维度即刻洞察流量、余额、佣金等核心指标。
  - icon: 🔧
    title: 灵活配置
    details: 支付、认证、广告及系统开关均可配置，无需重新构建。
  - icon: 🚀
    title: 现代技术栈
    details: React 19 + TypeScript + TailwindCSS + shadcn/ui 带来顺滑体验。
  - icon: 🛡️
    title: 稳健后端
    details: go-zero + Gin + Gorm + Asynq 打造的 Go 1.21+ 服务，默认私密。
  - icon: 🐳
    title: 一体化部署
    details: 官方 `NPanel/NPanel` 镜像内置 gateway 与 server，支持 amd64/arm64。
---

## 全栈一览

NPanel 由三个协同仓库组成：

- **[前端](https://github.com/next-panel/frontend)**：React 19 UI + VitePress 文档，同时覆盖管理端与用户端。
- **[NPanel Server](https://github.com/next-panel/server)**：Go 1.21+ API，兼顾隐私、可观测性与多协议调度。
- **[NPanel](https://github.com/next-panel/NPanel)**：打包 gateway 与后端二进制的 Docker 镜像，一条命令即可启动。

### 前端体验

- 响应式仪表盘、细粒度权限与实时指标支撑全角色协作。
- shadcn/ui + TailwindCSS 组件体系让管理端与用户端保持统一视觉。
- 产品与文档同源，交付团队始终参考最新部署指引。

### 后端基石

- 统一调度 Shadowsocks、V2Ray、Trojan、Trojan-Go 等协议，接口由 go-zero 生成。
- 节点全生命周期：心跳、注册、版本检测、滚动升级一步到位。
- 订阅、计费、支付、订单与工单等业务域与前端配置保持一一映射。
- 默认不开启用户日志，所有敏感配置集中在 `etc/NPanel.yaml` 中可审计。
- 多样交付形态：Go 二进制、Makefile 目标以及 `NPanel/NPanel-server:latest` 等 CI 镜像。

### Gateway 与部署

`NPanel/NPanel` 镜像同时打包 gateway 与后端（amd64/arm64），将仓库中的 `modules/<platform>/etc` 挂载至 `/app/etc`，界面即可直连内置服务。

::: tip Docker 快速启动
```bash
docker pull NPanel/NPanel:latest
docker run -d --name NPanel \
  -p 8080:8080 \
  -v $(pwd)/NPanel-config:/app/etc \
  NPanel/NPanel:latest
```
:::

### 仓库推荐的配置步骤

1. 复制 `modules/<架构>/etc` 至持久目录（如 `NPanel-config`），并更新 `NPanel.yaml` 与密钥。
2. 先用 `docker run` 快速验证，再依据仓库提供的 Compose 模板获得自动重启与健康检查。
3. 升级流程：拉取新镜像、重启容器、由 gateway 负责节点热更新。
4. 排障时使用 `docker exec -it NPanel /bin/sh` 与 `docker logs -f NPanel`，所有文件均位于 `/app`。
