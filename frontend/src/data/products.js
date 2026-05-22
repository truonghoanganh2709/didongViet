// KHO DỮ LIỆU TỔNG HỢP DI ĐỘNG VIỆT (MOCK DATA)

const rawProducts = [
  // ==========================================
  // 1. THƯƠNG HIỆU APPLE (ĐIỆN THOẠI IPHONE)
  // ==========================================
  {
    id: 1, name: "iPhone 17 Pro Max 256GB Chính Hãng", price: "36.690.000 đ", oldPrice: "37.990.000 đ", 
    img: "/images/ip17-pro-max.png", category: "apple", isBestSeller: true, discount: "3%",
    thumbnails: [
      "/images/ip17-pro-max.png",
      "/images/ip17-pro-max-back.png",
      "/images/ip17-pro-max-side.png",
      "/images/ip17-pro-max-detail.png",
      "/images/ip17-pro-max-box.png"
    ]
  },
  {
    id: 2, name: "iPhone 17 Pro 256GB Chính Hãng", price: "33.890.000 đ", oldPrice: "34.990.000 đ", 
    img: "/images/ip17-pro.png", category: "apple", isBestSeller: true, discount: "3%",
    thumbnails: [
      "/images/ip17-pro.png",
      "/images/ip17-pro-back.png",
      "/images/ip17-pro-side.png",
      "/images/ip17-pro-detail.png",
      "/images/ip17-pro-box.png"
    ]
  },
  {
    id: 3, name: "iPhone 17 Pro 512GB Chính Hãng", price: "40.690.000 đ", oldPrice: "41.490.000 đ", 
    img: "/images/ip17-pro-512.png", category: "apple", isBestSeller: true, discount: "1%",
    thumbnails: [
      "/images/ip17-pro-512.png",
      "/images/ip17-pro-512-back.png",
      "/images/ip17-pro-512-side.png",
      "/images/ip17-pro-512-detail.png",
      "/images/ip17-pro-512-box.png"
    ]
  },
  {
    id: 4, name: "iPhone 17 Pro 1TB Chính Hãng", price: "45.990.000 đ", oldPrice: "47.990.000 đ", 
    img: "/images/ip17-pro-1tb.png", category: "apple", isBestSeller: false, discount: "4%",
    thumbnails: [
      "/images/ip17-pro-1tb.png",
      "/images/ip17-pro-1tb-back.png",
      "/images/ip17-pro-1tb-side.png",
      "/images/ip17-pro-1tb-detail.png",
      "/images/ip17-pro-1tb-box.png"
    ]
  },
  {
    id: 5, name: "iPhone 17 Pro Max 1TB Chính Hãng", price: "49.890.000 đ", oldPrice: "50.990.000 đ", 
    img: "/images/ip17-pro-max-1tb.png", category: "apple", isBestSeller: false, discount: "2%",
    thumbnails: [
      "/images/ip17-pro-max-1tb.png",
      "/images/ip17-pro-max-1tb-back.png",
      "/images/ip17-pro-max-1tb-side.png",
      "/images/ip17-pro-max-1tb-detail.png",
      "/images/ip17-pro-max-1tb-box.png"
    ]
  },
  {
    id: 6, name: "iPhone 17 Pro Max 512GB Chính Hãng", price: "42.790.000 đ", oldPrice: "44.490.000 đ", 
    img: "/images/ip17-pro-max-512.png", category: "apple", isBestSeller: true, discount: "3%",
    thumbnails: [
      "/images/ip17-pro-max-512.png",
      "/images/ip17-pro-max-512-back.png",
      "/images/ip17-pro-max-512-side.png",
      "/images/ip17-pro-max-512-detail.png",
      "/images/ip17-pro-max-512-box.png"
    ]
  },
  {
    id: 7, name: "iPhone 17 256GB Chính Hãng", price: "23.790.000 đ", oldPrice: "24.990.000 đ", 
    img: "/images/ip17-256.png", category: "apple", isBestSeller: false, discount: "4%",
    thumbnails: [
      "/images/ip17-256.png",
      "/images/ip17-256-back.png",
      "/images/ip17-256-side.png",
      "/images/ip17-256-detail.png",
      "/images/ip17-256-box.png"
    ]
  },
  {
    id: 8, name: "iPhone 17 512GB Chính Hãng", price: "29.890.000 đ", oldPrice: "31.490.000 đ", 
    img: "/images/ip17-512.png", category: "apple", isBestSeller: false, discount: "5%",
    thumbnails: [
      "/images/ip17-512.png",
      "/images/ip17-512-back.png",
      "/images/ip17-512-side.png",
      "/images/ip17-512-detail.png",
      "/images/ip17-512-box.png"
    ]
  },
  {
    id: 9, name: "iPhone Air 256GB Chính Hãng", price: "22.890.000 đ", oldPrice: "31.990.000 đ", 
    img: "/images/ip-air-256.png", category: "apple", isBestSeller: false, discount: "28%",
    thumbnails: [
      "/images/ip-air-256.png",
      "/images/ip-air-256-back.png",
      "/images/ip-air-256-side.png",
      "/images/ip-air-256-detail.png",
      "/images/ip-air-256-box.png"
    ]
  },
  {
    id: 10, name: "iPhone Air 512GB Chính Hãng", price: "28.990.000 đ", oldPrice: "38.490.000 đ", 
    img: "/images/ip-air-512.png", category: "apple", isBestSeller: false, discount: "24%",
    thumbnails: [
      "/images/ip-air-512.png",
      "/images/ip-air-512-back.png",
      "/images/ip-air-512-side.png",
      "/images/ip-air-512-detail.png",
      "/images/ip-air-512-box.png"
    ]
  },
  {
    id: 11, name: "iPhone 16 Pro Max 256GB Chính Hãng", price: "29.490.000 đ", oldPrice: "34.990.000 đ", 
    img: "/images/ip16-pro-max.png", category: "apple", isBestSeller: false, discount: "15%",
    thumbnails: [
      "/images/ip16-pro-max.png",
      "/images/ip16-pro-max-back.png",
      "/images/ip16-pro-max-side.png",
      "/images/ip16-pro-max-detail.png",
      "/images/ip16-pro-max-box.png"
    ]
  },
  {
    id: 12, name: "iPhone 15 Pro Max 256GB Chính Hãng", price: "28.990.000 đ", oldPrice: "34.990.000 đ", 
    img: "/images/ip15-pro-max.png", category: "apple", isBestSeller: false, discount: "17%",
    thumbnails: [
      "/images/ip15-pro-max.png",
      "/images/ip15-pro-max-back.png",
      "/images/ip15-pro-max-side.png",
      "/images/ip15-pro-max-detail.png",
      "/images/ip15-pro-max-box.png"
    ]
  },

  // ==========================================
  // 2. THƯƠNG HIỆU SAMSUNG
  // ==========================================
  {
    id: 13, name: "Samsung Galaxy A56 5G 128GB Chính Hãng", price: "8.590.000 đ", oldPrice: "9.990.000 đ", 
    img: "/images/ss-a56.png", category: "samsung", isBestSeller: false, discount: "14%",
    thumbnails: [
      "/images/ss-a56.png",
      "/images/ss-a56-back.png",
      "/images/ss-a56-side.png",
      "/images/ss-a56-detail.png",
      "/images/ss-a56-box.png"
    ]
  },
  {
    id: 14, name: "Samsung Galaxy Z Fold7 5G 256GB Chính Hãng", price: "38.590.000 đ", oldPrice: "46.990.000 đ", 
    img: "/images/ss-zfold7.png", category: "samsung", isBestSeller: false, discount: "17%",
    thumbnails: [
      "/images/ss-zfold7.png",
      "/images/ss-zfold7-back.png",
      "/images/ss-zfold7-side.png",
      "/images/ss-zfold7-detail.png",
      "/images/ss-zfold7-box.png"
    ]
  },
  {
    id: 15, name: "Samsung Galaxy S26 Ultra 256GB Chính Hãng", price: "29.390.000 đ", oldPrice: "36.990.000 đ", 
    img: "/images/ss-s26-ultra.png", category: "samsung", isBestSeller: true, discount: "20%",
    thumbnails: [
      "/images/ss-s26-ultra.png",
      "/images/ss-s26-ultra-back.png",
      "/images/ss-s26-ultra-side.png",
      "/images/ss-s26-ultra-detail.png",
      "/images/ss-s26-ultra-box.png"
    ]
  },
  {
    id: 16, name: "Samsung Galaxy S26 512GB Chính Hãng", price: "26.290.000 đ", oldPrice: "31.990.000 đ", 
    img: "/images/ss-s26.png", category: "samsung", isBestSeller: false, discount: "17%",
    thumbnails: [
      "/images/ss-s26.png",
      "/images/ss-s26-back.png",
      "/images/ss-s26-side.png",
      "/images/ss-s26-detail.png",
      "/images/ss-s26-box.png"
    ]
  },
  {
    id: 17, name: "Samsung Galaxy S25 Ultra 5G 256GB", price: "26.490.000 đ", oldPrice: "33.990.000 đ", 
    img: "/images/ss-s25-ultra.png", category: "samsung", isBestSeller: false, discount: "22%",
    thumbnails: [
      "/images/ss-s25-ultra.png",
      "/images/ss-s25-ultra-back.png",
      "/images/ss-s25-ultra-side.png",
      "/images/ss-s25-ultra-detail.png",
      "/images/ss-s25-ultra-box.png"
    ]
  },
  {
    id: 18, name: "Samsung Galaxy S25 Ultra 5G 256GB (BHĐT)", price: "24.790.000 đ", oldPrice: "33.990.000 đ", 
    img: "/images/ss-s25-ultra-bhdt.png", category: "samsung", isBestSeller: false, discount: "27%",
    thumbnails: [
      "/images/ss-s25-ultra-bhdt.png",
      "/images/ss-s25-ultra-bhdt-back.png",
      "/images/ss-s25-ultra-bhdt-side.png",
      "/images/ss-s25-ultra-bhdt-detail.png",
      "/images/ss-s25-ultra-bhdt-box.png"
    ]
  },
  {
    id: 19, name: "Samsung Galaxy Z Fold7 5G 256GB", price: "39.890.000 đ", oldPrice: "46.990.000 đ", 
    img: "/images/ss-zfold7-5g.png", category: "samsung", isBestSeller: false, discount: "15%",
    thumbnails: [
      "/images/ss-zfold7-5g.png",
      "/images/ss-zfold7-5g-back.png",
      "/images/ss-zfold7-5g-side.png",
      "/images/ss-zfold7-5g-detail.png",
      "/images/ss-zfold7-5g-box.png"
    ]
  },
  {
    id: 20, name: "Samsung Galaxy S26 Ultra 512GB Chính Hãng", price: "35.890.000 đ", oldPrice: "42.990.000 đ", 
    img: "/images/ss-s26-ultra-512.png", category: "samsung", isBestSeller: false, discount: "16%",
    thumbnails: [
      "/images/ss-s26-ultra-512.png",
      "/images/ss-s26-ultra-512-back.png",
      "/images/ss-s26-ultra-512-side.png",
      "/images/ss-s26-ultra-512-detail.png",
      "/images/ss-s26-ultra-512-box.png"
    ]
  },
  {
    id: 21, name: "Samsung Galaxy Z Flip7 5G 256GB", price: "23.490.000 đ", oldPrice: "28.990.000 đ", 
    img: "/images/ss-zflip7.png", category: "samsung", isBestSeller: false, discount: "18%",
    thumbnails: [
      "/images/ss-zflip7.png",
      "/images/ss-zflip7-back.png",
      "/images/ss-zflip7-side.png",
      "/images/ss-zflip7-detail.png",
      "/images/ss-zflip7-box.png"
    ]
  },
  {
    id: 22, name: "Samsung Galaxy S25 FE 128GB Chính Hãng", price: "13.250.000 đ", oldPrice: "16.690.000 đ", 
    img: "/images/ss-s25-fe.png", category: "samsung", isBestSeller: false, discount: "20%",
    thumbnails: [
      "/images/ss-s25-fe.png",
      "/images/ss-s25-fe-back.png",
      "/images/ss-s25-fe-side.png",
      "/images/ss-s25-fe-detail.png",
      "/images/ss-s25-fe-box.png"
    ]
  },
  {
    id: 23, name: "Samsung Galaxy A35 5G 128GB", price: "7.190.000 đ", oldPrice: "8.290.000 đ", 
    img: "/images/ss-a35.png", category: "samsung", isBestSeller: false, discount: "13%",
    thumbnails: [
      "/images/ss-a35.png",
      "/images/ss-a35-back.png",
      "/images/ss-a35-side.png",
      "/images/ss-a35-detail.png",
      "/images/ss-a35-box.png"
    ]
  },
  {
    id: 24, name: "Samsung Galaxy M54 5G 256GB", price: "9.490.000 đ", oldPrice: "11.990.000 đ", 
    img: "/images/ss-m54.png", category: "samsung", isBestSeller: false, discount: "20%",
    thumbnails: [
      "/images/ss-m54.png",
      "/images/ss-m54-back.png",
      "/images/ss-m54-side.png",
      "/images/ss-m54-detail.png",
      "/images/ss-m54-box.png"
    ]
  },

  // ==========================================
  // 3. ANDROID KHÁC
  // ==========================================
  {
    id: 25, name: "Xiaomi Redmi A7 Pro 128GB Chính Hãng", price: "4.190.000 đ", oldPrice: "4.490.000 đ", 
    img: "/images/xiaomi-a7-pro.png", category: "android", isBestSeller: false, discount: "6%",
    thumbnails: [
      "/images/xiaomi-a7-pro.png",
      "/images/xiaomi-a7-pro-back.png",
      "/images/xiaomi-a7-pro-side.png",
      "/images/xiaomi-a7-pro-detail.png",
      "/images/xiaomi-a7-pro-box.png"
    ]
  },
  {
    id: 26, name: "OPPO Reno15 F 5G Chính Hãng", price: "11.390.000 đ", oldPrice: "11.990.000 đ", 
    img: "/images/oppo-reno15f.png", category: "android", isBestSeller: true, discount: "5%",
    thumbnails: [
      "/images/oppo-reno15f.png",
      "/images/oppo-reno15f-back.png",
      "/images/oppo-reno15f-side.png",
      "/images/oppo-reno15f-detail.png",
      "/images/oppo-reno15f-box.png"
    ]
  },
  {
    id: 27, name: "Xiaomi 15T 5G Chính Hãng", price: "12.990.000 đ", oldPrice: "14.990.000 đ", 
    img: "/images/xiaomi-15t.png", category: "android", isBestSeller: false, discount: "13%",
    thumbnails: [
      "/images/xiaomi-15t.png",
      "/images/xiaomi-15t-back.png",
      "/images/xiaomi-15t-side.png",
      "/images/xiaomi-15t-detail.png",
      "/images/xiaomi-15t-box.png"
    ]
  },
  {
    id: 28, name: "OPPO A6 Pro 128GB Chính Hãng", price: "7.990.000 đ", oldPrice: "8.290.000 đ", 
    img: "/images/oppo-a6-pro.png", category: "android", isBestSeller: false, discount: "3%",
    thumbnails: [
      "/images/oppo-a6-pro.png",
      "/images/oppo-a6-pro-back.png",
      "/images/oppo-a6-pro-side.png",
      "/images/oppo-a6-pro-detail.png",
      "/images/oppo-a6-pro-box.png"
    ]
  },
  {
    id: 29, name: "OPPO Reno15 5G Chính Hãng", price: "16.390.000 đ", oldPrice: "16.990.000 đ", 
    img: "/images/oppo-reno15.png", category: "android", isBestSeller: false, discount: "3%",
    thumbnails: [
      "/images/oppo-reno15.png",
      "/images/oppo-reno15-back.png",
      "/images/oppo-reno15-side.png",
      "/images/oppo-reno15-detail.png",
      "/images/oppo-reno15-box.png"
    ]
  },
  {
    id: 30, name: "TECNO Spark 20 Pro 256GB", price: "4.590.000 đ", oldPrice: "5.490.000 đ", 
    img: "/images/tecno-spark20.png", category: "android", isBestSeller: false, discount: "16%",
    thumbnails: [
      "/images/tecno-spark20.png",
      "/images/tecno-spark20-back.png",
      "/images/tecno-spark20-side.png",
      "/images/tecno-spark20-detail.png",
      "/images/tecno-spark20-box.png"
    ]
  },

  // ==========================================
  // 4. MACBOOK & TABLET
  // ==========================================
  {
    id: 31, name: "Samsung Galaxy Tab S10 Lite Wifi 128GB", price: "7.390.000 đ", oldPrice: "8.990.000 đ", 
    img: "/images/tab-s10-lite.png", category: "tablet-laptop", isBestSeller: false, discount: "17%",
    thumbnails: [
      "/images/tab-s10-lite.png",
      "/images/tab-s10-lite-back.png",
      "/images/tab-s10-lite-side.png",
      "/images/tab-s10-lite-detail.png",
      "/images/tab-s10-lite-box.png"
    ]
  },
  {
    id: 32, name: "MacBook Air M4 13-inch 16GB/256GB", price: "23.590.000 đ", oldPrice: "26.990.000 đ", 
    img: "/images/macbook-air-m4.png", category: "tablet-laptop", isBestSeller: true, discount: "12%",
    thumbnails: [
      "/images/macbook-air-m4.png",
      "/images/macbook-air-m4-back.png",
      "/images/macbook-air-m4-side.png",
      "/images/macbook-air-m4-detail.png",
      "/images/macbook-air-m4-box.png"
    ]
  },
  {
    id: 33, name: "iPad Air M3 11 inch | 128GB Wifi", price: "14.990.000 đ", oldPrice: "16.990.000 đ", 
    img: "/images/ipad-air-m3.png", category: "tablet-laptop", isBestSeller: false, discount: "11%",
    thumbnails: [
      "/images/ipad-air-m3.png",
      "/images/ipad-air-m3-back.png",
      "/images/ipad-air-m3-side.png",
      "/images/ipad-air-m3-detail.png",
      "/images/ipad-air-m3-box.png"
    ]
  },
  {
    id: 34, name: "HUAWEI MatePad 12 X Chính Hãng", price: "14.990.000 đ", oldPrice: "15.490.000 đ", 
    img: "/images/huawei-matepad-12x.png", category: "tablet-laptop", isBestSeller: false, discount: "3%",
    thumbnails: [
      "/images/huawei-matepad-12x.png",
      "/images/huawei-matepad-12x-back.png",
      "/images/huawei-matepad-12x-side.png",
      "/images/huawei-matepad-12x-detail.png",
      "/images/huawei-matepad-12x-box.png"
    ]
  },
  {
    id: 35, name: "Xiaomi Redmi Pad 2 Pro 5G 12.1 inch", price: "7.590.000 đ", oldPrice: "9.490.000 đ", 
    img: "/images/xiaomi-pad2-pro.png", category: "tablet-laptop", isBestSeller: false, discount: "20%",
    thumbnails: [
      "/images/xiaomi-pad2-pro.png",
      "/images/xiaomi-pad2-pro-back.png",
      "/images/xiaomi-pad2-pro-side.png",
      "/images/xiaomi-pad2-pro-detail.png",
      "/images/xiaomi-pad2-pro-box.png"
    ]
  },
  {
    id: 36, name: "iPad Pro M4 11 inch 256GB Wifi", price: "25.490.000 đ", oldPrice: "28.990.000 đ", 
    img: "/images/ipad-pro-m4.png", category: "tablet-laptop", isBestSeller: false, discount: "12%",
    thumbnails: [
      "/images/ipad-pro-m4.png",
      "/images/ipad-pro-m4-back.png",
      "/images/ipad-pro-m4-side.png",
      "/images/ipad-pro-m4-detail.png",
      "/images/ipad-pro-m4-box.png"
    ]
  },

  // ==========================================
  // 5. ĐỒNG HỒ THÔNG MINH
  // ==========================================
  {
    id: 37, name: "Apple Watch Series 11 42mm (GPS) Viền nhôm", price: "9.590.000 đ", oldPrice: "11.490.000 đ", 
    img: "/images/apple-watch-11.png", category: "watch", isBestSeller: true, discount: "16%",
    thumbnails: [
      "/images/apple-watch-11.png",
      "/images/apple-watch-11-back.png",
      "/images/apple-watch-11-side.png",
      "/images/apple-watch-11-detail.png",
      "/images/apple-watch-11-box.png"
    ]
  },
  {
    id: 38, name: "HUAWEI Watch GT 6 Pro 46mm", price: "6.990.000 đ", oldPrice: "8.490.000 đ", 
    img: "/images/huawei-watch-gt6-pro.png", category: "watch", isBestSeller: false, discount: "17%",
    thumbnails: [
      "/images/huawei-watch-gt6-pro.png",
      "/images/huawei-watch-gt6-pro-back.png",
      "/images/huawei-watch-gt6-pro-side.png",
      "/images/huawei-watch-gt6-pro-detail.png",
      "/images/huawei-watch-gt6-pro-box.png"
    ]
  },
  {
    id: 39, name: "Samsung Galaxy Watch8 L330 Bluetooth 44mm", price: "7.190.000 đ", oldPrice: "9.990.000 đ", 
    img: "/images/ss-watch8.png", category: "watch", isBestSeller: false, discount: "28%",
    thumbnails: [
      "/images/ss-watch8.png",
      "/images/ss-watch8-back.png",
      "/images/ss-watch8-side.png",
      "/images/ss-watch8-detail.png",
      "/images/ss-watch8-box.png"
    ]
  },
  {
    id: 40, name: "HUAWEI Watch GT 6 46mm", price: "4.490.000 đ", oldPrice: "5.490.000 đ", 
    img: "/images/huawei-watch-gt6.png", category: "watch", isBestSeller: false, discount: "18%",
    thumbnails: [
      "/images/huawei-watch-gt6.png",
      "/images/huawei-watch-gt6-back.png",
      "/images/huawei-watch-gt6-side.png",
      "/images/huawei-watch-gt6-detail.png",
      "/images/huawei-watch-gt6-box.png"
    ]
  },
  {
    id: 41, name: "Xiaomi Watch S4 41mm", price: "3.790.000 đ", oldPrice: "4.290.000 đ", 
    img: "/images/xiaomi-watch-s4.png", category: "watch", isBestSeller: false, discount: "11%",
    thumbnails: [
      "/images/xiaomi-watch-s4.png",
      "/images/xiaomi-watch-s4-back.png",
      "/images/xiaomi-watch-s4-side.png",
      "/images/xiaomi-watch-s4-detail.png",
      "/images/xiaomi-watch-s4-box.png"
    ]
  },
  {
    id: 42, name: "Garmin Forerunner 265 Music", price: "11.690.000 đ", oldPrice: "12.990.000 đ", 
    img: "/images/garmin-265.png", category: "watch", isBestSeller: false, discount: "10%",
    thumbnails: [
      "/images/garmin-265.png",
      "/images/garmin-265-back.png",
      "/images/garmin-265-side.png",
      "/images/garmin-265-detail.png",
      "/images/garmin-265-box.png"
    ]
  },

  // ==========================================
  // 6. ÂM THANH
  // ==========================================
  {
    id: 43, name: "Tai nghe Apple AirPods 4 Chính Hãng", price: "3.050.000 đ", oldPrice: "3.490.000 đ", 
    img: "/images/airpods-4.png", category: "audio", isBestSeller: true, discount: "12%",
    thumbnails: [
      "/images/airpods-4.png",
      "/images/airpods-4-back.png",
      "/images/airpods-4-side.png",
      "/images/airpods-4-detail.png",
      "/images/airpods-4-box.png"
    ]
  },
  {
    id: 44, name: "Tai nghe Bluetooth hộp sạc 30h", price: "929.000 đ", oldPrice: "1.190.000 đ", 
    img: "/images/tai-nghe-bt.png", category: "audio", isBestSeller: false, discount: "21%",
    thumbnails: [
      "/images/tai-nghe-bt.png",
      "/images/tai-nghe-bt-back.png",
      "/images/tai-nghe-bt-side.png",
      "/images/tai-nghe-bt-detail.png",
      "/images/tai-nghe-bt-box.png"
    ]
  },
  {
    id: 45, name: "Tai nghe Bluetooth thể thao JBL Sense Lite", price: "2.590.000 đ", oldPrice: "2.990.000 đ", 
    img: "/images/jbl-sense-lite.png", category: "audio", isBestSeller: false, discount: "13%",
    thumbnails: [
      "/images/jbl-sense-lite.png",
      "/images/jbl-sense-lite-back.png",
      "/images/jbl-sense-lite-side.png",
      "/images/jbl-sense-lite-detail.png",
      "/images/jbl-sense-lite-box.png"
    ]
  },
  {
    id: 46, name: "Tai nghe Bluetooth chụp tai HAVIT H612BT Pro", price: "450.000 đ", oldPrice: "690.000 đ", 
    img: "/images/havit-h612bt.png", category: "audio", isBestSeller: false, discount: "34%",
    thumbnails: [
      "/images/havit-h612bt.png",
      "/images/havit-h612bt-back.png",
      "/images/havit-h612bt-side.png",
      "/images/havit-h612bt-detail.png",
      "/images/havit-h612bt-box.png"
    ]
  },
  {
    id: 47, name: "Loa Bluetooth JBL Flip 7", price: "3.500.000 đ", oldPrice: "3.590.000 đ", 
    img: "/images/jbl-flip7.png", category: "audio", isBestSeller: false, discount: "2%",
    thumbnails: [
      "/images/jbl-flip7.png",
      "/images/jbl-flip7-back.png",
      "/images/jbl-flip7-side.png",
      "/images/jbl-flip7-detail.png",
      "/images/jbl-flip7-box.png"
    ]
  },
  {
    id: 48, name: "Loa Bluetooth Marshall Emberton II", price: "3.990.000 đ", oldPrice: "4.490.000 đ", 
    img: "/images/marshall-emberton.png", category: "audio", isBestSeller: false, discount: "11%",
    thumbnails: [
      "/images/marshall-emberton.png",
      "/images/marshall-emberton-back.png",
      "/images/marshall-emberton-side.png",
      "/images/marshall-emberton-detail.png",
      "/images/marshall-emberton-box.png"
    ]
  },

  // ==========================================
  // 7. ĐỒ GIA DỤNG
  // ==========================================
  {
    id: 49, name: "Nồi lẩu điện đa năng 4L Bear HP-4H40D", price: "1.390.000 đ", oldPrice: "1.990.000 đ", 
    img: "/images/noi-lau-bear.png", category: "home", isBestSeller: false, discount: "30%",
    thumbnails: [
      "/images/noi-lau-bear.png",
      "/images/noi-lau-bear-back.png",
      "/images/noi-lau-bear-side.png",
      "/images/noi-lau-bear-detail.png",
      "/images/noi-lau-bear-box.png"
    ]
  },
  {
    id: 50, name: "Cân điện tử weight scale 365 Selection", price: "299.000 đ", oldPrice: "390.000 đ", 
    img: "/images/can-dien-tu.png", category: "home", isBestSeller: false, discount: "23%",
    thumbnails: [
      "/images/can-dien-tu.png",
      "/images/can-dien-tu-back.png",
      "/images/can-dien-tu-side.png",
      "/images/can-dien-tu-detail.png",
      "/images/can-dien-tu-box.png"
    ]
  },
  {
    id: 51, name: "Máy xay sinh tố 0.3L 50W Bear BL-5H06G", price: "690.000 đ", oldPrice: "1.290.000 đ", 
    img: "/images/may-xay-bear.png", category: "home", isBestSeller: false, discount: "46%",
    thumbnails: [
      "/images/may-xay-bear.png",
      "/images/may-xay-bear-back.png",
      "/images/may-xay-bear-side.png",
      "/images/may-xay-bear-detail.png",
      "/images/may-xay-bear-box.png"
    ]
  },
  {
    id: 52, name: "Máy massage mini Philips PPM7303", price: "175.000 đ", oldPrice: "299.000 đ", 
    img: "/images/massage-philips.png", category: "home", isBestSeller: false, discount: "41%",
    thumbnails: [
      "/images/massage-philips.png",
      "/images/massage-philips-back.png",
      "/images/massage-philips-side.png",
      "/images/massage-philips-detail.png",
      "/images/massage-philips-box.png"
    ]
  },
  {
    id: 53, name: "Nồi chiên không dầu 6.2L 1600W Bear", price: "1.640.000 đ", oldPrice: "2.390.000 đ", 
    img: "/images/noi-chien-bear.png", category: "home", isBestSeller: true, discount: "31%",
    thumbnails: [
      "/images/noi-chien-bear.png",
      "/images/noi-chien-bear-back.png",
      "/images/noi-chien-bear-side.png",
      "/images/noi-chien-bear-detail.png",
      "/images/noi-chien-bear-box.png"
    ]
  },
  {
    id: 54, name: "Robot hút bụi lau nhà Xiaomi Vacuum E10", price: "3.490.000 đ", oldPrice: "4.990.000 đ", 
    img: "/images/robot-xiaomi-e10.png", category: "home", isBestSeller: false, discount: "30%",
    thumbnails: [
      "/images/robot-xiaomi-e10.png",
      "/images/robot-xiaomi-e10-back.png",
      "/images/robot-xiaomi-e10-side.png",
      "/images/robot-xiaomi-e10-detail.png",
      "/images/robot-xiaomi-e10-box.png"
    ]
  }
];

// BỘ DỮ LIỆU THÔNG SỐ KỸ THUẬT MẪU
const mockSpecs = [
  {
    group: "Màn hình",
    items: [
      { name: "Công nghệ màn hình", value: "Super Retina XDR, Công nghệ ProMotion" },
      { name: "Màn hình rộng", value: "6.9\" - Tần số quét 120Hz" },
      { name: "Độ sáng tối đa", value: "3000 nits" },
      { name: "Mặt kính cảm ứng", value: "Kính cường lực Ceramic Shield 2" }
    ]
  },
  {
    group: "Camera sau",
    items: [
      { name: "Tính năng", value: "Zoom quang học 0.5x, 1x, 2x, 4x, 8x, Quay video hiển thị kép" },
      { name: "Độ phân giải", value: "Chính 48MP Fusion Main + Phụ 48MP Fusion Ultra Wide + Phụ 48MP Fusion Telephoto" },
      { name: "Đèn Flash", value: "Có" }
    ]
  },
  {
    group: "Camera trước",
    items: [
      { name: "Độ phân giải", value: "18MP" },
      { name: "Tính năng", value: "Center Stage, Ghi hình kép, Quay video ổn định" }
    ]
  },
  {
    group: "Hệ điều hành & CPU",
    items: [
      { name: "Hệ điều hành", value: "iOS 26" },
      { name: "Chip xử lý (CPU)", value: "Chip A19 Pro" },
      { name: "Chip đồ họa (GPU)", value: "GPU 6 lõi với Neural Accelerator" }
    ]
  },
  {
    group: "Bộ nhớ & Lưu trữ",
    items: [
      { name: "Bộ nhớ trong", value: "256GB" }
    ]
  },
  {
    group: "Kết nối",
    items: [
      { name: "Bluetooth", value: "v6.0" },
      { name: "Cổng kết nối/sạc", value: "USB-C" },
      { name: "Mạng di động", value: "Hỗ trợ 5G" },
      { name: "Wifi", value: "Wi-Fi 7" }
    ]
  },
  {
    group: "Pin & Sạc",
    items: [
      { name: "Dung lượng pin", value: "37 giờ" }
    ]
  },
  {
    group: "Tiện ích",
    items: [
      { name: "Tính năng đặc biệt", value: "Công nghệ Apple Intelligence, Dynamic Island" },
      { name: "Thời điểm ra mắt", value: "09/2025" }
    ]
  },
  {
    group: "Thiết kế",
    items: [
      { name: "Thiết kế", value: "Nguyên khối" },
      { name: "Chất liệu", value: "Nhôm" }
    ]
  }
];

// THUẬT TOÁN ĐÃ ĐƯỢC FIX: Giữ nguyên mảng thumbnails viết bằng tay, CHỈ gộp thêm bảng thông số kỹ thuật specs
export const allProducts = rawProducts.map(product => ({
  ...product,
  specs: mockSpecs 
}));

export const trendingKeywords = [
  "Galaxy S26 Ultra", "Galaxy Z Fold7", "Xiaomi 17 Ultra", 
  "Huawei Watch GT6", "iPhone 17 Pro Max", "MacBook Air M4"
];

export const quickLinksData = [
  { id: 1, name: "iPhone 17 Pro Max", img: "/images/ql-ip17pm.png", url: "#" },
  { id: 15, name: "Galaxy S26 Ultra", img: "/images/ql-s26u.png", url: "#" },
  { id: 25, name: "Redmi Note 15", img: "/images/ql-redmi15.png", url: "#" },
  { id: 12, name: "iPhone 15 Pro Max Cũ", img: "/images/ql-ip15pm-cu.png", url: "#" },
  { id: 7, name: "iPhone 17", img: "/images/ql-ip17.png", url: "#" },
  { id: 23, name: "Galaxy A", img: "/images/ql-galaxya.png", url: "#" },
  { id: 29, name: "Oppo Reno15", img: "/images/ql-reno15.png", url: "#" },
  { id: 14, name: "Samsung Cũ", img: "/images/ql-ss-cu.png", url: "#" },
  { id: 36, name: "iPad", img: "/images/ql-ipad.png", url: "#" },
  { id: 31, name: "Galaxy Tab S11", img: "/images/ql-tabs11.png", url: "#" },
  { id: 27, name: "Xiaomi 15T 5G", img: "/images/ql-mi15t.png", url: "#" },
  { id: 9, name: "iPhone Cũ giá rẻ", img: "/images/ql-ip-cu.png", url: "#" },
  { id: 47, name: "JBL Flip 7", img: "/images/ql-jbl.png", url: "#" },
  { id: 40, name: "Huawei GT6 46MM", img: "/images/ql-huaweigt6.png", url: "#" },
  { id: 43, name: "AirPods", img: "/images/ql-airpods.png", url: "#" },
  { id: 49, name: "Bình giữ nhiệt", img: "/images/ql-binhgiunhiet.png", url: "#" },
  { id: 32, name: "Macbook Neo", img: "/images/ql-macbook.png", url: "#" },
  { id: 45, name: "Tai nghe chính hãng", img: "/images/ql-tainghe.png", url: "#" },
  { id: 34, name: "Huawei Matepad 11.5s", img: "/images/ql-matepad.png", url: "#" },
  { id: 53, name: "Gia dụng Bear", img: "/images/ql-bear.png", url: "#" },
  { id: 1, name: "Xe máy điện", img: "/images/ql-xemay.png", url: "#" },
  { id: 1, name: "Phụ kiện", img: "/images/ql-phukien.png", url: "#" },
  { id: 1, name: "Lên đời siêu hời", img: "/images/ql-thu-cu.png", url: "#" },
  { id: 37, name: "Vòng đeo tay", img: "/images/ql-vongdeo.png", url: "#" }
];