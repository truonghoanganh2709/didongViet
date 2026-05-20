import React from 'react'
// Import thư viện Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './HeroSection.scss'

const HeroSection = () => {
  const categories = [
    { icon: '📱', name: 'Điện thoại' },
    { icon: '💻', name: 'Tablet' },
    { icon: '🍏', name: 'Mac' },
    { icon: '🔁', name: 'Máy cũ giá rẻ' },
    { icon: '🔌', name: 'Phụ kiện' },
    { icon: '⌚', name: 'Đồng hồ' },
    { icon: '🎧', name: 'Âm thanh' },
    { icon: '📺', name: 'Điện máy, Gia dụng' },
    { icon: '🍎', name: 'Apple (AAR)' },
    { icon: '🚲', name: 'Xe điện' },
    { icon: '🖥️', name: 'Màn hình, Tivi' },
    { icon: '🔄', name: 'Thu cũ đổi mới' },
    { icon: '🏷️', name: 'Khuyến mãi' },
    { icon: '📰', name: 'Công nghệ 24H' },
  ]

  // Mình để sẵn 3 link ảnh online thật cho bạn test, sau này bạn có thể thay bằng ảnh tải từ Figma về
  const mainBanners = [
    "/images/banner-1.jpg", // Ảnh 1: Mua lần đầu
    "/images/banner-2.jpg", // Ảnh 2: Đời mới nhất
    "/images/banner-3.jpg"  // Ảnh 3: Samsung Galaxy
  ]

  return (
    <section className="hero">
      <div className="container hero__wrapper">
        
        {/* CỘT 1: SIDEBAR */}
        <div className="hero__sidebar">
          <ul>
            {categories.map((item, index) => (
              <li key={index}>
                <div className="menu-item-left">
                  <span className="icon">{item.icon}</span>
                  <span className="text">{item.name}</span>
                </div>
                <span className="arrow">›</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CỘT 2: BANNER TRƯỢT CHÍNH GIỮA */}
        <div className="hero__main-banner">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation // Nút mũi tên trái phải
            pagination={{ clickable: true }} // Dấu chấm tròn ở dưới
            autoplay={{ delay: 3000, disableOnInteraction: false }} // Tự trượt sau 3s
            loop={true} // Lặp lại vô tận
            className="main-swiper"
          >
            {mainBanners.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt={`Banner ${index + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* CỘT 3: 3 BANNER NHỎ BÊN PHẢI */}
        <div className="hero__sub-banners">
          <div className="sub-banner">
             <img src="/images/sub-banner-1.jpg" alt="Thu cũ lên đời" />
          </div>
          <div className="sub-banner">
             <img src="/images/sub-banner-2.jpg" alt="Galaxy S26 Ultra" />
          </div>
          <div className="sub-banner">
             <img src="/images/sub-banner-3.jpg" alt="Redmi Note 15" />
          </div>
        </div>

      </div>
    </section>
  )
}

export default HeroSection