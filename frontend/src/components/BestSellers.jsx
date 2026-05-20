import React from 'react'
import './BestSellers.scss'

const BestSellers = () => {
  // Dữ liệu 5 sản phẩm demo
  const products = [
    {
      id: 1,
      name: 'iPhone 17 Pro Max 256GB Chính Hãng',
      img: '/images/bs-1.png',
      newPrice: '36.990.000 ₫',
      oldPrice: '37.990.000 ₫',
      discount: '100%',
      rating: '4.00'
    },
    {
      id: 2,
      name: 'AirPods 4 (Phiên bản chống ồn chủ động)',
      img: '/images/bs-2.png',
      newPrice: '3.090.000 ₫',
      oldPrice: '3.490.000 ₫',
      discount: '3%',
      rating: '4.00'
    },
    {
      id: 3,
      name: 'iPhone 17 256GB Chính Hãng',
      img: '/images/bs-3.png',
      newPrice: '25.490.000 ₫',
      oldPrice: '31.990.000 ₫',
      discount: '5%',
      rating: '4.00'
    },
    {
      id: 4,
      name: 'iPhone 17 Plus 256GB Chính Hãng',
      img: '/images/bs-4.png',
      newPrice: '25.490.000 ₫',
      oldPrice: '31.990.000 ₫',
      discount: '5%',
      rating: '4.00'
    },
    {
      id: 5,
      name: 'Loa Bluetooth Edifier Hecate',
      img: '/images/bs-5.png',
      newPrice: '260.000 ₫',
      oldPrice: '420.000 ₫',
      discount: '7%',
      rating: '4.00'
    }
  ]

  return (
    <section className="best-sellers">
      <div className="container">
        
        {/* Phần Tiêu đề (Đã gỡ bỏ tab Tết) */}
        <div className="section-header">
          <h2 className="title">SẢN PHẨM BÁN CHẠY NHẤT</h2>
        </div>

        {/* Khối danh sách sản phẩm (CSS Grid 5 cột) */}
        <div className="product-grid">
          {products.map(product => (
            <div className="product-card" key={product.id}>
              
              {/* Tag Trả góp & Giảm giá */}
              <div className="card-tags">
                <span className="tag-installment">Trả góp 0%</span>
                <span className="tag-discount">⬇ {product.discount}</span>
              </div>

              {/* Hình ảnh */}
              <div className="card-image">
                <img src={product.img} alt={product.name} />
              </div>

              {/* Tên & Giá */}
              <h3 className="card-name">{product.name}</h3>
              <div className="card-price">
                <span className="price-new">{product.newPrice}</span>
                <span className="price-old">{product.oldPrice}</span>
              </div>

              {/* Hộp Khuyến mãi xám */}
              <div className="card-promo">
                <p>15.1 - 28.2 giảm thêm <strong>1tr</strong></p>
                <p>Thu cũ trợ giá đến <strong>3tr</strong></p>
              </div>

              {/* Đánh giá Sao */}
              <div className="card-rating">
                <div className="stars">
                  ⭐⭐⭐⭐<span className="star-empty">☆</span> 
                </div>
                <span className="score">{product.rating}</span>
              </div>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default BestSellers