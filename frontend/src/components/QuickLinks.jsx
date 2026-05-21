import { Link } from 'react-router-dom'
import { categoryItems } from '../data/products'
import './QuickLinks.scss'

const QuickLinks = () => {
  return (
    <section className="quick-links">
      <div className="container">
        <div className="quick-links__wrapper">
          {categoryItems.map((category) => (
            <Link
              className="quick-links__item"
              key={category.name}
              to={`/products?category=${encodeURIComponent(category.name)}`}
            >
              <span className="icon-box">
                <img src={category.image} alt={category.name} />
              </span>
              <span className="link-name">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default QuickLinks
