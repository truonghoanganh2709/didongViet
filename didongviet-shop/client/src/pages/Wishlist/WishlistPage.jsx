import { Link } from 'react-router-dom';
import ProductGrid from '../../components/product/ProductGrid/ProductGrid';
import Loader from '../../components/common/Loader/Loader';
import { useWishlist } from '../../hooks/useWishlist';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants/routes';

export default function WishlistPage() {
  const { isAuthenticated } = useAuth();
  const { wishlist, loading } = useWishlist();

  if (!isAuthenticated) {
    return (
      <div className="container">
        <p>
          Vui lòng <Link to={ROUTES.LOGIN}>đăng nhập</Link> để xem danh sách yêu thích.
        </p>
      </div>
    );
  }

  if (loading) return <Loader />;

  const products = wishlist?.products || [];

  return (
    <div className="container">
      <h1 className="pageTitle">Sản phẩm yêu thích ({products.length})</h1>
      {products.length ? (
        <ProductGrid products={products} />
      ) : (
        <p>
          Chưa có sản phẩm yêu thích. <Link to={ROUTES.PRODUCTS}>Khám phá ngay</Link>
        </p>
      )}
    </div>
  );
}
