import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'
import './ProductCard.scss'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const productId = product.mongoId || product._id

  const handleAddToCart = async () => {
    if (!productId) {
      alert('Sản phẩm mẫu chưa có trong database. Vui lòng seed sản phẩm trước.')
      return
    }

    try {
      await addToCart(productId, 1)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <article className="product-card">
      <div className="product-card__tags">
        <span>Trả góp 0%</span>
        <strong>-{product.discount}%</strong>
      </div>

      <Link className="product-card__image" to={`/products/${product.id}`}>
        <img src={product.image} alt={product.name} />
      </Link>

      <Link className="product-card__name" to={`/products/${product.id}`}>
        {product.name}
      </Link>

      <div className="product-card__price">
        <strong>{formatPrice(product.price)}</strong>
        <span>{formatPrice(product.oldPrice)}</span>
      </div>

      <div className="product-card__promo">{product.promotion}</div>

      <div className="product-card__footer">
        <span className="product-card__rating">★★★★★ {product.rating}</span>
        <button className="product-card__button" type="button" onClick={handleAddToCart}>
          Thêm giỏ
        </button>
      </div>
    </article>
  )
}

export default ProductCard
