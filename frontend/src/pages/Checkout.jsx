import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { orderService } from '../services/orderService'
import { formatPrice } from '../utils/format'

const Checkout = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const { cartItems, subtotal, clearCart } = useCart()
  const [form, setForm] = useState({
    customerName: user?.name || '',
    phone: '',
    email: user?.email || '',
    address: '',
    note: '',
    paymentMethod: 'cod',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const shippingFee = subtotal >= 500000 || subtotal === 0 ? 0 : 30000
  const total = subtotal + shippingFee

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const data = await orderService.createOrder({
        ...form,
        items: cartItems.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
        })),
      })
      await clearCart()
      navigate(`/order-lookup?code=${data.order.code}&phone=${form.phone}`, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="page">
        <div className="container lookup-empty">
          <h1>Vui lòng đăng nhập để thanh toán</h1>
          <Link to="/login" className="text-link">Đăng nhập</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="page checkout-page">
      <div className="container">
        <div className="page-heading">
          <h1>Thanh toán</h1>
          <p>Kiểm tra thông tin nhận hàng và tạo đơn hàng trong MongoDB.</p>
        </div>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <label>
              Họ và tên
              <input name="customerName" value={form.customerName} onChange={handleChange} required />
            </label>
            <label>
              Số điện thoại
              <input name="phone" value={form.phone} onChange={handleChange} required />
            </label>
            <label>
              Email
              <input name="email" type="email" value={form.email} onChange={handleChange} />
            </label>
            <label>
              Địa chỉ giao hàng
              <input name="address" value={form.address} onChange={handleChange} required />
            </label>
            <label>
              Ghi chú
              <textarea name="note" value={form.note} onChange={handleChange} rows="3" />
            </label>
            <label>
              Phương thức thanh toán
              <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
                <option value="cod">Thanh toán khi nhận hàng</option>
                <option value="bank">Chuyển khoản ngân hàng</option>
              </select>
            </label>
            {error && <div className="form-error">{error}</div>}
            <button type="submit" disabled={loading || cartItems.length === 0}>
              {loading ? 'Đang tạo đơn...' : 'Đặt hàng'}
            </button>
          </form>

          <aside className="cart-summary">
            <h2>Đơn hàng</h2>
            {cartItems.map((item) => (
              <div key={item.product._id}>
                <span>{item.product.name} x {item.quantity}</span>
                <strong>{formatPrice(item.product.price * item.quantity)}</strong>
              </div>
            ))}
            <div>
              <span>Tạm tính</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <div>
              <span>Phí vận chuyển</span>
              <strong>{shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}</strong>
            </div>
            <div className="total">
              <span>Tổng cộng</span>
              <strong>{formatPrice(total)}</strong>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default Checkout
