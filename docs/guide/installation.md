# Installation

This guide will help you deploy NPanel on your server using Docker.

## System Requirements

### Minimum Requirements
- **Operating System**: Linux (Ubuntu 20.04+, Debian 10+, CentOS 8+)
- **CPU**: 1 core
- **Memory**: 512MB RAM
- **Storage**: 1GB available disk space
- **Docker**: 20.10+
- **Docker Compose**: 2.0+ (optional but recommended)

### Recommended Requirements
- **CPU**: 2+ cores
- **Memory**: 2GB+ RAM
- **Storage**: 5GB+ available disk space

## Prerequisites

### Install Docker

If you haven't installed Docker yet, please follow the official installation guide:

**Ubuntu/Debian:**
```bash
# Update package index
sudo apt-get update

# Install required packages
sudo apt-get install -y ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Set up the repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

**CentOS/RHEL:**
```bash
# Install yum-utils
sudo yum install -y yum-utils

# Add Docker repository
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# Install Docker Engine
sudo yum install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker
```

### Verify Installation

```bash
# Check Docker version
docker --version

# Check Docker Compose version
docker compose version

# Test Docker installation
sudo docker run hello-world
```

## Quick Start

### Method 1: Using Docker Run

#### Step 1: Pull the Image

```bash
# Pull latest version
docker pull NPanel/NPanel:latest

# Or pull a specific version
docker pull NPanel/NPanel:v0.1.2
```

#### Step 2: Prepare Configuration

Create a configuration directory and prepare the configuration file:

```bash
# Create configuration directory
mkdir -p NPanel-config

# Create configuration file
cat > NPanel-config/NPanel.yaml <<EOF
# NPanel Configuration
server:
  host: 0.0.0.0
  port: 8080

database:
  type: sqlite
  path: /app/data/NPanel.db

# Add more configuration as needed
EOF
```

::: tip
For detailed configuration options, please refer to the [Configuration Guide](/guide/configuration).
:::

#### Step 3: Run Container

```bash
docker run -d \
  --name NPanel \
  -p 8080:8080 \
  -v $(pwd)/NPanel-config:/app/etc:ro \
  -v NPanel-data:/app/data \
  --restart unless-stopped \
  NPanel/NPanel:latest
```

**Parameter Explanation:**
- `-d`: Run container in detached mode (background)
- `--name NPanel`: Set container name
- `-p 8080:8080`: Map container port 8080 to host port 8080
- `-v $(pwd)/NPanel-config:/app/etc:ro`: Mount configuration directory (read-only)
- `-v NPanel-data:/app/data`: Create a volume for persistent data storage
- `--restart unless-stopped`: Auto-restart container unless manually stopped

#### Step 4: Verify Running Status

```bash
# Check container status
docker ps | grep NPanel

# View logs
docker logs -f NPanel

# Check if service is accessible
curl http://localhost:8080
```

### Method 2: Using Docker Compose (Recommended)

#### Step 1: Create docker-compose.yml

```yaml
version: '3.8'

services:
  NPanel:
    image: NPanel/NPanel:latest
    container_name: NPanel
    ports:
      - "8080:8080"
    volumes:
      - ./NPanel-config:/app/etc:ro
      - NPanel-data:/app/data
    restart: unless-stopped
    environment:
      - TZ=UTC
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

volumes:
  NPanel-data:
    driver: local
```

#### Step 2: Prepare Configuration

```bash
# Create configuration directory
mkdir -p NPanel-config

# Copy or create your configuration file
# See Configuration Guide for details
```

#### Step 3: Start Services

```bash
# Start in detached mode
docker compose up -d

# View logs
docker compose logs -f

# Check status
docker compose ps
```

## Post-Installation

### Access the Application

After successful installation, you can access:

- **User Panel**: `http://your-server-ip:8080`
- **Admin Panel**: `http://your-server-ip:8080/admin/`

::: warning Administrator Account
**Default Administrator Account** (if not configured in config file):
- **Email**: `admin@NPanel.dev`
- **Password**: `password`

**One-Click Installation Script** will automatically generate random administrator credentials displayed at the end:
- **Email**: `admin-[8 random characters]@NPanel.dev`
- **Password**: `[Randomly generated 16-character password]`

**Security Recommendations**:
- When using the one-click script, save the generated credentials securely
- Change your password immediately after first login
- If using default credentials, **must** change both email and password after first login
:::

### Configure Reverse Proxy (Optional)

For production deployment, it's recommended to use Nginx or Caddy as a reverse proxy to enable HTTPS.

**Nginx Example:**

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Caddy Example:**

```
your-domain.com {
    reverse_proxy localhost:8080
}
```

## Container Management

### View Logs

```bash
# Docker Run
docker logs -f NPanel

# Docker Compose
docker compose logs -f
```

### Stop Container

```bash
# Docker Run
docker stop NPanel

# Docker Compose
docker compose stop
```

### Restart Container

```bash
# Docker Run
docker restart NPanel

# Docker Compose
docker compose restart
```

### Remove Container

```bash
# Docker Run
docker stop NPanel
docker rm NPanel

# Docker Compose
docker compose down
```

::: warning Data Persistence
Removing containers will not delete volumes. To remove volumes as well, use:
```bash
docker compose down -v
```
:::

## Upgrading

### Backup Configuration

Before upgrading, backup your configuration and data:

```bash
# Backup configuration
tar czf NPanel-config-backup-$(date +%Y%m%d).tar.gz NPanel-config/

# Backup data volume
docker run --rm \
  -v NPanel-data:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/NPanel-data-backup-$(date +%Y%m%d).tar.gz /data
```

### Upgrade Steps

#### Using Docker Run

```bash
# Pull latest image
docker pull NPanel/NPanel:latest

# Stop and remove old container
docker stop NPanel
docker rm NPanel

# Start new container with same configuration
docker run -d \
  --name NPanel \
  -p 8080:8080 \
  -v $(pwd)/NPanel-config:/app/etc:ro \
  -v NPanel-data:/app/data \
  --restart unless-stopped \
  NPanel/NPanel:latest
```

#### Using Docker Compose

```bash
# Pull latest image
docker compose pull

# Recreate containers with new image
docker compose up -d
```

### Verify Upgrade

```bash
# Check container is running
docker ps | grep NPanel

# Check logs for any errors
docker logs NPanel

# Verify application is accessible
curl http://localhost:8080
```

## Troubleshooting

### Container Exits Immediately

**Check architecture compatibility:**
```bash
# Check host architecture
uname -m

# Check image architecture
docker image inspect NPanel/NPanel:latest --format '{{.Architecture}}'
```

**Check logs:**
```bash
docker logs NPanel
```

### Cannot Access Service

1. **Check if container is running:**
   ```bash
   docker ps | grep NPanel
   ```

2. **Check port mapping:**
   ```bash
   docker port NPanel
   ```

3. **Check firewall rules:**
   ```bash
   # Ubuntu/Debian
   sudo ufw status
   sudo ufw allow 8080

   # CentOS/RHEL
   sudo firewall-cmd --list-ports
   sudo firewall-cmd --add-port=8080/tcp --permanent
   sudo firewall-cmd --reload
   ```

### Configuration Not Taking Effect

1. **Verify mount path:**
   ```bash
   docker exec NPanel ls -la /app/etc
   ```

2. **Check configuration syntax:**
   ```bash
   docker exec NPanel cat /app/etc/NPanel.yaml
   ```

3. **Restart container:**
   ```bash
   docker restart NPanel
   ```

### Performance Issues

1. **Check resource usage:**
   ```bash
   docker stats NPanel
   ```

2. **Increase container resources** (if using Docker Desktop):
   - Open Docker Desktop Settings
   - Go to Resources
   - Increase CPU and Memory allocation

3. **Check disk space:**
   ```bash
   df -h
   docker system df
   ```

## Advanced Configuration

### Using Environment Variables

You can override configuration via environment variables:

```bash
docker run -d \
  --name NPanel \
  -p 8080:8080 \
  -e SERVER_PORT=8080 \
  -e DATABASE_TYPE=sqlite \
  -v $(pwd)/NPanel-config:/app/etc:ro \
  -v NPanel-data:/app/data \
  --restart unless-stopped \
  NPanel/NPanel:latest
```

### Running Multiple Instances

To run multiple instances, use different ports and container names:

```bash
# Instance 1
docker run -d \
  --name NPanel-1 \
  -p 8081:8080 \
  -v $(pwd)/NPanel-config-1:/app/etc:ro \
  -v NPanel-data-1:/app/data \
  NPanel/NPanel:latest

# Instance 2
docker run -d \
  --name NPanel-2 \
  -p 8082:8080 \
  -v $(pwd)/NPanel-config-2:/app/etc:ro \
  -v NPanel-data-2:/app/data \
  NPanel/NPanel:latest
```

### Custom Network

Create a custom Docker network for better isolation:

```bash
# Create network
docker network create NPanel-net

# Run container on custom network
docker run -d \
  --name NPanel \
  --network NPanel-net \
  -p 8080:8080 \
  -v $(pwd)/NPanel-config:/app/etc:ro \
  -v NPanel-data:/app/data \
  NPanel/NPanel:latest
```

## Next Steps

- [Configuration Guide](/guide/configuration) - Learn about detailed configuration options
- [Admin Dashboard](/admin/dashboard) - Start managing your panel
- [API Reference](/api/reference) - Integrate with NPanel API

## Need Help?

If you encounter any issues:

1. Check the [Troubleshooting](#troubleshooting) section above
2. Search [GitHub Issues](https://github.com/perfect-panel/NPanel/issues)
3. Join our community discussions
4. Create a new issue with detailed logs and system information
