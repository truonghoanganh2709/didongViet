import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'

const CartPage = () => {
  const { isAuthenticated } = useAuth()
  const { cartItems, loading, error, subtotal, updateQuantity, removeFromCart } = useCart()

  return (
    <main className="page cart-page">
      <div className="container">
        <div className="page-heading">
          <h1>Giỏ hàng</h1>
        </div>

        {!isAuthenticated && (
          <section className="lookup-empty">
            <h2>Vui lòng đăng nhập</h2>
            <p>Giỏ hàng đang được lưu theo tài khoản trong database.</p>
            <Link to="/login" className="text-link">Đăng nhập ngay</Link>
          </section>
        )}

        {isAuthenticated && (
          <div className="cart-layout">
            <section className="cart-items">
              {loading && <div className="notice">Đang tải giỏ hàng...</div>}
              {error && <div className="notice notice--warning">{error}</div>}
              {!loading && cartItems.length === 0 && (
                <div className="empty-state">
                  <h2>Giỏ hàng đang trống</h2>
                  <Link to="/products">Tiếp tục mua sắm</Link>
                </div>
              )}
              {cartItems.map((item) => (
                <article className="cart-item" key={item.product._id}>
                  <img src={item.product.image} alt={item.product.name} />
                  <div>
                    <Link to={`/products/${item.product.slug}`}>{item.product.name}</Link>
                    <span>{item.product.promotion}</span>
                    <div className="quantity-control">
                      <button type="button" onClick={() => updateQuantity(item.product._id, item.quantity - 1)}>-</button>
                      <strong>{item.quantity}</strong>
                      <button type="button" onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <strong>{formatPrice(item.product.price * item.quantity)}</strong>
                  <button className="remove-button" type="button" onClick={() => removeFromCart(item.product._id)}>
                    Xóa
                  </button>
                </article>
              ))}
            </section>

            <aside className="cart-summary">
              <h2>Tổng thanh toán</h2>
              <div>
                <span>Tạm tính</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <div>
                <span>Phí vận chuyển</span>
                <strong>{subtotal >= 500000 || subtotal === 0 ? 'Miễn phí' : formatPrice(30000)}</strong>
              </div>
              <div className="total">
                <span>Cần thanh toán</span>
                <strong>{formatPrice(subtotal + (subtotal >= 500000 || subtotal === 0 ? 0 : 30000))}</strong>
              </div>
              <Link className="checkout-link" to="/checkout">Thanh toán</Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}

export default CartPage
