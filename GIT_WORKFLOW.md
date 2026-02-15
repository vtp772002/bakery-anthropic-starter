# 🔄 Git Workflow - Làm việc nhóm

Hướng dẫn sử dụng Git khi làm việc với team trên project này.

## 🚀 Workflow cơ bản hàng ngày

### 1. Trước khi bắt đầu code (Lấy code mới nhất)

```bash
# Luôn pull code mới nhất trước khi bắt đầu làm việc
git pull origin main
```

### 2. Khi đang code (Commit thường xuyên)

```bash
# Xem file nào thay đổi
git status

# Add file cần commit
git add .

# Hoặc add từng file cụ thể
git add src/components/NewComponent.tsx

# Commit với message rõ ràng
git commit -m "feat: add new component for product listing"

# Push lên GitHub
git push origin main
```

### 3. Khi xong việc (Push code lên)

```bash
# Lấy code mới nhất trước khi push (quan trọng!)
git pull origin main

# Push code của bạn lên
git push origin main
```

## 🔄 Các tình huống thường gặp

### ✅ Tình huống 1: Người khác đã push code lên

**Vấn đề:** Bạn đang code, người khác push lên GitHub trước.

**Giải pháp:**

```bash
# Bước 1: Commit code của bạn trước
git add .
git commit -m "your changes"

# Bước 2: Pull code mới về
git pull origin main

# Nếu không có conflict → Tự động merge
# Nếu có conflict → Xem phần "Giải quyết Conflict" bên dưới

# Bước 3: Push lên
git push origin main
```

### ⚠️ Tình huống 2: Có Conflict khi pull

**Dấu hiệu:**
```
Auto-merging src/components/Header.tsx
CONFLICT (content): Merge conflict in src/components/Header.tsx
```

**Giải quyết:**

1. Mở file bị conflict, tìm dòng như này:
```
<<<<<<< HEAD
// Code của bạn
=======
// Code của người khác
>>>>>>> origin/main
```

2. Chọn code nào giữ lại (hoặc giữ cả 2), xóa các dấu `<<<<`, `====`, `>>>>`

3. Sau khi sửa xong:
```bash
git add src/components/Header.tsx
git commit -m "fix: resolve merge conflict"
git push origin main
```

### 🔍 Tình huống 3: Xem ai đã thay đổi file nào

```bash
# Xem lịch sử commit gần đây
git log --oneline -10

# Xem chi tiết 1 commit
git show COMMIT_HASH

# Xem ai sửa file này
git log --follow src/components/Header.tsx

# Xem thay đổi trong commit
git diff HEAD~1
```

### 🗑️ Tình huống 4: Muốn hủy thay đổi chưa commit

```bash
# Hủy thay đổi 1 file (nguy hiểm!)
git restore src/components/Header.tsx

# Hủy tất cả thay đổi (rất nguy hiểm!)
git restore .

# Unstage file (giữ thay đổi, chỉ bỏ khỏi staging)
git restore --staged src/components/Header.tsx
```

### ⏮️ Tình huống 5: Muốn quay lại commit trước

```bash
# Xem lịch sử
git log --oneline

# Quay lại commit cụ thể (soft - giữ code)
git reset --soft COMMIT_HASH

# Quay lại commit cụ thể (hard - XÓA code) ⚠️
git reset --hard COMMIT_HASH
```

## 🌿 Branch Strategy (Khuyến nghị cho team)

### Làm việc với Branches

```bash
# Tạo branch mới cho feature
git checkout -b feature/add-payment

# Xem branch hiện tại
git branch

# Chuyển branch
git checkout main

# Push branch lên GitHub
git push origin feature/add-payment

# Merge branch vào main (sau khi test xong)
git checkout main
git pull origin main
git merge feature/add-payment
git push origin main

# Xóa branch đã merge
git branch -d feature/add-payment
git push origin --delete feature/add-payment
```

### Branch Naming Convention

```
feature/    - Tính năng mới (feature/add-cart)
fix/        - Fix bug (fix/payment-error)
docs/       - Cập nhật documentation (docs/update-readme)
style/      - CSS/styling changes (style/improve-header)
refactor/   - Refactor code (refactor/cleanup-components)
test/       - Thêm tests (test/add-unit-tests)
```

## 📋 Git Commit Message Convention

### Format chuẩn:

```
<type>: <subject>

<body> (optional)
```

### Types:

- `feat:` - Tính năng mới
- `fix:` - Fix bug
- `docs:` - Cập nhật documentation
- `style:` - Format code, thêm CSS
- `refactor:` - Refactor code
- `test:` - Thêm tests
- `chore:` - Maintenance tasks

### Examples:

```bash
git commit -m "feat: add shopping cart functionality"
git commit -m "fix: resolve payment processing error"
git commit -m "docs: update setup guide"
git commit -m "style: improve header responsive design"
git commit -m "refactor: simplify checkout logic"
git commit -m "chore: update dependencies"
```

## 🔐 File không nên commit

Các file này đã được `.gitignore`:

- ❌ `node_modules/` - Dependencies
- ❌ `.env.local` - API keys bí mật
- ❌ `.next/` - Build output
- ❌ `*.log` - Log files
- ❌ `.DS_Store` - macOS files

### Kiểm tra trước khi commit:

```bash
# Xem file nào sẽ được commit
git status

# Đảm bảo không có file bí mật
git status | grep -E "\.env|\.key|secret"
```

## 🆘 Emergency Commands

### Nhỡ commit nhầm file bí mật:

```bash
# Xóa file khỏi Git nhưng giữ ở local
git rm --cached .env.local
git commit -m "chore: remove secret file"
git push origin main
```

### Code bị lỗi, muốn quay lại trạng thái clean:

```bash
# Lưu code hiện tại tạm thời
git stash

# Code bây giờ clean, lấy code mới
git pull origin main

# Lấy lại code đã stash (nếu cần)
git stash pop
```

### Pull nhầm, muốn hủy:

```bash
# Quay lại trước khi pull (nguy hiểm!)
git reset --hard HEAD@{1}
```

## 📊 Useful Git Commands

```bash
# Xem trạng thái repo
git status

# Xem lịch sử commit đẹp
git log --oneline --graph --all

# Xem ai sửa từng dòng của file
git blame src/components/Header.tsx

# Tìm kiếm trong commit messages
git log --grep="payment"

# Xem thay đổi chưa commit
git diff

# Xem thay đổi đã staged
git diff --staged

# Xem branches từ xa
git branch -r

# Update danh sách branches từ GitHub
git fetch --prune
```

## 🎯 Best Practices

### ✅ NÊN:

1. **Pull trước khi bắt đầu code** mỗi ngày
2. **Commit thường xuyên** với message rõ ràng
3. **Pull trước khi push** để tránh conflict
4. **Test code** trước khi commit
5. **Review code** trước khi merge
6. **Dùng branches** cho features lớn
7. **Backup code** thường xuyên lên GitHub

### ❌ KHÔNG NÊN:

1. Commit file `.env.local` hoặc API keys
2. Commit `node_modules/`
3. Force push (`git push -f`) lên main
4. Commit code chưa test
5. Commit với message không rõ ràng ("update", "fix")
6. Code trực tiếp trên branch `main` (nếu team lớn)

## 🔄 Daily Workflow Summary

```bash
# Sáng - Bắt đầu làm việc
git pull origin main

# Trong ngày - Code và commit
git add .
git commit -m "feat: add new feature"

# Trước khi về - Push lên
git pull origin main  # Lấy code mới
git push origin main  # Push code của bạn
```

## 📞 Help & Support

- **Git documentation:** https://git-scm.com/doc
- **GitHub guides:** https://guides.github.com
- **Resolve conflicts:** https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts

---

**💡 Tips:** 
- Luôn pull trước khi code
- Commit nhỏ và thường xuyên
- Message rõ ràng
- Review trước khi push

**Happy coding! 🎉**

