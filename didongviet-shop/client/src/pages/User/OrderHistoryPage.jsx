import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/common/Loader/Loader';
import { getOrders } from '../../services/orderService';
import { formatPrice } from '../../utils/formatPrice';
import { formatDate } from '../../utils/formatDate';
import styles from './UserPage.module.css';

const STATUS_LABEL = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  shipping: 'Đang giao',
  delivered: 'Đã giao',
  cancelled: 'Đã hủy',
};

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then(({ data }) => setOrders(data.data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container">
      <h1 className="pageTitle">Lịch sử đơn hàng</h1>
      {!orders.length ? (
        <p>Chưa có đơn hàng nào.</p>
      ) : (
        <div className={styles.orders}>
          {orders.map((order) => (
            <article key={order._id} className={styles.orderCard}>
              <div className={styles.orderHead}>
                <Link to={`/don-hang/${order._id}`} className={styles.orderLink}>
                  <strong>{order.orderCode}</strong>
                </Link>
                <span>{STATUS_LABEL[order.status] || order.status}</span>
              </div>
              <p className={styles.meta}>{formatDate(order.createdAt)}</p>
              <ul>
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.name} x{item.quantity} — {formatPrice(item.price * item.quantity)}
                  </li>
                ))}
              </ul>
              <p className={styles.total}>Tổng: {formatPrice(order.total)}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
