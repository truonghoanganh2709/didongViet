import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import Loader from '../Loader/Loader';
import { ROUTES } from '../../../constants/routes';

export default function AdminRoute({ children }) {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) return <Loader />;
  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;
  if (user?.role !== 'admin') {
    return (
      <div className="container" style={{ padding: '48px 16px' }}>
        <h1>Không có quyền truy cập</h1>
        <p>Trang này chỉ dành cho quản trị viên.</p>
      </div>
    );
  }

  return children;
}
