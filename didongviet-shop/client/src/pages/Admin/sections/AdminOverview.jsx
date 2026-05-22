import { formatPrice } from '../../../utils/formatPrice';
import { formatDate } from '../../../utils/formatDate';
import styles from '../AdminDashboardPage.module.css';

const STATUS = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  shipping: 'Đang giao',
  delivered: 'Đã giao',
  cancelled: 'Đã hủy',
};

export default function AdminOverview({ stats }) {
  if (!stats) return <p>Không tải được thống kê.</p>;

  return (
    <>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span>Doanh thu</span>
          <strong>{formatPrice(stats.revenue || 0)}</strong>
        </div>
        <div className={styles.stat}>
          <span>Đơn hàng</span>
          <strong>{stats.orders || 0}</strong>
        </div>
        <div className={styles.stat}>
          <span>Sản phẩm</span>
          <strong>{stats.products || 0}</strong>
        </div>
        <div className={styles.stat}>
          <span>Người dùng</span>
          <strong>{stats.users || 0}</strong>
        </div>
      </div>

      <section className={styles.section}>
        <h2>Sản phẩm bán chạy</h2>
        {!stats.topProducts?.length ? (
          <p>Chưa có dữ liệu.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Đã bán</th>
                <th>Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {stats.topProducts.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.totalSold}</td>
                  <td>{formatPrice(p.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className={styles.section}>
        <h2>Đơn hàng gần đây</h2>
        {!stats.recentOrders?.length ? (
          <p>Chưa có đơn.</p>
        ) : (
          <ul className={styles.orders}>
            {stats.recentOrders.map((o) => (
              <li key={o._id}>
                <span>{o.orderCode}</span>
                <span>{o.user?.name}</span>
                <span>{STATUS[o.status]}</span>
                <strong>{formatPrice(o.total)}</strong>
                <time>{formatDate(o.createdAt)}</time>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
