import React from 'react'
import './Footer.scss'

const Footer = () => {
  return (
    <footer className="footer">
      {/* PHẦN 1: THÔNG TIN CHÍNH (NỀN TRẮNG) */}
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            
            {/* Cột 1: Về chúng tôi */}
            <div className="footer-col">
              <h4 className="footer-title">Về chúng tôi</h4>
              <ul className="footer-links">
                <li>Giới thiệu về công ty</li>
                <li>Liên hệ hợp tác kinh doanh (B2B)</li>
                <li>Ưu đãi dành cho giáo dục</li>
                <li>Danh sách cửa hàng</li>
                <li>Tuyển dụng mới nhất</li>
                <li>Hướng dẫn mua hàng online</li>
                <li>Hướng dẫn mua trả góp</li>
                <li>Hướng dẫn thanh toán VN Pay</li>
              </ul>
            </div>

            {/* Cột 2: Chính sách */}
            <div className="footer-col">
              <h4 className="footer-title">Chính sách</h4>
              <ul className="footer-links">
                <li>Chính sách bảo hành</li>
                <li>Chính sách bán hàng</li>
                <li>Chính sách bảo mật</li>
                <li>Chính sách kiểm hàng</li>
                <li>Trung tâm bảo hành apple tại VN</li>
              </ul>
            </div>

            {/* Cột 3: Tổng đài & Thanh toán */}
            <div className="footer-col">
              <h4 className="footer-title">Tổng đài hỗ trợ miễn phí</h4>
              <div className="hotline-box">
                <p>Mua ngay: <strong>1800.6018</strong> <span>(07:30 - 21:30)</span></p>
                <p>Bảo hành tại Viện Di Động: <strong>1800.6018</strong> <span>(08:00 - 21:00)</span></p>
                <p>Góp ý: <strong>1800.6018</strong> <span>(08:30 - 21:30)</span></p>
              </div>

              <h4 className="footer-title mt-20">Phương thức thanh toán</h4>
              <div className="payment-methods">
                {/* Bạn thay link ảnh thật vào đây */}
                <img src="/images/pay-1.png" alt="ZaloPay" />
                <img src="/images/pay-2.png" alt="VNPAY" />
                <img src="/images/pay-3.png" alt="Momo" />
                <img src="/images/pay-4.png" alt="OnePay" />
              </div>
            </div>

            {/* Cột 4: Kết nối & Tải app */}
            <div className="footer-col">
              <h4 className="footer-title">Kết nối với Di Động Việt</h4>
              <div className="social-icons">
                <img src="/images/social-zalo.png" alt="Zalo" />
                <img src="/images/social-fb.png" alt="Facebook" />
                <img src="/images/social-ig.png" alt="Instagram" />
                <img src="/images/social-yt.png" alt="Youtube" />
                <img src="/images/social-tt.png" alt="Tiktok" />
              </div>

              <h4 className="footer-title mt-20">Đối tác với Di Động Việt</h4>
              <div className="partners">
                <img src="/images/partner-1.png" alt="Viện Di Động" />
                <img src="/images/partner-2.png" alt="Vertu" />
              </div>

              <p className="download-text">Tải ngay ứng dụng để nhận được nhiều ưu đãi</p>
              <div className="download-app">
                <img src="/images/qr-code.png" alt="QR Code" className="qr-img" />
                <div className="app-buttons">
                  <img src="/images/app-store.png" alt="App Store" />
                  <img src="/images/google-play.png" alt="Google Play" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* PHẦN 2: SEO & BẢN QUYỀN (NỀN XÁM) */}
      <div className="footer__bottom">
        <div className="container">
          
          {/* Lưới Từ khóa SEO */}
          <div className="seo-grid">
            <div className="seo-col">
              <p>Điện thoại iPhone</p>
              <p>iPhone 17 | iPhone Air</p>
              <p>iPhone 16</p>
            </div>
            <div className="seo-col">
              <p>Điện thoại Samsung Galaxy</p>
              <p>Samsung Galaxy S25</p>
              <p>Samsung Z Fold 7 | Samsung Z Flip 7</p>
            </div>
            <div className="seo-col">
              <p>Điện thoại Xiaomi | Điện thoại Oppo</p>
              <p>Điện thoại Realme | Điện thoại Tecno</p>
              <p>Xiaomi 15</p>
            </div>
            <div className="seo-col">
              <p>MacBook | MacBook Pro | MacBook Air</p>
              <p>Máy tính bảng iPad</p>
              <p>Tai nghe Airpods</p>
            </div>
          </div>

          <hr className="footer-divider" />

          {/* Thông tin công ty & Chứng nhận */}
          <div className="company-info">
            <div className="info-text">
              <p>Công Ty Cổ Phần Công Nghệ Di Động Việt - 77 Trần Quang Khải, P. Tân Định, TP. Hồ Chí Minh. Mã số doanh nghiệp: 0312193244, nơi cấp: Sở Tài chính thành phố Hồ Chí Minh.</p>
              <p>MST: 0312193244. Đại diện theo pháp luật: Nguyễn Ngọc Đạt - Điện thoại: 1800.6018 (miễn phí) - Email: lienhe@didongviet.vn - Bản quyền thuộc về Di Động Việt.</p>
            </div>
            <div className="certificates">
              <img src="/images/cert-1.png" alt="NCSC" />
              <img src="/images/cert-2.png" alt="DMCA" />
              <img src="/images/cert-3.png" alt="Bo Cong Thuong" />
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer