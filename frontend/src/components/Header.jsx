import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import { allProducts, trendingKeywords } from '../data/products';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const filteredProducts = allProducts.filter(prod => 
    prod.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5); 

  return (
    <header className="header">
      
      <div className="header-top">
        <div className="container flex-center">
          <span><i className="fa-solid fa-arrows-rotate"></i> Thu Cũ Đổi Mới</span>
          <span><i className="fa-solid fa-money-bill-wave"></i> Trả Trước 0đ Trả Góp 0%</span>
          <span><i className="fa-solid fa-shield-halved"></i> Bảo Hành 100% Đổi Mới</span>
        </div>
      </div>

      <div className="header-main">
        <div className="container header-content">
          
          <div className="logo-box">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h1 className="logo-text">didongviet.vn</h1>
              <p className="slogan">CHUYỂN GIAO GIÁ TRỊ VƯỢT TRỘI</p>
            </Link>
          </div>

          <div 
            className="category-wrapper"
            onMouseEnter={() => setIsCategoryOpen(true)}
            onMouseLeave={() => setIsCategoryOpen(false)}
          >
            <button className="category-btn">
              <i className="fa-solid fa-bars"></i>
              <span>Danh mục</span>
            </button>
            
            {/* Menu thả xuống ĐÃ ĐƯỢC CHỈNH SỬA GIỐNG MENU TRÁI */}
            {isCategoryOpen && (
              <div className="category-dropdown">
                <ul>
                  <li>
                    <Link to="#">
                      <div className="cat-left"><i className="fa-solid fa-mobile-screen icon-blue"></i> Điện thoại</div>
                      <i className="fa-solid fa-chevron-right arrow"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <div className="cat-left"><i className="fa-solid fa-tablet-screen-button icon-cyan"></i> Tablet</div>
                      <i className="fa-solid fa-chevron-right arrow"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <div className="cat-left"><i className="fa-brands fa-apple icon-green"></i> Mac</div>
                      <i className="fa-solid fa-chevron-right arrow"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <div className="cat-left"><i className="fa-solid fa-rotate icon-blue"></i> Máy cũ giá rẻ</div>
                      <i className="fa-solid fa-chevron-right arrow"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <div className="cat-left"><i className="fa-solid fa-plug icon-gray"></i> Phụ kiện</div>
                      <i className="fa-solid fa-chevron-right arrow"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <div className="cat-left"><i className="fa-solid fa-stopwatch icon-purple"></i> Đồng hồ</div>
                      <i className="fa-solid fa-chevron-right arrow"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <div className="cat-left"><i className="fa-solid fa-headphones icon-gray"></i> Âm thanh</div>
                      <i className="fa-solid fa-chevron-right arrow"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <div className="cat-left"><i className="fa-solid fa-tv icon-blue"></i> Điện máy, Gia dụng</div>
                      <i className="fa-solid fa-chevron-right arrow"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <div className="cat-left"><i className="fa-brands fa-apple icon-red"></i> Apple (AAR)</div>
                      <i className="fa-solid fa-chevron-right arrow"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <div className="cat-left"><i className="fa-solid fa-motorcycle icon-red"></i> Xe điện</div>
                      <i className="fa-solid fa-chevron-right arrow"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="search-container">
            <input 
              type="text" 
              placeholder="Bạn muốn tìm gì..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              onBlur={() => setTimeout(() => setIsSearchOpen(false), 300)} 
            />
            <button className="search-btn">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>

            {isSearchOpen && (
              <div className="search-suggestions">
                {searchTerm.trim() === '' ? (
                  <div className="trending-section">
                    <h4>Từ khóa nổi bật</h4>
                    <div className="keywords-list">
                      {trendingKeywords.map((keyword, index) => (
                        <span key={index} className="keyword-item" onClick={() => setSearchTerm(keyword)}>
                          <i className="fa-solid fa-magnifying-glass"></i> {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="live-search-results">
                    {filteredProducts.length === 0 ? (
                      <div className="no-results">
                        <i className="fa-regular fa-face-frown" style={{marginRight: '8px', fontSize: '18px'}}></i>
                        Không tìm thấy sản phẩm nào cho "{searchTerm}"
                      </div>
                    ) : (
                      <div className="product-hints">
                        <h4>Sản phẩm gợi ý</h4>
                        <div className="product-list">
                          {filteredProducts.map((prod, index) => (
                            <Link to={`/product/${prod.id}`} key={index} className="hint-product-item" style={{ textDecoration: 'none' }}>
                              <img src={prod.img} alt={prod.name} />
                              <div className="prod-info">
                                <p className="prod-name">{prod.name}</p>
                                <p className="prod-price">{prod.price}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="header-utils">
            <div className="util-item">
              <i className="fa-solid fa-phone"></i>
              <div className="util-text">
                <span>Đặt hàng</span>
                <strong>1800 6018</strong>
              </div>
            </div>
            <div className="util-item">
              <i className="fa-solid fa-store"></i>
              <div className="util-text">
                <span>Cửa hàng</span>
                <span>gần bạn</span>
              </div>
            </div>
            <div className="util-item">
              <i className="fa-solid fa-truck-fast"></i>
              <div className="util-text">
                <span>Tra cứu</span>
                <span>đơn hàng</span>
              </div>
            </div>
            <div className="util-item">
              <i className="fa-solid fa-percent"></i>
              <div className="util-text">
                <span>Khuyến</span>
                <span>mãi</span>
              </div>
            </div>
            <Link to="#" className="util-item" style={{ textDecoration: 'none', color: 'inherit' }}>
              <i className="fa-solid fa-cart-shopping"></i>
              <div className="util-text">
                <span>Giỏ</span>
                <span>hàng</span>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;