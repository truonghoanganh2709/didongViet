import { useState } from 'react';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import { useAuth } from '../../hooks/useAuth';
import { updateUser } from '../../services/userService';
import { changePassword } from '../../services/authService';
import styles from './UserPage.module.css';

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    ward: user?.address?.ward || '',
    district: user?.address?.district || '',
    city: user?.address?.city || '',
  });
  const [pwd, setPwd] = useState({ currentPassword: '', newPassword: '', confirm: '' });
  const [message, setMessage] = useState('');
  const [pwdMessage, setPwdMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const { data } = await updateUser(user._id, {
        name: form.name,
        phone: form.phone,
        address: {
          street: form.street,
          ward: form.ward,
          district: form.district,
          city: form.city,
        },
      });
      setUser(data.data);
      setMessage('Cập nhật thành công');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (pwd.newPassword !== pwd.confirm) {
      setPwdMessage('Mật khẩu xác nhận không khớp');
      return;
    }
    setPwdLoading(true);
    setPwdMessage('');
    try {
      await changePassword({
        currentPassword: pwd.currentPassword,
        newPassword: pwd.newPassword,
      });
      setPwd({ currentPassword: '', newPassword: '', confirm: '' });
      setPwdMessage('Đổi mật khẩu thành công');
    } catch (err) {
      setPwdMessage(err.message);
    } finally {
      setPwdLoading(false);
    }
  };

  return (
    <div className={`container ${styles.wrap}`}>
      <h1 className="pageTitle">Tài khoản</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.subTitle}>Thông tin cá nhân</h2>
        <Input label="Họ tên" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input label="Email" value={user?.email || ''} disabled />
        <Input label="Số điện thoại" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <Input label="Địa chỉ" value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} />
        <Input label="Phường/Xã" value={form.ward} onChange={(e) => setForm({ ...form, ward: e.target.value })} />
        <Input label="Quận/Huyện" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} />
        <Input label="Tỉnh/TP" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
        {message && <p>{message}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
        </Button>
      </form>

      <form className={styles.form} onSubmit={handleChangePassword}>
        <h2 className={styles.subTitle}>Đổi mật khẩu</h2>
        <Input
          label="Mật khẩu hiện tại"
          type="password"
          value={pwd.currentPassword}
          onChange={(e) => setPwd({ ...pwd, currentPassword: e.target.value })}
          required
        />
        <Input
          label="Mật khẩu mới"
          type="password"
          value={pwd.newPassword}
          onChange={(e) => setPwd({ ...pwd, newPassword: e.target.value })}
          required
        />
        <Input
          label="Xác nhận mật khẩu mới"
          type="password"
          value={pwd.confirm}
          onChange={(e) => setPwd({ ...pwd, confirm: e.target.value })}
          required
        />
        {pwdMessage && <p>{pwdMessage}</p>}
        <Button type="submit" disabled={pwdLoading}>
          {pwdLoading ? 'Đang đổi...' : 'Đổi mật khẩu'}
        </Button>
      </form>
    </div>
  );
}
