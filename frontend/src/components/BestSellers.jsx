import { products as mockProducts } from '../data/products'
import ProductCard from './ProductCard'
import './BestSellers.scss'

const BestSellers = ({ products = mockProducts }) => {
  const bestSellers = products
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5)

  return (
    <section className="best-sellers">
      <div className="container">
        <div className="section-header">
          <h2 className="title">Sản phẩm bán chạy</h2>
          <p>Những mẫu đang được khách hàng quan tâm nhiều nhất</p>
        </div>

        <div className="product-grid">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BestSellers
