# Bakery — Anthropic-inspired Next.js + Tailwind Starter

A clean, high-contrast bakery website starter echoing Anthropic.com's editorial feel. Includes tokens, components, and a home page composed from: AnnouncementBar, Header, Hero, TileGrid, QuoteBlock, CTABand, Footer.

## 🚀 Quick Start (After Clone)

**Important:** Sau khi clone project từ GitHub, bạn cần setup một số thứ trước khi chạy!

👉 **Xem hướng dẫn chi tiết:** [SETUP_AFTER_CLONE.md](./SETUP_AFTER_CLONE.md)

### TL;DR
```bash
# 1) Install dependencies (BẮT BUỘC)
npm install

# 2) Run dev server
npm run dev

# 3) Open
http://localhost:3000
```

**Lưu ý:** File `.env.local` không có trong Git (vì lý do bảo mật). Nếu cần dùng Stripe payment hoặc AI chat, xem [SETUP_AFTER_CLONE.md](./SETUP_AFTER_CLONE.md)

## Stack
- Next.js (App Router)
- Tailwind CSS (design tokens via CSS variables)
- Framer Motion (subtle motion)
- lucide-react (icons)
- TypeScript

## Customize
- Colors: `styles/globals.css` (CSS variables)
- Nav links: `lib/data.ts`
- Home tiles: `lib/data.ts`
- Logo: `public/logo.svg`
- Components: `components/*`

## Notes
- This starter focuses on the **look and component structure**. Hook it up to a CMS/commerce (Sanity, Shopify, etc.) and add pages as needed.
- Accessible by default: visible focus, high contrast, semantic structure.

## 📚 Documentation

- 📘 [SETUP_AFTER_CLONE.md](./SETUP_AFTER_CLONE.md) - **Hướng dẫn setup sau khi clone** (BẮT BUỘC đọc!)
- 💳 [QUICK_START.md](./QUICK_START.md) - Stripe payment integration quick guide
- 🔒 [STRIPE_SETUP.md](./STRIPE_SETUP.md) - Chi tiết về Stripe setup
- 🐳 [DOCKER_GUIDE.md](./DOCKER_GUIDE.md) - Hướng dẫn chạy với Docker

## 🎯 Features

- ✅ Modern bakery website design inspired by Anthropic.com
- ✅ Shopping cart with localStorage
- ✅ Stripe checkout integration
- ✅ Multi-language support (English & Vietnamese)
- ✅ AI chat widget with Anthropic Claude
- ✅ Subscription management
- ✅ Responsive design
- ✅ Dark/Light mode ready
- ✅ TypeScript & Next.js 15 App Router

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide React, React Icons
- **Payments:** Stripe
- **AI:** Anthropic Claude
- **i18n:** next-intl
- **Language:** TypeScript

## 🚢 Deployment

This project can be deployed to:
- Vercel (recommended for Next.js)
- Docker (see DOCKER_GUIDE.md)
- Any Node.js hosting platform

## 🤝 Contributing

Feel free to submit issues and pull requests!

## 📄 License

MIT
