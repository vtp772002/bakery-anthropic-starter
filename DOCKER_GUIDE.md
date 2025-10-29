# 🐳 Hướng Dẫn Docker

Hướng dẫn chi tiết để chạy trang web Bakery với Docker.

## 📋 Yêu Cầu

- Docker Desktop (hoặc Docker Engine)
- Docker Compose (thường đi kèm với Docker Desktop)

## 🚀 Cách Sử Dụng

### 1. Build và Chạy với Docker Compose (Khuyến nghị)

```bash
# Cách 1: Dùng npm script (Tự động hiện thông tin network)
npm run docker:up

# Cách 2: Dùng docker-compose trực tiếp
docker-compose up -d --build

# Xem logs
docker-compose logs -f
# hoặc
npm run docker:logs

# Stop container
docker-compose down
# hoặc
npm run docker:down

# Xem thông tin truy cập network
npm run docker:info
```

Truy cập trang web tại: http://localhost:3000

### Truy Cập Từ Các Thiết Bị Khác Trong Mạng (LAN)

Để truy cập từ điện thoại, tablet, hoặc máy tính khác trong cùng mạng WiFi:

**Bước 1: Tìm địa chỉ IP của Mac**

```bash
# Cách 1: Dùng ifconfig
ifconfig | grep "inet " | grep -v 127.0.0.1

# Cách 2: Xem trong System Settings
# System Settings → Network → WiFi → Details → IP Address
```

Ví dụ IP của bạn là: `192.168.1.100`

**Bước 2: Truy cập từ thiết bị khác**

Mở browser trên điện thoại/tablet và truy cập:
```
http://192.168.1.100:3000
```

**Lưu ý:** 
- Đảm bảo tất cả thiết bị cùng mạng WiFi
- Nếu vẫn không truy cập được, tắt Mac Firewall tạm thời:
  `System Settings → Network → Firewall → Turn Off`

### 2. Build và Chạy với Docker Command

```bash
# Build Docker image
docker build -t bakery-web .

# Chạy container
docker run -d \
  --name bakery-web \
  -p 3000:3000 \
  bakery-web

# Xem logs
docker logs -f bakery-web

# Stop và remove container
docker stop bakery-web
docker rm bakery-web
```

## 🔧 Environment Variables

Nếu bạn cần thêm environment variables (Stripe keys, database URLs, etc.), tạo file `.env` và thêm vào `docker-compose.yml`:

```yaml
environment:
  - NODE_ENV=production
  - STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
  - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
  # Thêm các biến khác tại đây
```

Hoặc dùng file `.env`:

```bash
docker-compose --env-file .env up -d
```

## 📦 Chi Tiết Dockerfile

Dockerfile sử dụng **multi-stage build** để tối ưu:

1. **Stage 1 (deps)**: Cài đặt dependencies
2. **Stage 2 (builder)**: Build Next.js application
3. **Stage 3 (runner)**: Image production nhỏ gọn, chỉ chứa file cần thiết

### Tối Ưu:
- ✅ Image size nhỏ (dùng Alpine Linux)
- ✅ Security (chạy với non-root user)
- ✅ Fast build (cache layers hiệu quả)
- ✅ Production-ready (standalone output)

## 🛠️ Troubleshooting

### Container không start được?

```bash
# Check logs
docker-compose logs

# Kiểm tra container status
docker ps -a
```

### Port 3000 đã được sử dụng?

Sửa port trong `docker-compose.yml`:

```yaml
ports:
  - "8080:3000"  # Thay 3000 bằng port khác
```

### Rebuild sau khi thay đổi code?

```bash
docker-compose up -d --build
```

### Dọn dẹp Docker resources?

```bash
# Xóa tất cả unused containers, networks, images
docker system prune -a

# Chỉ xóa container và network của project này
docker-compose down --volumes --remove-orphans
```

## 🌍 ĐƯA TRANG WEB CHO KHÁCH HÀNG TRUY CẬP

### Scenario 1: Testing/Demo (Mạng Nội Bộ - LAN) 🏠

**Dùng khi:** Show demo cho khách hàng ở cùng văn phòng/nhà

**Cách làm:**
1. Start Docker container: `npm run docker:up`
2. Script sẽ tự động hiện IP, ví dụ: `http://192.168.100.129:3000`
3. Đưa địa chỉ này cho khách hàng (họ phải cùng WiFi)

**Ưu điểm:** 
- ✅ Nhanh, không cần setup gì
- ✅ Miễn phí
- ✅ Phù hợp testing/demo

**Nhược điểm:**
- ❌ Chỉ dùng trong LAN
- ❌ IP thay đổi khi đổi mạng
- ❌ Không truy cập từ internet

---

### Scenario 2: Production (Có Domain Name) 🌐

**Dùng khi:** Khách hàng truy cập từ bất kỳ đâu trên internet

**Option A: Deploy lên VPS (DigitalOcean, Linode, AWS EC2)**

```bash
# 1. Copy code lên server
scp -r . user@your-server-ip:/var/www/bakery

# 2. SSH vào server
ssh user@your-server-ip

# 3. Start container
cd /var/www/bakery
docker-compose up -d

# 4. Setup Nginx reverse proxy với domain
# Khách truy cập: https://yourdomain.com
```

**Option B: Deploy lên Cloud Platform (Dễ hơn)**

1. **Vercel/Netlify**: Deploy Next.js trực tiếp (không cần Docker)
   ```bash
   vercel deploy
   # Tự động có URL: https://your-app.vercel.app
   ```

2. **Railway/Render**: Deploy Docker container
   - Push code lên GitHub
   - Connect Railway → Auto deploy
   - Được free domain: `https://your-app.railway.app`

3. **AWS/Google Cloud/Azure**: Full control nhưng phức tạp hơn

**So sánh các options:**

| Platform | Độ Khó | Chi Phí | Domain | SSL |
|----------|--------|---------|--------|-----|
| Vercel | ⭐ Dễ | Free tier | ✅ Auto | ✅ Auto |
| Railway | ⭐⭐ Trung bình | $5-10/tháng | ✅ Auto | ✅ Auto |
| VPS + Nginx | ⭐⭐⭐ Khó | $5-20/tháng | Tự mua | Tự setup |
| AWS/GCP | ⭐⭐⭐⭐ Rất khó | Varies | Tự mua | Tự setup |

**Khuyến nghị cho bạn:**
- **Demo/Testing local**: Dùng Docker + LAN (IP address)
- **Production đơn giản**: Vercel (không cần Docker, free tier)
- **Production có control**: Railway/Render (deploy Docker)
- **Enterprise**: VPS + Nginx + Domain

---

## 🎯 Production Deployment (Chi Tiết)

### Deploy lên VPS/Cloud:

1. Copy source code lên server
2. Chạy:
   ```bash
   docker-compose -f docker-compose.yml up -d
   ```

### Deploy lên Docker Hub:

```bash
# Login
docker login

# Tag image
docker tag bakery-web username/bakery-web:latest

# Push
docker push username/bakery-web:latest
```

### Deploy với Nginx Reverse Proxy:

Tạo file `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  bakery-web:
    build: .
    expose:
      - "3000"
    environment:
      - NODE_ENV=production
    restart: always

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - bakery-web
    restart: always
```

## 📊 Monitoring

Xem resource usage:

```bash
docker stats bakery-web
```

## 🔍 Debug Mode

Chạy container với interactive mode:

```bash
docker run -it --rm \
  -p 3000:3000 \
  bakery-web \
  sh
```

## 📝 Notes

- Dockerfile được tối ưu cho **production** deployment
- Để development, khuyến nghị dùng `npm run dev` trực tiếp
- Tất cả dependencies đã được cài trong image
- Image size: ~150-200MB (tùy dependencies)

## 💡 Tips

1. Dùng Docker multi-stage build để giảm image size
2. Luôn dùng `.dockerignore` để exclude unnecessary files
3. Chạy container với non-root user (security best practice)
4. Sử dụng `docker-compose` để dễ quản lý
5. Enable health checks cho production deployment

---

Nếu có vấn đề gì, check logs với `docker-compose logs -f` hoặc `docker logs bakery-web`.

