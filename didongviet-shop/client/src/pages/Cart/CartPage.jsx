import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/common/Loader/Loader';
import Button from '../../components/common/Button/Button';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { formatPrice } from '../../utils/formatPrice';
import { ROUTES } from '../../constants/routes';
import styles from './CartPage.module.css';

export default function CartPage() {
  const { isAuthenticated } = useAuth();
  const { cart, loading, updateItem, removeItem } = useCart();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="container">
        <p>Vui lòng <Link to={ROUTES.LOGIN}>đăng nhập</Link> để xem giỏ hàng.</p>
      </div>
    );
  }

  if (loading) return <Loader />;

  const items = cart?.items || [];
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (!items.length) {
    return (
      <div className="container">
        <h1 className="pageTitle">Giỏ hàng</h1>
        <p>Giỏ hàng trống. <Link to={ROUTES.PRODUCTS}>Mua sắm ngay</Link></p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="pageTitle">Giỏ hàng ({items.length})</h1>
      <div className={styles.layout}>
        <div className={styles.list}>
          {items.map((item) => {
            const p = item.product;
            if (!p) return null;
            return (
              <div key={item._id} className={styles.item}>
                <div>
                  <strong>{p.name}</strong>
                  <p>{formatPrice(item.price)}</p>
                </div>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateItem(p._id, Number(e.target.value))}
                  className={styles.qty}
                />
                <span>{formatPrice(item.price * item.quantity)}</span>
                <button type="button" onClick={() => removeItem(p._id)} className={styles.remove}>
                  Xóa
                </button>
              </div>
            );
          })}
        </div>
        <aside className={styles.summary}>
          <p>Tạm tính: <strong>{formatPrice(total)}</strong></p>
          <Button onClick={() => navigate(ROUTES.CHECKOUT)}>Thanh toán</Button>
        </aside>
      </div>
    </div>
  );
}
