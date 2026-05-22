# MongoDB Atlas — Di Động Việt Shop

## Bước 1: Tạo tài khoản & cluster

1. Vào https://www.mongodb.com/atlas
2. Đăng ký / đăng nhập → **Create** deployment
3. Chọn **M0 FREE** → region gần VN (ví dụ `Singapore`) → **Create**

## Bước 2: Tạo user database

1. Menu **Database Access** → **Add New Database User**
2. Authentication: **Password**
3. Username: `ddvadmin` (hoặc tùy bạn)
4. Password: bấm **Autogenerate** → **copy và lưu lại** (chỉ hiện một lần)
5. Database User Privileges: **Read and write to any database**
6. **Add User**

## Bước 3: Cho phép IP kết nối

1. Menu **Network Access** → **Add IP Address**
2. Dev nhanh: chọn **Allow Access from Anywhere** (`0.0.0.0/0`)
3. Production sau này nên giới hạn IP cố định
4. **Confirm**

## Bước 4: Lấy connection string

1. Menu **Database** → cluster → **Connect**
2. Chọn **Drivers** → Node.js
3. Copy chuỗi dạng:

```
mongodb+srv://ddvadmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

4. **Sửa chuỗi** trước khi dán vào `.env`:
   - Thay `<password>` bằng mật khẩu user (bỏ dấu `<>`)
   - Thêm tên database `didongviet` trước dấu `?`:

```
mongodb+srv://ddvadmin:MatKhauCuaBan@cluster0.xxxxx.mongodb.net/didongviet?retryWrites=true&w=majority
```

> Mật khẩu có ký tự đặc biệt (`@`, `#`, `%`…)? Encode URL: https://www.urlencoder.org/

## Bước 5: Cập nhật `server/.env`

Mở `E:\didongViet\didongviet-shop\server\.env`:

```env
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/didongviet?retryWrites=true&w=majority
JWT_SECRET=dat_mot_chuoi_dai_ngau_nhien_32_ky_tu
```

## Bước 6: Seed & chạy server

```powershell
cd E:\didongViet\didongviet-shop\server
npm run seed
npm run dev
```

Thành công sẽ thấy:

```
MongoDB connected: cluster0-shard-00-00.xxxxx.mongodb.net
Server running on port 5000
```

## Kiểm tra dữ liệu trên Atlas

**Database** → **Browse Collections** → database `didongviet` → collections `users`, `products`, `categories`…

## Lỗi thường gặp

| Lỗi | Cách xử lý |
|-----|------------|
| `bad auth` | Sai user/password trong URI |
| `IP not whitelisted` | Thêm IP trong Network Access |
| `querySrv ENOTFOUND` | Sai hostname cluster / mất mạng |
| Timeout | Kiểm tra firewall, thử mạng khác |
