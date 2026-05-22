import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import { resetPassword } from '../../services/authService';
import { setToken, setStoredUser } from '../../utils/storage';
import { ROUTES } from '../../constants/routes';
import styles from './AuthPage.module.css';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [resetToken, setResetToken] = useState(searchParams.get('token') || '');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { data } = await resetPassword({ token: resetToken, password });
      const userData = data.data;
      setToken(userData.token);
      const { token: _t, ...rest } = userData;
      setStoredUser(rest);
      navigate(ROUTES.HOME);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`container ${styles.wrap}`}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Đặt lại mật khẩu</h1>
        <Input
          label="Token"
          value={resetToken}
          onChange={(e) => setResetToken(e.target.value)}
          required
        />
        <Input
          label="Mật khẩu mới"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          label="Xác nhận mật khẩu"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Đang lưu...' : 'Cập nhật mật khẩu'}
        </Button>
        <p>
          <Link to={ROUTES.LOGIN}>Đăng nhập</Link>
        </p>
      </form>
    </div>
  );
}
