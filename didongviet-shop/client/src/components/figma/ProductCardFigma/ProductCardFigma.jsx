import { Link } from 'react-router-dom';
import { formatPrice } from '../../../utils/formatPrice';
import './ProductCardFigma.css';

export default function ProductCardFigma({ product, showDiscount = false }) {
  const price =
    product.salePrice && product.salePrice < product.price ? product.salePrice : product.price;
  const hasSale = product.salePrice && product.salePrice < product.price;
  const discount = hasSale
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <article className="figma-product-card">
      {showDiscount && discount > 0 && (
        <span className="figma-product-card__discount">-{discount}%</span>
      )}
      <Link to={`/san-pham/${product.slug}`} className="figma-product-card__img">
        <img
          src={product.thumbnail || '/assets/product-placeholder.svg'}
          alt={product.name}
        />
      </Link>
      <div className="figma-product-card__body">
        <p className="figma-product-card__brand">{product.brand}</p>
        <Link to={`/san-pham/${product.slug}`} className="figma-product-card__name">
          {product.name}
        </Link>
        {product.rating?.count > 0 && (
          <p className="figma-product-card__rating">
            ★ {product.rating.average} ({product.rating.count})
          </p>
        )}
        <div className="figma-product-card__prices">
          <strong>{formatPrice(price)}</strong>
          {hasSale && <del>{formatPrice(product.price)}</del>}
        </div>
        <Link to={`/san-pham/${product.slug}`} className="figma-product-card__btn">
          Xem chi tiết
        </Link>
      </div>
    </article>
  );
}
