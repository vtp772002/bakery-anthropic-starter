# Stripe Payment Integration Setup Guide

## 🚀 Tích hợp Stripe vào Bakery App

Hướng dẫn này sẽ giúp bạn thiết lập hệ thống thanh toán SaaS hoàn chỉnh với Stripe cho ứng dụng bakery.

## 📋 Yêu cầu

- Node.js 18+
- Tài khoản Stripe (https://stripe.com)
- Next.js 13+ (App Router)

## 🔧 Thiết lập Stripe Dashboard

### 1. Tạo sản phẩm và giá trong Stripe Dashboard

1. Đăng nhập vào [Stripe Dashboard](https://dashboard.stripe.com)
2. Đi tới **Products** → **Add Product**
3. Tạo các sản phẩm sau:

**Pro Monthly:**
- Name: `Pro Monthly`
- Recurring: `Monthly`
- Price: `$29` (hoặc tùy theo nhu cầu)
- Copy **Price ID** (dạng `price_xxx`)

**Pro Yearly:**
- Name: `Pro Yearly`
- Recurring: `Yearly`
- Price: `$290` (hoặc tùy theo nhu cầu)
- Copy **Price ID** (dạng `price_xxx`)

### 2. Cấu hình Webhook

1. Đi tới **Developers** → **Webhooks**
2. **Add endpoint**
3. Endpoint URL: `https://yourdomain.com/api/stripe/webhook`
4. Chọn events:
   - `checkout.session.completed`
   - `invoice.payment_failed`
   - `customer.subscription.deleted`
   - `customer.subscription.updated`
5. Copy **Webhook Secret** (dạng `whsec_xxx`)

### 3. Domain Verification (cho Apple Pay/Google Pay)

1. Đi tới **Settings** → **Payment methods**
2. **Apple Pay** → **Add domain**
3. Thêm domain của bạn (production)

## ⚙️ Cấu hình Environment Variables

Tạo file `.env.local` trong thư mục root:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Base URL for redirects
NEXT_PUBLIC_BASE_URL=http://localhost:1234/v1/models
```

### Lấy API Keys:
- **Publishable key**: Stripe Dashboard → **Developers** → **API keys** → **Publishable key**
- **Secret key**: Stripe Dashboard → **Developers** → **API keys** → **Secret key**

## 📝 Cập nhật Price IDs

Mở file `app/upgrade/page.tsx` và cập nhật các Price IDs thực tế:

```typescript
const PRICING_PLANS = {
  monthly: {
    priceId: "price_your_actual_monthly_price_id", // Thay bằng Price ID thực
    // ...
  },
  yearly: {
    priceId: "price_your_actual_yearly_price_id", // Thay bằng Price ID thực
    // ...
  },
};
```

## 🚀 Chạy ứng dụng

```bash
npm run dev
```

Truy cập: http://localhost:3000/upgrade

## 🔗 Các trang đã tích hợp

| Trang | Mô tả |
|-------|-------|
| `/upgrade` | Trang pricing với nút thanh toán |
| `/upgrade/success` | Trang thành công sau thanh toán |
| `/upgrade/cancel` | Trang hủy thanh toán |
| `/account` | Quản lý subscription và billing |

## 🛠️ API Endpoints

| Endpoint | Mô tả |
|----------|-------|
| `POST /api/checkout` | Tạo Stripe Checkout Session |
| `POST /api/stripe/webhook` | Xử lý Stripe webhooks |
| `POST /api/portal` | Tạo Billing Portal session |

## 📱 Components

| Component | Mô tả |
|-----------|-------|
| `UpgradeButton` | Nút upgrade với Stripe Checkout |
| `BillingPortalButton` | Nút truy cập Billing Portal |

## 🔒 Bảo mật

### Webhook Verification
- Webhook được verify bằng Stripe signature
- Raw body được sử dụng cho verification

### PCI Compliance
- Không lưu trữ thông tin thẻ
- Sử dụng Stripe Checkout (SAQ A compliance)

## 🌍 Thanh toán quốc tế

### Stripe hỗ trợ:
- ✅ Thẻ tín dụng/ghi nợ quốc tế
- ✅ Apple Pay / Google Pay
- ✅ 3D Secure (3DS) / SCA tự động
- ✅ Thuế tự động (Stripe Tax)
- ✅ Multi-currency

### Thanh toán Việt Nam:
Để hỗ trợ ví điện tử VN (MoMo, ZaloPay, VNPAY), bạn có thể:
1. Tích hợp PayOS/Alepay/OnePay
2. Sử dụng Paddle/Lemon Squeezy (merchant of record)
3. Kết hợp Stripe + cổng thanh toán nội địa

## 🧪 Test Mode

Trong test mode, sử dụng test cards:
- **Thành công**: `4242 4242 4242 4242`
- **Requires authentication**: `4000 0027 6000 3184`
- **Declined**: `4000 0000 0000 0002`

## 📦 Production Deployment

1. Cập nhật environment variables với live keys
2. Verify domain trong Stripe Dashboard
3. Test webhook endpoint
4. Cấu hình Stripe Tax (nếu cần)

## 🔄 User Flow

1. User click "Upgrade to Pro"
2. Redirect to Stripe Checkout
3. User nhập thông tin thanh toán
4. Stripe xử lý payment (3DS, Apple Pay, etc.)
5. Webhook cập nhật user.pro = true
6. Redirect to success page
7. User có thể manage subscription qua Billing Portal

## 📞 Support

- Stripe docs: https://stripe.com/docs
- Webhook testing: https://dashboard.stripe.com/webhooks
- Stripe CLI: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

## ⚡ Next Steps

1. **Database Integration**: Kết nối với database để lưu user subscription status
2. **Authentication**: Tích hợp với hệ thống auth (NextAuth.js, Clerk, etc.)
3. **Email Notifications**: Gửi email confirmation sau payment
4. **Analytics**: Track conversion rate, churn rate
5. **Localization**: Hỗ trợ multiple languages
6. **Mobile Optimization**: Tối ưu mobile experience

## 🐛 Troubleshooting

### Webhook không hoạt động:
- Kiểm tra webhook URL trong Stripe Dashboard
- Verify webhook secret trong .env
- Check server logs cho Stripe events

### Payment thất bại:
- Kiểm tra Price ID đúng chưa
- Verify API keys
- Check network và CORS settings

### Apple Pay không hiện:
- Verify domain trong Stripe Dashboard
- Chỉ hoạt động trên HTTPS (production)
- Cần Safari browser trên iOS/macOS
