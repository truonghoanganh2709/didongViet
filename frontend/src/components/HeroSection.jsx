import { Link } from 'react-router-dom'
import { categories } from '../data/products'
import './HeroSection.scss'

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="container hero__wrapper">
        <aside className="hero__sidebar">
          {categories.map((category) => (
            <Link key={category} to={`/products?category=${encodeURIComponent(category)}`}>
              <span>{category}</span>
              <span>›</span>
            </Link>
          ))}
        </aside>

        <Link className="hero__main-banner hero__main-banner--image" to="/products">
          <img src="/images/banners/home-hero-sale.jpg" alt="Khuyến mãi công nghệ" />
        </Link>

        <div className="hero__sub-banners">
          <Link to="/products?category=iPhone">
            <strong>iPhone nổi bật</strong>
            <span>Thu cũ trợ giá thêm</span>
          </Link>
          <Link to="/products?category=Samsung">
            <strong>Samsung Galaxy</strong>
            <span>Quà tặng giới hạn</span>
          </Link>
          <Link to="/products?category=Ph%E1%BB%A5%20ki%E1%BB%87n">
            <strong>Phụ kiện hot</strong>
            <span>Mua combo tiết kiệm</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
