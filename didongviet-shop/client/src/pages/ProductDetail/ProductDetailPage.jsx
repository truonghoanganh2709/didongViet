import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/common/Loader/Loader';
import Button from '../../components/common/Button/Button';
import ProductGrid from '../../components/product/ProductGrid/ProductGrid';
import ProductActions from '../../components/product/ProductActions/ProductActions';
import ProductReviews from '../../components/product/ProductReviews/ProductReviews';
import { getProductBySlug, getRelatedProducts } from '../../services/productService';
import { formatPrice } from '../../utils/formatPrice';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { ROUTES } from '../../constants/routes';
import styles from './ProductDetailPage.module.css';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getProductBySlug(slug).then(({ data }) => data.data),
      getRelatedProducts(slug).then(({ data }) => data.data),
    ])
      .then(([prod, rel]) => {
        setProduct(prod);
        setRelated(rel);
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [slug]);

  const price =
    product?.salePrice && product.salePrice < product.price
      ? product.salePrice
      : product?.price;

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
      return;
    }
    setAdding(true);
    setMessage('');
    try {
      await addItem(product._id, qty);
      setMessage('Đã thêm vào giỏ hàng');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <Loader />;
  if (!product) return <div className="container">Không tìm thấy sản phẩm.</div>;

  return (
    <div className="container">
      <div className={`${styles.page}`}>
        <div className={styles.gallery}>
          {product.thumbnail ? (
            <img src={product.thumbnail} alt={product.name} />
          ) : (
            <div className={styles.placeholder}>{product.brand}</div>
          )}
        </div>
        <div className={styles.info}>
          <p className={styles.brand}>{product.brand}</p>
          <h1>{product.name}</h1>
          {product.rating?.count > 0 && (
            <p className={styles.rating}>
              ★ {product.rating.average} — {product.rating.count} đánh giá
            </p>
          )}
          <p className={styles.price}>{formatPrice(price)}</p>
          <p className={styles.stock}>Còn {product.stock} sản phẩm</p>
          <p className={styles.desc}>{product.description}</p>

          <ProductActions product={product} />

          <div className={styles.qty}>
            <label>Số lượng</label>
            <input
              type="number"
              min={1}
              max={product.stock}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </div>

          <div className={styles.buttons}>
            <Button onClick={handleAddToCart} disabled={adding || product.stock < 1}>
              {adding ? 'Đang thêm...' : 'Thêm vào giỏ'}
            </Button>
          </div>
          {message && <p className={styles.msg}>{message}</p>}

          {product.specs && (
            <div className={styles.specs}>
              <h3>Thông số kỹ thuật</h3>
              <ul>
                {Object.entries(product.specs).map(
                  ([key, val]) =>
                    val && (
                      <li key={key}>
                        <strong>{key}</strong>: {val}
                      </li>
                    )
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      <ProductReviews slug={slug} />

      {related.length > 0 && (
        <section className={styles.related}>
          <h2 className="pageTitle">Sản phẩm tương tự</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
