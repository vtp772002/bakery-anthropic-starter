# 🚀 Setup sau khi Clone Project

Sau khi clone project từ GitHub về, làm theo các bước sau:

## 📋 Các bước Setup

### 1. Cài đặt Dependencies

```bash
npm install
```

Lệnh này sẽ cài đặt tất cả packages cần thiết (Next.js, React, Stripe, Tailwind, v.v.)

### 2. Tạo file Environment Variables (Tùy chọn)

Tạo file `.env.local` ở root folder:

```bash
# Stripe Configuration (Optional - chỉ cần nếu dùng tính năng payment)
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Base URL for redirects
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Anthropic API Key (Optional - chỉ cần nếu dùng chat widget)
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

**Lưu ý:** 
- Nếu không dùng Stripe payment hoặc chat, **KHÔNG cần tạo file này**
- App vẫn chạy bình thường, chỉ thiếu tính năng payment/chat
- Xem `STRIPE_SETUP.md` và `QUICK_START.md` để biết cách lấy keys

### 3. Chạy Development Server

```bash
npm run dev
```

Truy cập: **http://localhost:3000**

### 4. Build cho Production (Tùy chọn)

```bash
# Build
npm run build

# Chạy production server
npm start
```

## 🐳 Hoặc dùng Docker

Nếu muốn chạy bằng Docker:

```bash
# Build và chạy
docker-compose up -d

# Xem logs
docker-compose logs -f

# Dừng
docker-compose down
```

Xem chi tiết trong `DOCKER_GUIDE.md`

## ✅ Checklist

- [ ] Đã chạy `npm install`
- [ ] Đã tạo `.env.local` (nếu cần Stripe/Chat)
- [ ] Đã chạy `npm run dev`
- [ ] Đã mở http://localhost:3000

## 🆘 Troubleshooting

### Lỗi: `next: command not found`
**Fix:** Chạy `npm install`

### Lỗi: `Port 3000 already in use`
**Fix:** 
```bash
# Kill process đang dùng port 3000
lsof -ti:3000 | xargs kill -9

# Hoặc dùng port khác
npm run dev -- -p 3001
```

### Lỗi: Stripe payment không hoạt động
**Fix:** Kiểm tra file `.env.local` đã có đúng API keys chưa

### Lỗi: Chat widget không hoạt động
**Fix:** Cần thêm `ANTHROPIC_API_KEY` vào `.env.local`

## 📚 Tài liệu tham khảo

- `README.md` - Tổng quan project
- `QUICK_START.md` - Hướng dẫn Stripe setup
- `STRIPE_SETUP.md` - Chi tiết về Stripe integration
- `DOCKER_GUIDE.md` - Hướng dẫn Docker

## 🎯 Các tính năng chính

- ✅ **Homepage**: Giao diện bakery đẹp mắt
- ✅ **Menu**: Danh sách sản phẩm với categories
- ✅ **Cart**: Giỏ hàng với localStorage
- ✅ **Checkout**: Tích hợp Stripe (cần setup)
- ✅ **Multi-language**: English & Vietnamese (i18n)
- ✅ **Chat Widget**: AI assistant (cần Anthropic API key)
- ✅ **Subscription**: Stripe subscription management
- ✅ **Responsive**: Mobile-friendly design

## 💡 Tips

1. **Không commit `.env.local`** - File này chứa API keys bí mật
2. **Port conflict?** - Dùng `npm run dev -- -p 3001`
3. **Fresh start?** - Xóa `.next` folder: `rm -rf .next`
4. **Update dependencies?** - `npm update`

---

**Happy coding! 🎉**

Nếu có vấn đề, check logs hoặc tạo issue trên GitHub.

