import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container">
        
        {/* --- TẦNG 1: 4 CỘT THÔNG TIN CHÍNH --- */}
        <div className="footer-top">
          
          {/* Cột 1 */}
          <div className="footer-col">
            <h4>Về chúng tôi</h4>
            <ul>
              <li><Link to="#">Giới thiệu về công ty</Link></li>
              <li><Link to="#">Khách hàng Doanh nghiệp (B2B)</Link></li>
              <li><Link to="#">Ưu đãi dành cho giáo dục</Link></li>
              <li><Link to="#">Danh sách cửa hàng</Link></li>
              <li><Link to="#">Tuyển dụng mới nhất</Link></li>
              <li><Link to="#">Hướng dẫn mua hàng Online</Link></li>
              <li><Link to="#">Hướng dẫn mua hàng trả góp</Link></li>
              <li><Link to="#">Hướng dẫn thanh toán VNPAY</Link></li>
            </ul>
          </div>

          {/* Cột 2 */}
          <div className="footer-col">
            <h4>Chính sách</h4>
            <ul>
              <li><Link to="#">Chính sách bảo hành</Link></li>
              <li><Link to="#">Chính sách bán hàng</Link></li>
              <li><Link to="#">Chính sách bảo mật</Link></li>
              <li><Link to="#">Chính sách kiểm hàng</Link></li>
              <li><Link to="#">Trung tâm bảo hành Apple tại Việt Nam</Link></li>
            </ul>
          </div>

          {/* Cột 3 */}
          <div className="footer-col">
            <h4>Tổng đài hỗ trợ (Miễn phí)</h4>
            <ul className="hotline-list">
              <li>Mua ngay: <strong>1800.6018</strong> (07:30 - 21:30)</li>
              <li>Bảo hành tại Viện Di Động: <strong>1800.6729</strong> (08:00 - 21:00)</li>
              <li>Góp ý: <strong>1800.6306</strong> (08:30 - 21:30)</li>
            </ul>
            
            <h4 className="mt-15">Phương thức thanh toán</h4>
            <div className="payment-methods">
              {/* Dùng ảnh placeholder cho các logo thanh toán */}
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/200px-Mastercard_2019_logo.svg.png" alt="Mastercard" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/200px-Visa.svg.png" alt="Visa" />
              <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="MoMo" />
              <img src="https://upload.wikimedia.org/wikipedia/vi/7/77/ZaloPay_Logo.png" alt="ZaloPay" />
              <img src="https://vnpay.vn/s1/statics.vnpay.vn/2023/9/06ncktiwd6dc1694418189874.png" alt="VNPAY" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Apple_Pay_logo.svg/512px-Apple_Pay_logo.svg.png" alt="Apple Pay" />
            </div>
          </div>

          {/* Cột 4 */}
          <div className="footer-col">
            <h4>Kết nối với Di Động Việt</h4>
            <div className="social-links">
              <a href="#" className="social-icon zalo"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/512px-Icon_of_Zalo.svg.png" alt="Zalo"/></a>
              <a href="#" className="social-icon fb"><i className="fa-brands fa-facebook"></i></a>
              <a href="#" className="social-icon ig"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="social-icon yt"><i className="fa-brands fa-youtube"></i></a>
              <a href="#" className="social-icon tt"><i className="fa-brands fa-tiktok"></i></a>
            </div>

            <h4 className="mt-15">Đối tác Di Động Việt</h4>
            <div className="partners">
              <div className="partner-box">Viện Di Động</div>
              <div className="partner-box">VERTU</div>
            </div>

            <h4 className="mt-15">Tải ngay ứng dụng nhận nhiều ưu đãi</h4>
            <div className="app-download">
              <div className="qr-code">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" alt="QR Code" />
              </div>
              <div className="app-buttons">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png" alt="App Store" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png" alt="Google Play" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- TẦNG 2: DANH MỤC SEO (MÀU XÁM) --- */}
      <div className="footer-middle">
        <div className="container">
          <div className="seo-links-grid">
            <div className="seo-col">
              <Link to="#">Điện thoại iPhone</Link>
              <Link to="#">iPhone 17</Link> | <Link to="#">iPhone Air</Link>
              <Link to="#">iPhone 16</Link>
            </div>
            <div className="seo-col">
              <Link to="#">Điện thoại Samsung Galaxy</Link>
              <Link to="#">Samsung Galaxy S25</Link>
              <Link to="#">Samsung Z Fold 7</Link> | <Link to="#">Samsung Z Flip 7</Link>
            </div>
            <div className="seo-col">
              <Link to="#">Điện thoại Xiaomi</Link> | <Link to="#">Điện thoại Oppo</Link>
              <Link to="#">Điện thoại Realme</Link> | <Link to="#">Điện thoại Tecno</Link>
              <Link to="#">Xiaomi 15</Link>
            </div>
            <div className="seo-col">
              <Link to="#">MacBook</Link> | <Link to="#">MacBook Pro</Link> | <Link to="#">MacBook Air</Link>
              <Link to="#">Máy tính bảng iPad</Link>
              <Link to="#">Tai nghe AirPods</Link>
            </div>
          </div>
        </div>
      </div>

      {/* --- TẦNG 3: THÔNG TIN PHÁP LÝ CÔNG TY --- */}
      <div className="footer-bottom">
        <div className="container">
          <div className="company-info-wrap">
            <div className="company-text">
              <p>Công Ty Cổ phần Công Nghệ Di Động Việt - 77 Trần Quang Khải, P. Tân Định, TP. Hồ Chí Minh. Mã số doanh nghiệp: 0312193244, nơi cấp: Sở Tài chính thành phố Hồ Chí Minh.</p>
              <p>MST: 0312193244. Đại diện theo pháp luật: Nguyễn Ngọc Đạt - Điện thoại: 1800.6018 (miễn phí) - Email: lienhe@didongviet.vn - Bản quyền thuộc về Di Động Việt.</p>
            </div>
            <div className="company-badges">
              <img src="https://images.dmca.com/Badges/dmca-badge-w100-5x1-11.png?ID=2b95fae2-eb06-4444-a15d-85ceb520cf67" alt="DMCA" />
              <img src="https://theme.hstatic.net/1000026716/1000440777/14/logo-bct.png?v=37233" alt="Bộ Công Thương" style={{height: '35px', width: 'auto'}}/>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;