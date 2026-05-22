import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import { forgotPassword } from '../../services/authService';
import { ROUTES } from '../../constants/routes';
import styles from './AuthPage.module.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const { data } = await forgotPassword(email);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`container ${styles.wrap}`}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Quên mật khẩu</h1>
        <p className={styles.hint}>Nhập email đăng ký để nhận link đặt lại mật khẩu.</p>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        {result && (
          <div className={styles.success}>
            <p>{result.message}</p>
            {result.data?.resetUrl && (
              <p>
                <Link to={`${ROUTES.RESET_PASSWORD}?token=${result.data.resetToken || ''}`}>
                  Đặt lại mật khẩu ngay
                </Link>
              </p>
            )}
            {result.data?.resetToken && (
              <p className={styles.token}>
                Token (demo): <code>{result.data.resetToken}</code>
              </p>
            )}
          </div>
        )}
        <Button type="submit" disabled={loading}>
          {loading ? 'Đang gửi...' : 'Gửi yêu cầu'}
        </Button>
        <p>
          <Link to={ROUTES.LOGIN}>← Quay lại đăng nhập</Link>
        </p>
      </form>
    </div>
  );
}
