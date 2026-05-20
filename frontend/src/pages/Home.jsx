import React from 'react';
import HeroSection from '../components/HeroSection';
import QuickLinks from '../components/QuickLinks';
import BestSellers from '../components/BestSellers';
import ProductSection from '../components/ProductSection';
import Footer from '../components/Footer';

// IMPORT KHO DỮ LIỆU TỔNG VÀO ĐỂ PHÂN PHÁT
import { allProducts } from '../data/products';

const Home = () => {
  // --- THUẬT TOÁN LỌC SẢN PHẨM CHO TỪNG KHỐI GIAO DIỆN ---
  
  // 1. Lọc sản phẩm Bán Chạy Nhất (Món nào có flag isBestSeller là true)
  const bestSellerProducts = allProducts.filter(prod => prod.isBestSeller === true);

  // 2. Lọc danh sách Điện thoại iPhone
  const iphoneProducts = allProducts.filter(prod => prod.category === 'apple');

  // 3. Lọc danh sách Điện thoại Samsung
  const samsungProducts = allProducts.filter(prod => prod.category === 'samsung');

  // 4. Lọc danh sách Android khác (OPPO, Xiaomi, TECNO...)
  const androidProducts = allProducts.filter(prod => prod.category === 'android');

  // 5. Lọc danh sách MacBook & Tablet
  const laptopTabletProducts = allProducts.filter(prod => prod.category === 'tablet-laptop');

  // 6. Lọc danh sách Đồng Hồ Thông Minh
  const watchProducts = allProducts.filter(prod => prod.category === 'watch');

  // 7. Lọc danh sách Thiết bị Âm Thanh (Tai nghe, Loa)
  const audioProducts = allProducts.filter(prod => prod.category === 'audio');

  // 8. Lọc danh sách Đồ Gia Dụng
  const homeProducts = allProducts.filter(prod => prod.category === 'home');

  return (
    <div className="home-page">
      {/* Khối Banner lớn */}
      <HeroSection />

      {/* Khối các icon chuyển hướng nhanh */}
      <QuickLinks />

      {/* KHỐI 1: Sản phẩm bán chạy nhất (Truyền data đã lọc qua props) */}
      <BestSellers products={bestSellerProducts} />

      {/* KHỐI 2: Điện thoại iPhone Chính Hãng */}
      <ProductSection 
        title="Điện thoại iPhone" 
        subCategories={["iPhone 17 Series", "iPhone Air", "iPhone 16 Series", "iPhone 15 Series"]}
        products={iphoneProducts} 
      />

      {/* KHỐI 3: Điện thoại Samsung Chính Hãng */}
      <ProductSection 
        title="Điện thoại Samsung" 
        subCategories={["Galaxy S", "Galaxy Z", "Galaxy A", "Galaxy M"]}
        products={samsungProducts} 
      />

      {/* KHỐI 4: OPPO | Xiaomi | TECNO | realme | HONOR Chính Hãng */}
      <ProductSection 
        title="OPPO | Xiaomi | TECNO | realme | HONOR" 
        subCategories={["OPPO", "Xiaomi", "TECNO", "Realme", "Honor"]}
        products={androidProducts} 
      />

      {/* KHỐI 5: MacBook & Tablet */}
      <ProductSection 
        title="MacBook & Tablet" 
        products={laptopTabletProducts} 
      />

      {/* KHỐI 6: Đồng Hồ Thông Minh */}
      <ProductSection 
        title="Đồng Hồ Thông Minh" 
        products={watchProducts} 
      />

      {/* KHỐI 7: Âm Thanh */}
      <ProductSection 
        title="Âm Thanh" 
        products={audioProducts} 
      />

      {/* KHỐI 8: Đồ Gia Dụng */}
      <ProductSection 
        title="Đồ Gia Dụng" 
        products={homeProducts} 
      />
    </div>
  );
};

export default Home;