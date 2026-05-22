import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { useAuth } from '../../../hooks/useAuth';
import { useCart } from '../../../hooks/useCart';
import './SiteHeader.css';

export default function SiteHeader() {
  const { isAuthenticated, user } = useAuth();
  const { cartCount } = useCart();

  return (
    <header className="figma-header">
      <div className="figma-header__inner">
        <Link to={ROUTES.HOME} className="figma-header__logo">
          <img src="/assets/logo.svg" alt="Di Động Việt" height={40} />
        </Link>

        <form
          className="figma-header__search"
          onSubmit={(e) => {
            e.preventDefault();
            const q = e.target.q.value.trim();
            if (q) window.location.href = `${ROUTES.SEARCH}?q=${encodeURIComponent(q)}`;
          }}
        >
          <input type="search" name="q" placeholder="Nhập tên điện thoại, phụ kiện cần tìm..." />
          <button type="submit">Tìm kiếm</button>
        </form>

        <div className="figma-header__actions">
          <Link to={isAuthenticated ? ROUTES.PROFILE : ROUTES.LOGIN} className="figma-header__action">
            <span className="figma-header__icon">👤</span>
            <span>
              {isAuthenticated ? user?.name?.split(' ')[0] : 'Đăng nhập'}
              <small>Tài khoản</small>
            </span>
          </Link>
          <Link to={ROUTES.CART} className="figma-header__action figma-header__cart">
            <span className="figma-header__icon">🛒</span>
            <span>
              Giỏ hàng
              {cartCount > 0 && <em className="figma-header__badge">{cartCount}</em>}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
