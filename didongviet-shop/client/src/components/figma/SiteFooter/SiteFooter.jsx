import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import './SiteFooter.css';

export default function SiteFooter() {
  return (
    <footer className="figma-footer">
      <div className="figma-footer__inner">
        <div className="figma-footer__grid">
          <div>
            <img src="/assets/logo.svg" alt="Di Động Việt" height={36} />
            <p>Hệ thống bán lẻ điện thoại di động, smartphone, tablet và phụ kiện chính hãng.</p>
            <p className="figma-footer__hotline">Hotline: 1800.106.8</p>
          </div>
          <div>
            <h4>Thông tin</h4>
            <ul>
              <li>
                <a href="#">Giới thiệu</a>
              </li>
              <li>
                <a href="#">Tuyển dụng</a>
              </li>
              <li>
                <Link to={ROUTES.PRODUCTS}>Sản phẩm</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Hỗ trợ khách hàng</h4>
            <ul>
              <li>
                <a href="#">Chính sách bảo hành</a>
              </li>
              <li>
                <a href="#">Chính sách đổi trả</a>
              </li>
              <li>
                <a href="#">Hướng dẫn mua hàng</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Kết nối</h4>
            <div className="figma-footer__social">
              <a href="#" aria-label="Facebook">
                f
              </a>
              <a href="#" aria-label="YouTube">
                ▶
              </a>
              <a href="#" aria-label="Zalo">
                Z
              </a>
            </div>
          </div>
        </div>
        <p className="figma-footer__copy">© 2026 Di Động Việt · CNPM Nhóm 6</p>
      </div>
    </footer>
  );
}
