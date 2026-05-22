# Di Động Việt Shop

E-commerce website bán điện thoại (React + Vite + Express + MongoDB).

## Cấu trúc

- `client/` — Frontend (React, React Router, Axios, CSS Modules)
- `server/` — Backend (Express, JWT, Multer, Mongoose)

## Yêu cầu

- Node.js 18+
- MongoDB (Docker, cài local, hoặc Atlas)

## MongoDB — bắt buộc trước khi chạy server

Lỗi `ECONNREFUSED 127.0.0.1:27017` nghĩa là **chưa có MongoDB lắng nghe port 27017**.

### Cách 1: Docker (khuyến nghị)

Tại thư mục gốc `didongviet-shop`:

```powershell
docker compose up -d
```

Kiểm tra: `docker ps` — container `didongviet-mongo` phải đang chạy.

### Cách 2: MongoDB cài trên Windows

1. Tải [MongoDB Community](https://www.mongodb.com/try/download/community) và cài (chọn **Install MongoDB as a Service**).
2. Khởi động service:

```powershell
net start MongoDB
```

Hoặc: `Win + R` → `services.msc` → tìm **MongoDB Server** → **Start**.

### Cách 3: MongoDB Atlas (cloud) — chi tiết

Xem file **[docs/MONGODB-ATLAS.md](docs/MONGODB-ATLAS.md)** (từng bước có hình mô tả).

Tóm tắt: tạo cluster M0 → user + password → Network Access `0.0.0.0/0` → copy URI → sửa `server/.env` → `npm run seed`.

## Cài đặt

```bash
# Backend
cd server
copy .env.example .env
npm install
npm run seed
npm run dev

# Frontend (terminal khác)
cd client
copy .env.example .env
npm install
npm run dev
```

- API: http://localhost:5000/api/v1
- Web: http://localhost:5173

## Tính năng

- Giỏ hàng, thanh toán, đăng ký/đăng nhập JWT
- **Yêu thích** (`/yeu-thich`) — nút ♡ trên sản phẩm
- **So sánh** tối đa 3 máy (`/so-sanh`) — nút ⚖
- **Lọc & sắp xếp** — giá, hãng, phân trang
- **Đánh giá sản phẩm** — 1 review/user/sản phẩm
- **Sản phẩm tương tự** — trang chi tiết
- **Chi tiết đơn hàng** — `/don-hang/:id`
- **Admin** (`/admin`) — `admin@didongviet.vn` / `admin123`
- **Mã giảm giá** — `DDV10`, `GIAM500K`, `WELCOME` (sau `npm run seed`)
- **Quên mật khẩu** — `/quen-mat-khau` → `/dat-lai-mat-khau`
- **Admin panel** — SP, danh mục, đơn hàng, user, coupon, thống kê
