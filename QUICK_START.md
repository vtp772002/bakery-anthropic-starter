# 🚀 Quick Start - Stripe Payment Integration

## ⚡ Setup nhanh trong 5 phút

### 1. Tạo file `.env.local`
```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Base URL for redirects
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 2. Lấy Stripe Keys
1. Đăng ký tài khoản Stripe: https://dashboard.stripe.com/register
2. Lấy API keys: **Developers** → **API keys**
3. Copy **Publishable key** và **Secret key**

### 3. Tạo Products trong Stripe
1. **Products** → **Add Product**
2. Tạo 2 sản phẩm:
   - **Pro Monthly**: $29/month (recurring)
   - **Pro Yearly**: $290/year (recurring)
3. Copy các **Price IDs** (dạng `price_xxx`)

### 4. Cập nhật Price IDs
Mở `app/upgrade/page.tsx` và thay đổi:
```typescript
const PRICING_PLANS = {
  monthly: {
    priceId: "price_your_monthly_id_here", // 👈 Thay bằng Price ID thực
    // ...
  },
  yearly: {
    priceId: "price_your_yearly_id_here", // 👈 Thay bằng Price ID thực
    // ...
  },
};
```

### 5. Chạy ứng dụng
```bash
npm run dev
```

### 6. Test
- Truy cập: http://localhost:3000/upgrade
- Sử dụng test card: `4242 4242 4242 4242`

## 🔗 Các trang đã tích hợp

| URL | Mô tả |
|-----|-------|
| `/upgrade` | Pricing page với Stripe Checkout |
| `/upgrade/success` | Trang thành công |
| `/upgrade/cancel` | Trang hủy |
| `/account` | Quản lý subscription |

## 📚 Tài liệu chi tiết

Xem file `STRIPE_SETUP.md` để có hướng dẫn đầy đủ về:
- Cấu hình webhook
- Apple Pay/Google Pay
- Production deployment
- Troubleshooting

## 🛠️ Components có sẵn

- `<UpgradeButton>`: Nút upgrade với Stripe Checkout
- `<BillingPortalButton>`: Nút quản lý billing
- `<StripeSetupWarning>`: Thông báo setup (chỉ hiện trong dev)

## 🧪 Test Cards

| Card | Kết quả |
|------|---------|
| `4242 4242 4242 4242` | Thành công |
| `4000 0027 6000 3184` | Requires 3D Secure |
| `4000 0000 0000 0002` | Card declined |

## 📞 Support

- Email: your-email@domain.com
- Stripe docs: https://stripe.com/docs
- Issue tracker: GitHub Issues
