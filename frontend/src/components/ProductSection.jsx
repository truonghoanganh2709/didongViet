import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import './ProductSection.scss'

const ProductSection = ({ title, subtitle, products = [], category }) => {
  return (
    <section className="product-section">
      <div className="container">
        <div className="product-section__header">
          <div>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          {category && (
            <Link to={`/products?category=${encodeURIComponent(category)}`}>Xem tất cả</Link>
          )}
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductSection
