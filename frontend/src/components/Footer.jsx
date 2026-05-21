import './Footer.scss'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="container footer__grid">
          <div className="footer-col">
            <h4>MobiZone</h4>
            <p>Website demo bán điện thoại, laptop, tablet và phụ kiện công nghệ.</p>
            <p>Không sử dụng logo hoặc tài sản độc quyền của đơn vị khác.</p>
          </div>

          <div className="footer-col">
            <h4>Chính sách</h4>
            <ul>
              <li>Bảo hành chính hãng</li>
              <li>Đổi trả trong 7 ngày</li>
              <li>Hướng dẫn mua trả góp</li>
              <li>Chính sách giao hàng</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Hỗ trợ khách hàng</h4>
            <ul>
              <li>Hotline mua hàng: 1800 6018</li>
              <li>Bảo hành: 1800 6019</li>
              <li>Email: support@mobilestore.local</li>
              <li>Thời gian: 08:00 - 21:30</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Kết nối</h4>
            <div className="social-links">
              <span>Facebook</span>
              <span>Zalo</span>
              <span>YouTube</span>
              <span>TikTok</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>© 2026 MobiZone demo. Giao diện frontend phục vụ học tập và phát triển project.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
