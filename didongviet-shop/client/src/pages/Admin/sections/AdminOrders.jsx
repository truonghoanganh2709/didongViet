import { useEffect, useState } from 'react';
import { getAdminOrders, updateOrderStatus } from '../../../services/adminService';
import { formatPrice } from '../../../utils/formatPrice';
import { formatDate } from '../../../utils/formatDate';
import styles from '../AdminDashboardPage.module.css';

const STATUSES = ['pending', 'confirmed', 'shipping', 'delivered', 'cancelled'];
const STATUS_LABEL = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  shipping: 'Đang giao',
  delivered: 'Đã giao',
  cancelled: 'Đã hủy',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const params = filter ? { status: filter } : {};
      const { data } = await getAdminOrders(params);
      setOrders(data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [filter]);

  const handleStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Đang tải...</p>;

  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <h2>Quản lý đơn hàng</h2>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">Tất cả trạng thái</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{STATUS_LABEL[s]}</option>
          ))}
        </select>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Mã đơn</th>
            <th>Khách</th>
            <th>Tổng</th>
            <th>Trạng thái</th>
            <th>Ngày</th>
            <th>Cập nhật</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>{o.orderCode}</td>
              <td>{o.user?.name}<br /><small>{o.user?.email}</small></td>
              <td>{formatPrice(o.total)}</td>
              <td>{STATUS_LABEL[o.status]}</td>
              <td>{formatDate(o.createdAt)}</td>
              <td>
                <select
                  value={o.status}
                  onChange={(e) => handleStatus(o._id, e.target.value)}
                  className={styles.statusSelect}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{STATUS_LABEL[s]}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
