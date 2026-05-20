/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom'; // Đã import Link
import './ProductSection.scss';

const ProductSection = ({ title, subCategories, products, topBanner, bottomBanners }) => {
  const sliderRef = useRef(null);

  // --- LOGIC: KÉO THẢ CHUỘT (DRAG TO SCROLL) ---
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeftPos(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; 
    sliderRef.current.scrollLeft = scrollLeftPos - walk;
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="product-section">
      <div className="container">
        
        {topBanner && (
          <div className="section-top-banner">
            <img src={topBanner} alt="Khuyến mãi" />
          </div>
        )}

        <div className="category-block">
          
          <div className="block-header">
            {title && <h2 className="category-title">{title}</h2>}
            
            <div className="block-actions">
              <a href="#" className="view-all-btn">Xem tất cả</a>
              
              {subCategories && subCategories.length > 0 && (
                <div className="sub-categories">
                  {subCategories.map((sub, idx) => (
                    <button key={idx} className="sub-cat-btn">{sub}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="slider-wrapper">
            <div 
              className={`product-track ${isDragging ? 'dragging' : ''}`}
              ref={sliderRef} 
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              {products.map((product) => (
                
                // THẺ LINK BAO BỌC TOÀN BỘ SẢN PHẨM ĐỂ CLICK CHUYỂN TRANG
                <Link to={`/product/${product.id}`} className="product-card" key={product.id} style={{ textDecoration: 'none' }}>
                  
                  <div className="card-tags">
                    <span className="tag-installment">Trả góp 0%</span>
                    <span className="tag-discount">⬇ {product.discount || '5%'}</span>
                  </div>

                  <div className="card-image">
                    <img src={product.img || '/images/brand-1.png'} alt={product.name} />
                  </div>

                  <h3 className="card-name">{product.name}</h3>
                  
                  <div className="card-price">
                    <span className="price-new">{product.price}</span>
                    <span className="price-old">{product.oldPrice}</span>
                  </div>

                  <div className="card-promo">
                    <p>15.1 - 28.2 giảm thêm <strong>1tr</strong></p>
                    <p>Thu cũ trợ giá đến <strong>3tr</strong></p>
                  </div>

                  <div className="card-rating">
                    <div className="stars">⭐⭐⭐⭐<span className="star-empty">☆</span></div>
                    <span className="score">{product.rating || '4.00'}</span>
                  </div>

                </Link>

              ))}
            </div>
          </div>
        </div>

        {bottomBanners && (
          <div className="service-banners">
            {bottomBanners.map((img, index) => (
              <div className="service-banner-item" key={index}>
                <img src={img} alt={`Dịch vụ ${index + 1}`} />
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default ProductSection;