import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signup(form);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link className="auth-brand" to="/" aria-label="MobiZone">
          <img src="/images/logos/mobizone-logo.webp" alt="MobiZone" />
        </Link>

        <h1>Đăng ký</h1>

        <form onSubmit={handleSubmit}>
          <label>
            Họ và tên
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Nhập họ tên"
              required
            />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Nhập email"
              required
            />
          </label>
          <label>
            Mật khẩu
            <input
              name="password"
              type="password"
              minLength="6"
              value={form.password}
              onChange={handleChange}
              placeholder="Tạo mật khẩu"
              required
            />
          </label>
          {error && <div className="form-error">{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
          </button>
        </form>

        <p>
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </section>
    </main>
  );
};

export default Register;
