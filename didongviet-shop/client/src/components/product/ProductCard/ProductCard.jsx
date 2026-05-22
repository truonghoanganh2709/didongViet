import { Link } from 'react-router-dom';
import { formatPrice } from '../../../utils/formatPrice';
import ProductActions from '../ProductActions/ProductActions';
import styles from './ProductCard.module.css';

const getDisplayPrice = (product) => {
  const sale = product.salePrice;
  const base = product.price;
  return sale && sale < base ? sale : base;
};

export default function ProductCard({ product }) {
  const price = getDisplayPrice(product);
  const hasSale = product.salePrice && product.salePrice < product.price;

  return (
    <article className={styles.card}>
      <Link to={`/san-pham/${product.slug}`} className={styles.imageWrap}>
        <ProductActions product={product} compact />
        {product.thumbnail ? (
          <img src={product.thumbnail} alt={product.name} />
        ) : (
          <div className={styles.placeholder}>{product.brand}</div>
        )}
        {hasSale && <span className={styles.sale}>Giảm giá</span>}
      </Link>
      <div className={styles.body}>
        <p className={styles.brand}>{product.brand}</p>
        <Link to={`/san-pham/${product.slug}`} className={styles.name}>
          {product.name}
        </Link>
        {product.rating?.count > 0 && (
          <p className={styles.rating}>
            ★ {product.rating.average} ({product.rating.count})
          </p>
        )}
        <div className={styles.prices}>
          <strong>{formatPrice(price)}</strong>
          {hasSale && <span className={styles.old}>{formatPrice(product.price)}</span>}
        </div>
      </div>
    </article>
  );
}
