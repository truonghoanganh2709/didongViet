import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import ProductCardFigma from '../ProductCardFigma/ProductCardFigma';
import './ProductSection.css';

export default function ProductSection({ title, products = [], viewAllLink }) {
  if (!products.length) return null;

  return (
    <section className="figma-section">
      <div className="figma-section__head">
        <h2>{title}</h2>
        {viewAllLink && (
          <Link to={viewAllLink} className="figma-section__more">
            Xem tất cả →
          </Link>
        )}
      </div>
      <div className="figma-section__grid">
        {products.map((p) => (
          <ProductCardFigma key={p._id} product={p} />
        ))}
      </div>
    </section>
  );
}
