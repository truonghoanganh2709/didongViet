import { useEffect, useState } from 'react';
import Loader from '../../components/common/Loader/Loader';
import { getAdminStats } from '../../services/adminService';
import AdminOverview from './sections/AdminOverview';
import AdminProducts from './sections/AdminProducts';
import AdminCategories from './sections/AdminCategories';
import AdminOrders from './sections/AdminOrders';
import AdminUsers from './sections/AdminUsers';
import AdminCoupons from './sections/AdminCoupons';
import styles from './AdminDashboardPage.module.css';

const TABS = [
  { id: 'overview', label: 'Tổng quan' },
  { id: 'products', label: 'Sản phẩm' },
  { id: 'categories', label: 'Danh mục' },
  { id: 'orders', label: 'Đơn hàng' },
  { id: 'users', label: 'Người dùng' },
  { id: 'coupons', label: 'Mã giảm giá' },
];

export default function AdminDashboardPage() {
  const [tab, setTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    setLoading(true);
    try {
      const { data } = await getAdminStats();
      setStats(data.data);
    } catch {
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tab === 'overview') loadStats();
  }, [tab]);

  return (
    <div className="container">
      <h1 className="pageTitle">Quản trị hệ thống</h1>

      <nav className={styles.tabs}>
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={tab === t.id ? styles.active : ''}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div className={styles.content}>
        {tab === 'overview' && (loading ? <Loader /> : <AdminOverview stats={stats} />)}
        {tab === 'products' && <AdminProducts />}
        {tab === 'categories' && <AdminCategories />}
        {tab === 'orders' && <AdminOrders />}
        {tab === 'users' && <AdminUsers />}
        {tab === 'coupons' && <AdminCoupons />}
      </div>
    </div>
  );
}
