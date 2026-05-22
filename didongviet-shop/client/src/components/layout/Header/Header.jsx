import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { useAuth } from '../../../hooks/useAuth';
import { useCart } from '../../../hooks/useCart';
import { useWishlist } from '../../../hooks/useWishlist';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Header.module.css';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.top}`}>
        <Link to={ROUTES.HOME} className={styles.logo}>
          <span className={styles.logoMark}>DDV</span>
          <span>Di Động Việt</span>
        </Link>
        <SearchBar />
        <div className={styles.actions}>
          <Link to={ROUTES.COMPARE}>So sánh</Link>
          <Link to={ROUTES.WISHLIST} className={styles.cartLink}>
            Yêu thích
            {wishlistCount > 0 && <span className={styles.badge}>{wishlistCount}</span>}
          </Link>
          <Link to={ROUTES.CART} className={styles.cartLink}>
            Giỏ hàng
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </Link>
          {isAuthenticated ? (
            <>
              <Link to={ROUTES.ORDERS}>Đơn hàng</Link>
              <Link to={ROUTES.PROFILE}>{user?.name?.split(' ')[0]}</Link>
              {user?.role === 'admin' && (
                <Link to={ROUTES.ADMIN} className={styles.admin}>
                  Admin
                </Link>
              )}
              <button type="button" onClick={logout} className={styles.linkBtn}>
                Thoát
              </button>
            </>
          ) : (
            <>
              <Link to={ROUTES.LOGIN}>Đăng nhập</Link>
              <Link to={ROUTES.REGISTER} className={styles.register}>
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
