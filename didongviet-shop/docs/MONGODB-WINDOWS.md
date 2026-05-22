# MongoDB trên Windows (Cách 2)

## Cài đặt lần đầu

1. Tải **MongoDB Community Server**: https://www.mongodb.com/try/download/community  
   - Version: 7.x hoặc 8.x  
   - Platform: Windows x64  
   - Package: **msi**

2. Chạy installer:
   - Chọn **Complete**
   - Bật **Install MongoDB as a Service**
   - Service name: `MongoDB` (mặc định)
   - Data directory: mặc định `C:\Program Files\MongoDB\...`

3. (Tùy chọn) Bỏ chọn **Install MongoDB Compass** nếu không cần GUI.

## Kết nối MongoDB Compass (sau khi cài xong)

1. Mở **MongoDB Compass**
2. Bấm **+ Add new connection**
3. URI mặc định giữ nguyên:

```
mongodb://127.0.0.1:27017
```

4. Bấm **Connect**

- Nếu **Connect thành công** → MongoDB đang chạy, làm tiếp bước Seed bên dưới.
- Nếu **lỗi / refused** → chưa bật service, làm bước "Khởi động MongoDB" ngay sau đây.

## Khởi động MongoDB

### PowerShell (quyền Admin)

```powershell
net start MongoDB
```

### Hoặc Services

`Win + R` → `services.msc` → **MongoDB Server (MongoDB)** → **Start**

## Kiểm tra đã chạy

```powershell
Test-NetConnection -ComputerName 127.0.0.1 -Port 27017
```

`TcpTestSucceeded : True` → OK.

## Cấu hình project

File `server/.env`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/didongviet
```

## Seed & chạy API

```powershell
cd E:\didongViet\didongviet-shop\server
npm run seed
npm run dev
```

## Lỗi thường gặp

| Lỗi | Xử lý |
|-----|--------|
| `ECONNREFUSED 127.0.0.1:27017` | Service chưa Start → `net start MongoDB` |
| `service name is invalid` | Chưa cài MongoDB hoặc tên service khác → xem `services.msc` |
| `Access is denied` | Mở PowerShell **Run as Administrator** |

## Dừng MongoDB

```powershell
net stop MongoDB
```
