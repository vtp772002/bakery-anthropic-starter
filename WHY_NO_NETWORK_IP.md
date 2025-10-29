# ❓ Tại Sao Docker Không Hiển Thị IP Thật Của Mac?

## 🤔 Câu Hỏi

Khi chạy `npm run dev`:
```
✓ Starting...
✓ Ready in 68ms
  ▲ Next.js 15.4.6
  - Local:    http://localhost:3000
  - Network:  http://192.168.100.129:3000  ← IP thật của Mac
```

Khi chạy Docker:
```
✓ Starting...
✓ Ready in 70ms
  ▲ Next.js 15.4.6
  - Local:    http://localhost:3000
  - Network:  http://0.0.0.0:3000  ← Không phải IP thật?
```

**Tại sao vậy?**

---

## 💡 Giải Thích

### Docker Container = Một Môi Trường Isolated

```
┌─────────────────────────────────────┐
│  💻 Mac của bạn (Host)              │
│  IP: 192.168.100.129                │
│                                      │
│  ┌──────────────────────────────┐  │
│  │  🐳 Docker Container         │  │
│  │  (Môi trường riêng biệt)     │  │
│  │                               │  │
│  │  Next.js app chạy ở đây      │  │
│  │  Không biết IP của Mac       │  │
│  │  Chỉ biết: 0.0.0.0           │  │
│  └──────────────────────────────┘  │
│         ↕️ Port Mapping 3000        │
└─────────────────────────────────────┘
```

### `0.0.0.0` Nghĩa Là Gì?

- **`0.0.0.0`** = "Bind to ALL network interfaces"
- Nghĩa là: "Lắng nghe trên TẤT CẢ các địa chỉ IP"
- Từ góc độ **container**, đây là cách nói "sẵn sàng nhận request từ bất kỳ đâu"
- Nhưng container **KHÔNG BIẾT** IP thật của Mac host!

### Vậy Tại Sao `npm run dev` Lại Biết?

Khi chạy `npm run dev` **NGOÀI Docker**:
- ✅ Process chạy trực tiếp trên Mac
- ✅ Có thể đọc network interfaces của Mac
- ✅ Tự động detect IP thật: `192.168.100.129`

Khi chạy **TRONG Docker**:
- ❌ Process chạy trong container isolated
- ❌ Không có quyền truy cập network info của host
- ❌ Chỉ biết `0.0.0.0` (bind all interfaces CỦA CONTAINER)

---

## ✅ Giải Pháp

### Cách 1: Dùng Script Tự Động (Khuyến nghị)

```bash
npm run docker:up
```

Script sẽ tự động:
1. Start Docker container
2. Lấy IP thật của Mac
3. Hiển thị thông tin truy cập đầy đủ

### Cách 2: Manual Check

```bash
# Start Docker
docker-compose up -d

# Xem IP thật của Mac
ifconfig | grep "inet " | grep -v 127.0.0.1

# Kết hợp: http://<IP_của_Mac>:3000
# Ví dụ: http://192.168.100.129:3000
```

### Cách 3: Xem Thông Tin Bất Kỳ Lúc Nào

```bash
npm run docker:info
```

---

## 🎯 Tóm Tắt

| Câu Hỏi | Trả Lời |
|---------|---------|
| Docker có expose port ra ngoài không? | ✅ CÓ (`0.0.0.0:3000->3000/tcp`) |
| Khách hàng có thể truy cập không? | ✅ CÓ (qua IP của Mac) |
| Tại sao không hiện IP thật? | Container không biết IP của host |
| Làm sao biết IP để cho khách? | Dùng `npm run docker:info` |
| Production thì sao? | Dùng domain name, không dùng IP |

---

## 📚 Đọc Thêm

- [Docker Networking](https://docs.docker.com/network/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- Xem `DOCKER_GUIDE.md` để biết cách deploy production

