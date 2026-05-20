import React from 'react'
import './ProductSection.scss'

const ProductSection = ({ topBanner, blocks, bottomBanners }) => {
  return (
    <section className="product-section">
      <div className="container">
        
        {/* 1. Banner ngang phía trên cùng (Nếu truyền vào thì mới hiện) */}
        {topBanner && (
          <div className="section-top-banner">
            <img src={topBanner} alt="Khuyến mãi" />
          </div>
        )}

        {/* 2. Danh sách các khối sản phẩm (Vừa chạy được Apple, Samsung, vừa chạy được Đồng hồ, Gia dụng...) */}
        {blocks && blocks.map((block, bIndex) => (
          <div className="category-block" key={bIndex}>
            <h2 className="category-title">{block.title}</h2>
            
            <div className="product-grid">
              {block.products && block.products.map((product, pIndex) => (
                <div className="product-card" key={pIndex}>
                  <div className="card-tags">
                    <span className="tag-installment">Trả góp 0%</span>
                    <span className="tag-discount">⬇ {product.discount || '5%'}</span>
                  </div>

                  <div className="card-image">
                    <img src={product.img || '/images/brand-1.png'} alt={product.name} />
                  </div>

                  <h3 className="card-name">{product.name}</h3>
                  <div className="card-price">
                    <span className="price-new">{product.newPrice}</span>
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
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* 3. Khối 4 Banner dịch vụ dọc ở cuối cùng (Nếu truyền vào thì mới hiện) */}
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
  )
}

export default ProductSection