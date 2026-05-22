import { useEffect, useState } from 'react';
import { getAdminUsers } from '../../../services/adminService';
import { deleteUser } from '../../../services/userService';
import { useAuth } from '../../../hooks/useAuth';
import styles from '../AdminDashboardPage.module.css';

export default function AdminUsers() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await getAdminUsers();
      setUsers(data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id, name) => {
    if (id === currentUser._id) {
      alert('Không thể xóa tài khoản đang đăng nhập');
      return;
    }
    if (!window.confirm(`Xóa user "${name}"?`)) return;
    try {
      await deleteUser(id);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Đang tải...</p>;

  return (
    <section className={styles.section}>
      <h2>Quản lý người dùng</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Vai trò</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phone || '—'}</td>
              <td>{u.role}</td>
              <td>
                {u.role !== 'admin' && (
                  <button type="button" onClick={() => handleDelete(u._id, u.name)}>Xóa</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
