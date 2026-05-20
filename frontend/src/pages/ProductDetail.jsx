import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductDetail.scss';
import { allProducts } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const product = allProducts.find(p => p.id === Number(id));

  const similarProducts = product 
    ? allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 5)
    : [];

  const [activeImage, setActiveImage] = useState('');
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');

  const getProductVariants = () => {
    if (!product) return { options1: [], options2: [] };
    const cat = product.category;
    let options1 = []; 
    let options2 = []; 

    if (cat === 'apple' || cat === 'samsung' || cat === 'android') {
      options1 = ['128GB', '256GB', '512GB', '1TB'];
      options2 = ['Titan Tự Nhiên', 'Đen Huyền Bí', 'Trắng Tinh Khôi', 'Vàng Gold'];
    } else if (cat === 'tablet-laptop') {
      options1 = ['256GB', '512GB', '1TB'];
      options2 = ['Xám Không Gian', 'Bạc Thời Thượng'];
    } else if (cat === 'watch') {
      options1 = ['40mm', '42mm', '44mm'];
      options2 = ['Đen Thể Thao', 'Bạc Ánh Kim', 'Vàng Hồng'];
    } else if (cat === 'audio') {
      options1 = ['Phiên bản Tiêu Chuẩn', 'Phiên bản Chống Ồn ANC'];
      options2 = ['Trắng Ngọc Trai', 'Đen Nhám'];
    } else {
      options1 = ['Bản Tiêu Chuẩn', 'Bản Đa Năng Pro'];
      options2 = ['Màu Kem Sữa', 'Xanh Mint'];
    }
    return { options1, options2 };
  };

  const { options1, options2 } = getProductVariants();

  useEffect(() => {
    window.scrollTo(0, 0); 
    if (product) {
      if (product.thumbnails && product.thumbnails.length > 0) {
        setActiveImage(product.thumbnails[0]);
      } else {
        setActiveImage(product.img);
      }
      if (options1.length > 0) setSelectedOption1(options1[0]);
      if (options2.length > 0) setSelectedOption2(options2[0]);
    }
  }, [product, id]);

  if (!product) {
    return (
      <div style={{ padding: '100px', textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>
        Sản phẩm này không tồn tại hoặc đã bị gỡ khỏi hệ thống dữ liệu!
      </div>
    );
  }

  const getBrandName = () => {
    const nameUpper = product.name.toUpperCase();
    if (nameUpper.includes('IPHONE') || nameUpper.includes('APPLE') || nameUpper.includes('MACBOOK') || nameUpper.includes('IPAD') || nameUpper.includes('AIRPODS')) return 'Apple';
    if (nameUpper.includes('SAMSUNG') || nameUpper.includes('GALAXY')) return 'Samsung';
    if (nameUpper.includes('XIAOMI') || nameUpper.includes('REDMI')) return 'Xiaomi';
    if (nameUpper.includes('OPPO')) return 'OPPO';
    if (nameUpper.includes('BEAR')) return 'Bear';
    if (nameUpper.includes('PHILIPS')) return 'Philips';
    if (nameUpper.includes('HUAWEI')) return 'Huawei';
    if (nameUpper.includes('TECNO')) return 'TECNO';
    if (nameUpper.includes('GARMIN')) return 'Garmin';
    if (nameUpper.includes('MARSHALL')) return 'Marshall';
    if (nameUpper.includes('JBL')) return 'JBL';
    return 'Chính Hãng';
  };

  const brand = getBrandName();

  return (
    <div className="product-detail-page">
      <div className="container">
        
        <div className="breadcrumb">
          <span>Trang chủ</span> / <span>Danh mục</span> / <span className="active">{product.name}</span>
        </div>

        <h1 className="product-title">{product.name}</h1>

        <div className="detail-body">
          <div className="left-column">
            <div className="image-gallery">
              <div className="main-image">
                <img src={activeImage} alt={product.name} />
              </div>
              <div className="thumbnail-list">
                {product.thumbnails && product.thumbnails.map((thumb, index) => (
                  <div 
                    key={index} 
                    className={`thumb-item ${activeImage === thumb ? 'active' : ''}`} 
                    onClick={() => setActiveImage(thumb)}
                  >
                    <img src={thumb} alt={`${product.name} thumb ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="product-info-box">
              <h3>Thông tin sản phẩm</h3>
              <ul>
                <li>
                  <i className="fa-solid fa-box"></i> 
                  <div><strong>Hàng chính hãng {brand} Việt Nam.</strong> <br/>Di Động Việt là hệ thống ủy quyền phân phối chính thức các dòng sản phẩm {brand} chất lượng cao.</div>
                </li>
                <li>
                  <i className="fa-solid fa-mobile-screen"></i> 
                  <div><strong>Bộ sản phẩm bao gồm:</strong> Thân máy thiết bị tiêu chuẩn, Hộp đựng máy, Cáp kết nối truyền tải dữ liệu, Cây lấy khay sim, Sách hướng dẫn sử dụng chi tiết từ nhà sản xuất.</div>
                </li>
                <li>
                  <i className="fa-solid fa-shield-halved"></i> 
                  <div><strong>Chính sách độc quyền ưu đãi:</strong> Bảo hành Hư lỗi - Hỗ trợ Đổi mới thiết bị trong vòng 33 ngày đầu tiên. Bảo hành sửa chữa chính hãng 12 tháng.</div>
                </li>
              </ul>
            </div>
          </div>

          <div className="right-column">
            <div className="variants-box">
              {options1.length > 0 && (
                <div className="variant-row">
                  {options1.map(opt => (
                    <button 
                      key={opt} 
                      className={`var-btn ${selectedOption1 === opt ? 'active' : ''}`}
                      onClick={() => setSelectedOption1(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
              {options2.length > 0 && (
                <div className="variant-row">
                  {options2.map(color => (
                    <button 
                      key={color} 
                      className={`var-btn ${selectedOption2 === color ? 'active' : ''}`}
                      onClick={() => setSelectedOption2(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="price-box">
              <p className="price-label">Giá bán ưu đãi thời điểm hiện tại từ:</p>
              <div className="price-wrap">
                <span className="current-price">{product.price}</span>
                <span className="old-price">{product.oldPrice}</span>
              </div>
            </div>

            <div className="promo-box">
              <h3 className="promo-title">Chương trình Khuyến mãi đi kèm</h3>
              <p className="promo-note">Mức giá ưu đãi áp dụng kèm quà tặng đi kèm có thể kết thúc sớm hơn dự kiến ban đầu</p>
              <ul className="promo-list">
                <li><strong>1. Gói ưu đãi chào xuân: Tết Đủ Đầy</strong>
                  <ul>
                    <li>Áp dụng gói Combo mua kèm phụ kiện cao cấp giảm giá trực tiếp thêm <strong className="red">1.000.000đ</strong>.</li>
                  </ul>
                </li>
                <li><strong>2. Đặc quyền dịch vụ mua sắm tại cửa hàng:</strong>
                  <ul>
                    <li>Hỗ trợ chương trình Thu cũ đổi mới - Trợ giá nâng đời thiết bị lên tới mức tối đa <strong className="red">4.000.000đ</strong></li>
                    <li>Chiết khấu giảm trừ trực tiếp thêm ngay <strong className="red">200.000đ</strong> khi chuyển khoản.</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="action-buttons">
              <button className="btn-buy-now">
                <strong>MUA NGAY SẢN PHẨM</strong>
                <span>Hỗ trợ dịch vụ giao hàng nhanh tận nơi hoặc nhận trực tiếp thiết bị</span>
              </button>
              <div className="btn-group">
                <button className="btn-installment">
                  <strong>TRẢ GÓP 0% QUA THẺ</strong>
                  <span>Hỗ trợ các dòng thẻ thanh toán quốc tế Visa, MasterCard, JCB, Amex</span>
                </button>
                <button className="btn-finance">
                  <strong>TRẢ GÓP KINH TẾ 0%</strong>
                  <span>Hồ sơ xét duyệt trực tuyến đơn giản chỉ trong vòng 5 phút</span>
                </button>
              </div>
            </div>

            <div className="extra-offers">
              <h3>Các cổng ưu đãi đối tác liên kết</h3>
              <ul>
                <li><img src="https://upload.wikimedia.org/wikipedia/vi/7/77/ZaloPay_Logo.png" alt="đối tác zalopay"/> <div>Giảm thêm chiết khấu <strong>1% giá trị hóa đơn (tối đa 300.000đ)</strong> qua ứng dụng ZaloPay.</div></li>
                <li><img src="https://vnpay.vn/s1/statics.vnpay.vn/2023/9/06ncktiwd6dc1694418189874.png" alt="đối tác vnpay"/> <div>Tặng mã giảm trừ <strong>500.000đ</strong> cho đơn hàng trên 10 triệu đồng qua cổng VNPAY-QR.</div></li>
              </ul>
            </div>
          </div>
        </div>

        {/* --- KHỐI THÔNG SỐ KỸ THUẬT (ĐÃ CHIA 2 CỘT) --- */}
        {product.specs && (
          <div className="technical-specs-section">
            <h2 className="specs-title">Thông số kỹ thuật</h2>
            <div className="specs-table-two-cols">
              
              {/* CỘT BÊN TRÁI: Chứa 4 nhóm đầu tiên */}
              <div className="specs-col">
                {product.specs.slice(0, 4).map((group, idx) => (
                  <div className="spec-group" key={`left-${idx}`}>
                    <h3 className="group-name">{group.group}</h3>
                    <ul className="group-items">
                      {group.items.map((item, i) => (
                        <li className="spec-item" key={i}>
                          <span className="spec-name">{item.name}</span>
                          <span className="spec-value">{item.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* CỘT BÊN PHẢI: Chứa các nhóm từ vị trí thứ 5 trở đi */}
              <div className="specs-col">
                {product.specs.slice(4).map((group, idx) => (
                  <div className="spec-group" key={`right-${idx}`}>
                    <h3 className="group-name">{group.group}</h3>
                    <ul className="group-items">
                      {group.items.map((item, i) => (
                        <li className="spec-item" key={i}>
                          <span className="spec-name">{item.name}</span>
                          <span className="spec-value">{item.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* --- KHỐI SẢN PHẨM TƯƠNG TỰ --- */}
        {similarProducts.length > 0 && (
          <div className="similar-products-section">
            <h2 className="similar-title">Sản phẩm tương tự</h2>
            <div className="similar-grid">
              {similarProducts.map((item) => (
                <Link to={`/product/${item.id}`} className="similar-card" key={item.id} style={{ textDecoration: 'none' }}>
                  <div className="card-tags">
                    <span className="tag-installment">Trả góp 0%</span>
                    <span className="tag-discount">⬇ {item.discount || '5%'}</span>
                  </div>
                  <div className="card-image">
                    <img src={item.img} alt={item.name} />
                  </div>
                  <h3 className="card-name">{item.name}</h3>
                  <div className="card-price">
                    <span className="price-new">{item.price}</span>
                    <span className="price-old">{item.oldPrice}</span>
                  </div>
                  <div className="card-promo">
                    <p>Trả góp <strong>0%</strong> lãi suất</p>
                    <p>D.Member giảm thêm đến <strong>1%</strong></p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetail;