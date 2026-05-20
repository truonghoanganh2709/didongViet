/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom'; // Đã import Link
import './BestSellers.scss';

const BestSellers = ({ products }) => {
  const sliderRef = useRef(null);

  // --- LOGIC: KÉO THẢ CHUỘT ---
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
    <section className="best-sellers">
      <div className="container">
        
        <div className="section-header">
          <h2 className="title">SẢN PHẨM BÁN CHẠY NHẤT</h2>
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
            {products.map(product => (
              
              // THẺ LINK BAO BỌC TOÀN BỘ SẢN PHẨM ĐỂ CLICK CHUYỂN TRANG
              <Link to={`/product/${product.id}`} className="product-card" key={product.id} style={{ textDecoration: 'none' }}>
                
                <div className="card-tags">
                  <span className="tag-installment">Trả góp 0%</span>
                  <span className="tag-discount">⬇ {product.discount || '5%'}</span>
                </div>

                <div className="card-image">
                  <img src={product.img} alt={product.name} />
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
                  <div className="stars">
                    ⭐⭐⭐⭐<span className="star-empty">☆</span> 
                  </div>
                  <span className="score">{product.rating || '4.00'}</span>
                </div>
                
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default BestSellers;