import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'

const Header = () => {
  // ĐÂY LÀ "CÔNG TẮC": Quản lý trạng thái Ẩn/Hiện của menu
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Hàm này sẽ chạy khi bạn bấm vào nút Danh mục
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

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

  return (
    <header className="header">
      {/* Thanh đỏ phụ ở trên cùng */}
      <div className="header__top">
        <div className="container">
          <span>🔄 Thu Cũ Đổi Mới</span>
          <span>💲 Trả Trước 0đ Trả Góp 0%</span>
          <span>🛡️ Bảo Hành 100% Đổi Mới</span>
        </div>
      </div>

      {/* Thanh đỏ chính */}
      <div className="header__main">
        <div className="container header__main-content">
          
          {/* 1. Logo */}
          <div className="logo">
            <Link to="/">
              <span className="logo-main">didongviet.vn</span>
              <span className="logo-sub">CHUYỂN GIAO GIÁ TRỊ VƯỢT TRỘI</span>
            </Link>
          </div>

          {/* 2. KHU VỰC DANH MỤC */}
          <div className="category-area">
            {/* Nút bấm đã được gắn sự kiện onClick */}
            <button 
              className={`btn-category ${isMenuOpen ? 'active' : ''}`} 
              onClick={toggleMenu}
            >
              <span className="icon">🎛️</span>
              <span className="text">Danh mục</span>
            </button>

            {/* Bảng Menu xổ xuống (Chỉ hiện ra khi isMenuOpen == true) */}
            {isMenuOpen && (
              <div className="header__dropdown-menu">
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
            )}
          </div>
          
          {/* 3. Thanh tìm kiếm */}
          <div className="search-bar">
            <input type="text" placeholder="Bạn muốn tìm gì..." />
            <button className="search-btn">🔍</button>
          </div>
          
          {/* 4. Cụm 5 nút tiện ích */}
          <div className="header-actions">
            <div className="action-item">
              <span className="action-icon">📞</span>
              <div className="action-text">
                <span>Đặt hàng</span>
                <span className="sub-text">1800 6018</span>
              </div>
            </div>

            <div className="action-item">
              <span className="action-icon">🏪</span>
              <div className="action-text">
                <span>Cửa hàng</span>
                <span className="sub-text">gần bạn</span>
              </div>
            </div>

            <div className="action-item">
              <span className="action-icon">📋</span>
              <div className="action-text">
                <span>Tra cứu</span>
                <span className="sub-text">đơn hàng</span>
              </div>
            </div>

            <div className="action-item">
              <span className="action-icon">🎫</span>
              <div className="action-text">
                <span>Khuyến mãi</span>
              </div>
            </div>

            <div className="action-item">
              <span className="action-icon">🛒</span>
              <div className="action-text">
                <span>Giỏ hàng</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header