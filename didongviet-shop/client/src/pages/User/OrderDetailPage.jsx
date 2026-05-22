import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../components/common/Loader/Loader';
import { getOrderById } from '../../services/orderService';
import { formatPrice } from '../../utils/formatPrice';
import { formatDate } from '../../utils/formatDate';
import { ROUTES } from '../../constants/routes';
import styles from './OrderDetailPage.module.css';

const STATUS_LABEL = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  shipping: 'Đang giao',
  delivered: 'Đã giao',
  cancelled: 'Đã hủy',
};

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrderById(id)
      .then(({ data }) => setOrder(data.data))
      .catch(() => setOrder(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!order) return <div className="container">Không tìm thấy đơn hàng.</div>;

  const addr = order.shippingAddress;

  return (
    <div className={`container ${styles.page}`}>
      <Link to={ROUTES.ORDERS} className={styles.back}>
        ← Quay lại đơn hàng
      </Link>
      <h1 className="pageTitle">Đơn hàng {order.orderCode}</h1>

      <div className={styles.grid}>
        <section className={styles.card}>
          <h3>Trạng thái</h3>
          <p className={styles.status}>{STATUS_LABEL[order.status] || order.status}</p>
          <p className={styles.meta}>Đặt lúc: {formatDate(order.createdAt)}</p>
          <p>Thanh toán: {order.paymentMethod}</p>
          {order.note && <p>Ghi chú: {order.note}</p>}
        </section>

        <section className={styles.card}>
          <h3>Giao hàng</h3>
          <p>{addr.name}</p>
          <p>{addr.phone}</p>
          <p>
            {[addr.street, addr.ward, addr.district, addr.city].filter(Boolean).join(', ')}
          </p>
        </section>
      </div>

      <section className={styles.card}>
        <h3>Sản phẩm</h3>
        <ul className={styles.items}>
          {order.items.map((item, i) => (
            <li key={i}>
              <span>{item.name} × {item.quantity}</span>
              <strong>{formatPrice(item.price * item.quantity)}</strong>
            </li>
          ))}
        </ul>
        <div className={styles.totals}>
          <p>Tạm tính: {formatPrice(order.subtotal)}</p>
          <p>Phí ship: {formatPrice(order.shippingFee)}</p>
          {order.couponCode && <p>Mã giảm giá: {order.couponCode}</p>}
          {order.discount > 0 && <p>Giảm giá: -{formatPrice(order.discount)}</p>}
          <p className={styles.total}>Tổng: {formatPrice(order.total)}</p>
        </div>
      </section>
    </div>
  );
}
