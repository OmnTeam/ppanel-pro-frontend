# 后端分离部署

本指南将帮助您独立部署 NPanel 后端服务，适用于前后端分离部署场景。

## 概述

后端分离部署允许您将 NPanel 后端服务部署在独立的服务器上，提供 API 服务给前端应用。这种部署方式具有以下优势：

- 🚀 独立扩展后端服务性能
- 🔒 更好的安全隔离
- 🌐 支持多前端实例连接同一后端
- 🛠️ 便于后端服务的独立维护和升级

## 系统要求

### 最低配置
- CPU: 1 核心
- 内存: 1 GB
- 存储: 10 GB
- 操作系统: Linux (推荐 Ubuntu 20.04+, Debian 11+, CentOS 8+)

### 推荐配置
- CPU: 2 核心以上
- 内存: 2 GB 以上
- 存储: 20 GB 以上

## 部署方式

### 方式一：Docker 部署（推荐）

#### 1. 安装 Docker

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com | sh

# 启动 Docker 服务
sudo systemctl start docker
sudo systemctl enable docker
```

#### 2. 创建配置文件

创建后端配置文件 `config.yaml`：

```yaml
# 数据库配置
database:
  type: mysql
  host: localhost
  port: 3306
  username: NPanel
  password: your_password
  database: NPanel

# Redis 配置
redis:
  host: localhost
  port: 6379
  password: ""
  db: 0

# 服务配置
server:
  host: 0.0.0.0
  port: 8080

# CORS 配置（重要：允许前端域名访问）
cors:
  allow_origins:
    - "https://your-frontend-domain.com"
    - "http://localhost:3000"  # 开发环境
  allow_methods:
    - GET
    - POST
    - PUT
    - DELETE
    - OPTIONS
  allow_headers:
    - "*"

# JWT 配置
jwt:
  secret: "your-secret-key"
  expire: 7200  # 2小时

# API 配置
api:
  prefix: "/api"
  version: "v1"
```

#### 3. 准备 MySQL 数据库

```bash
# 使用 Docker 运行 MySQL
docker run -d \
  --name NPanel-mysql \
  -e MYSQL_ROOT_PASSWORD=root_password \
  -e MYSQL_DATABASE=NPanel \
  -e MYSQL_USER=NPanel \
  -e MYSQL_PASSWORD=your_password \
  -p 3306:3306 \
  -v NPanel-mysql-data:/var/lib/mysql \
  mysql:8.0

# 等待 MySQL 启动
sleep 10
```

#### 4. 准备 Redis

```bash
# 使用 Docker 运行 Redis
docker run -d \
  --name NPanel-redis \
  -p 6379:6379 \
  -v NPanel-redis-data:/data \
  redis:7-alpine
```

#### 5. 运行后端服务

```bash
# 拉取后端镜像
docker pull NPanel/NPanel:latest

# 运行后端容器
docker run -d \
  --name NPanel-backend \
  -p 8080:8080 \
  -v $(pwd)/config.yaml:/app/config.yaml \
  --link NPanel-mysql:mysql \
  --link NPanel-redis:redis \
  NPanel/NPanel:latest
```

#### 6. 初始化数据库

```bash
# 执行数据库迁移
docker exec NPanel-backend ./NPanel migrate
```

### 方式二：二进制部署

#### 1. 下载后端程序

```bash
# 下载最新版本
wget https://github.com/perfect-panel/NPanel/releases/latest/download/NPanel-linux-amd64.tar.gz

# 解压
tar -xzf NPanel-linux-amd64.tar.gz
cd NPanel

# 赋予执行权限
chmod +x NPanel
```

#### 2. 配置后端服务

创建配置文件 `config.yaml`（内容同上 Docker 部署方式）。

#### 3. 安装并配置 MySQL

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install mysql-server -y

# 创建数据库和用户
sudo mysql <<EOF
CREATE DATABASE NPanel;
CREATE USER 'NPanel'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON NPanel.* TO 'NPanel'@'localhost';
FLUSH PRIVILEGES;
EOF
```

#### 4. 安装并配置 Redis

```bash
# Ubuntu/Debian
sudo apt install redis-server -y
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

#### 5. 初始化数据库

```bash
# 执行数据库迁移
./NPanel migrate
```

#### 6. 创建 systemd 服务

创建服务文件 `/etc/systemd/system/NPanel.service`：

```ini
[Unit]
Description=NPanel Backend Service
After=network.target mysql.service redis.service

[Service]
Type=simple
User=NPanel
WorkingDirectory=/opt/NPanel
ExecStart=/opt/NPanel/NPanel server
Restart=on-failure
RestartSec=5s
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

启动服务：

```bash
# 创建专用用户
sudo useradd -r -s /bin/false NPanel

# 移动文件到安装目录
sudo mkdir -p /opt/NPanel
sudo mv NPanel config.yaml /opt/NPanel/
sudo chown -R NPanel:NPanel /opt/NPanel

# 启动服务
sudo systemctl daemon-reload
sudo systemctl start NPanel
sudo systemctl enable NPanel

# 查看服务状态
sudo systemctl status NPanel
```

## 配置反向代理

### Nginx 配置

```nginx
server {
    listen 80;
    server_name api.your-domain.com;

    # HTTPS 重定向（推荐配置 SSL 证书）
    # return 301 https://$server_name$request_uri;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket 支持
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # 超时配置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}

# HTTPS 配置示例
# server {
#     listen 443 ssl http2;
#     server_name api.your-domain.com;
#
#     ssl_certificate /path/to/cert.pem;
#     ssl_certificate_key /path/to/key.pem;
#
#     location / {
#         proxy_pass http://127.0.0.1:8080;
#         # ... 其他配置同上
#     }
# }
```

重载 Nginx：

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Caddy 配置

```caddy
api.your-domain.com {
    reverse_proxy localhost:8080
}
```

## 验证部署

### 健康检查

```bash
# 检查后端服务是否运行
curl http://localhost:8080/api/health

# 预期输出
# {"status":"ok","version":"1.0.0"}
```

### 测试 API

```bash
# 测试公共 API
curl http://localhost:8080/api/v1/ping

# 预期输出
# {"message":"pong"}
```

## 环境变量配置

除了配置文件，您也可以使用环境变量：

```bash
# 数据库配置
export DB_HOST=localhost
export DB_PORT=3306
export DB_USER=NPanel
export DB_PASSWORD=your_password
export DB_NAME=NPanel

# Redis 配置
export REDIS_HOST=localhost
export REDIS_PORT=6379
export REDIS_PASSWORD=""

# JWT 密钥
export JWT_SECRET=your-secret-key

# 服务端口
export SERVER_PORT=8080
```

Docker 运行时使用环境变量：

```bash
docker run -d \
  --name NPanel-backend \
  -p 8080:8080 \
  -e DB_HOST=mysql \
  -e DB_USER=NPanel \
  -e DB_PASSWORD=your_password \
  -e REDIS_HOST=redis \
  --link NPanel-mysql:mysql \
  --link NPanel-redis:redis \
  NPanel/NPanel:latest
```

## 安全建议

1. **使用强密码**：为数据库和 JWT 密钥设置强密码
2. **配置防火墙**：仅开放必要端口（如 80, 443）
3. **启用 HTTPS**：使用 SSL/TLS 证书加密通信
4. **CORS 配置**：仅允许可信的前端域名访问
5. **定期备份**：定期备份数据库和配置文件
6. **监控日志**：定期检查应用日志和系统日志

## 故障排查

### 服务无法启动

```bash
# 查看服务日志
sudo journalctl -u NPanel -n 50 --no-pager

# Docker 查看日志
docker logs NPanel-backend
```

### 数据库连接失败

```bash
# 测试 MySQL 连接
mysql -h localhost -u NPanel -p -e "SELECT 1;"

# 检查 MySQL 服务状态
sudo systemctl status mysql
```

### Redis 连接失败

```bash
# 测试 Redis 连接
redis-cli ping

# 检查 Redis 服务状态
sudo systemctl status redis-server
```

### CORS 错误

确保在 `config.yaml` 中正确配置了前端域名：

```yaml
cors:
  allow_origins:
    - "https://your-frontend-domain.com"
```

## 性能优化

### 数据库优化

```sql
-- 创建必要的索引
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_order_status ON orders(status);
CREATE INDEX idx_created_at ON orders(created_at);
```

### Redis 缓存配置

```yaml
redis:
  # 启用缓存
  cache_enabled: true
  # 缓存过期时间（秒）
  cache_ttl: 3600
```

### 应用层优化

```yaml
# 启用 Gzip 压缩
server:
  gzip: true

# 调整并发连接数
server:
  max_connections: 1000
```

## 升级指南

### Docker 升级

```bash
# 拉取最新镜像
docker pull NPanel/NPanel:latest

# 停止旧容器
docker stop NPanel-backend

# 备份数据
docker exec NPanel-mysql mysqldump -u NPanel -p NPanel > backup.sql

# 删除旧容器
docker rm NPanel-backend

# 运行新容器
docker run -d \
  --name NPanel-backend \
  -p 8080:8080 \
  -v $(pwd)/config.yaml:/app/config.yaml \
  --link NPanel-mysql:mysql \
  --link NPanel-redis:redis \
  NPanel/NPanel:latest

# 执行数据库迁移
docker exec NPanel-backend ./NPanel migrate
```

### 二进制升级

```bash
# 停止服务
sudo systemctl stop NPanel

# 备份旧版本
sudo cp /opt/NPanel/NPanel /opt/NPanel/NPanel.backup

# 下载新版本
wget https://github.com/perfect-panel/NPanel/releases/latest/download/NPanel-linux-amd64.tar.gz
tar -xzf NPanel-linux-amd64.tar.gz

# 替换文件
sudo mv NPanel /opt/NPanel/
sudo chown NPanel:NPanel /opt/NPanel/NPanel

# 执行数据库迁移
cd /opt/NPanel
sudo -u NPanel ./NPanel migrate

# 启动服务
sudo systemctl start NPanel
```

## 下一步

- [前端分离部署](./frontend.md) - 部署前端应用
- [节点端安装](../node/installation.md) - 部署节点服务
- [API 文档](/zh/api/reference) - 查看完整 API 文档
