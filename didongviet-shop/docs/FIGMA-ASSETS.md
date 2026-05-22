# Xuất ảnh từ Figma vào project

Không thể đọc file Figma private tự động. Để **giống 100%** thiết kế:

1. Mở file: https://www.figma.com/design/tVXPjoouI4fWT9MsXjDokR/CNPM_Nhom6
2. Chọn frame/layer → **Export** (PNG 2x hoặc SVG)
3. Đặt vào `client/public/assets/` với tên tương ứng:

| File gợi ý | Thay cho |
|------------|----------|
| `logo.png` | `logo.svg` |
| `banner-main.png` | `banner-main.svg` |
| `banner-promo-1.png` | `banner-side-1.svg` |
| `banner-promo-2.png` | `banner-side-2.svg` |
| `cat-iphone.png` | `cat-iphone.svg` |
| `product-*.png` | ảnh sản phẩm từ API hoặc placeholder |

4. Sửa đường dẫn trong `Home.jsx` / components nếu đổi tên file.

Màu chủ đạo trong code: **#D70018** (đỏ), nav **#222** — chỉnh trong các file `*.css` nếu Figma dùng mã khác.
