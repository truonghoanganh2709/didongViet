import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export default function NotFoundPage() {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '80px 16px' }}>
      <h1>404</h1>
      <p>Trang không tồn tại.</p>
      <Link to={ROUTES.HOME}>Về trang chủ</Link>
    </div>
  );
}
