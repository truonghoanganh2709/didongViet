import React from 'react'
import HeroSection from '../components/HeroSection'
import QuickLinks from '../components/QuickLinks'
import BestSellers from '../components/BestSellers'
import ProductSection from '../components/ProductSection'
import Footer from '../components/Footer'

const Home = () => {
  // 1. Data mẫu cho 1 ô sản phẩm
  const sampleProduct = {
    img: '/images/brand-1.png',
    name: 'Sản phẩm chính hãng',
    newPrice: '25.490.000 ₫',
    oldPrice: '31.990.000 ₫',
    discount: '5%',
    rating: '4.00'
  }

  // 2. Data cho Khối Điện thoại
  const phoneBlocks = [
    { title: "iPhone Chính Hãng (Apple Authorized Reseller)", products: Array(5).fill({ ...sampleProduct, name: 'iPhone 17 Pro Max 256GB' }) },
    { title: "Samsung Chính Hãng", products: Array(5).fill({ ...sampleProduct, name: 'Samsung Galaxy Z Fold7' }) },
    { title: "OPPO | Xiaomi | TECNO | realme | HONOR Chính Hãng", products: Array(5).fill({ ...sampleProduct, name: 'Xiaomi Redmi Note 15' }) }
  ]

  // 3. Data cho Khối Máy tính & Đồng hồ
  const gadgetBlocks = [
    { title: "MacBook & Tablet", products: Array(5).fill({ ...sampleProduct, name: 'MacBook Air M4 13-inch' }) },
    { title: "Đồng Hồ Thông Minh", products: Array(5).fill({ ...sampleProduct, name: 'Apple Watch Series 11' }) }
  ]

  // 4. Data cho Khối Âm thanh & Gia dụng
  const accessoryBlocks = [
    { title: "Âm Thanh", products: Array(5).fill({ ...sampleProduct, name: 'Tai nghe Bluetooth AirPods 4' }) },
    { title: "Đồ Gia Dụng", products: Array(5).fill({ ...sampleProduct, name: 'Nồi chiên không dầu Bear' }) }
  ]

  // 5. Data Banner dịch vụ
  const serviceBanners = [
    "/images/bot-banner-1.png",
    "/images/bot-banner-2.png",
    "/images/bot-banner-3.png",
    "/images/bot-banner-4.png"
  ]

  return (
    <div className="home-page">
      <HeroSection />
      <QuickLinks />
      <BestSellers />
      
      <ProductSection blocks={phoneBlocks} />
      
      <ProductSection 
        topBanner="/images/promo-banner.png" 
        blocks={gadgetBlocks} 
      />
      
      <ProductSection 
        topBanner="/images/promo-banner-2.png" 
        blocks={accessoryBlocks} 
        bottomBanners={serviceBanners}
      />

      <Footer />
    </div>
  )
}

export default Home