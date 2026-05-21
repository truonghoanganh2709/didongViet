import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { orderService } from '../services/orderService'
import { formatPrice } from '../utils/format'

const statusLabels = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  shipping: 'Đang giao hàng',
  completed: 'Đã hoàn tất',
  cancelled: 'Đã hủy',
}

const buildTimeline = (status) => {
  const steps = ['pending', 'confirmed', 'shipping', 'completed']
  const activeIndex = status === 'cancelled' ? 0 : steps.indexOf(status)

  return steps.map((step, index) => ({
    key: step,
    label: statusLabels[step],
    done: index <= activeIndex,
  }))
}

const OrderLookup = () => {
  const [searchParams] = useSearchParams()
  const [keyword, setKeyword] = useState(searchParams.get('code') || '')
  const [phone, setPhone] = useState(searchParams.get('phone') || '')
  const [submitted, setSubmitted] = useState(Boolean(searchParams.get('code') && searchParams.get('phone')))
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const lookup = async (code, phoneNumber) => {
    setLoading(true)
    setError('')
    setOrder(null)
    try {
      const data = await orderService.lookupOrder({ code, phone: phoneNumber })
      setOrder(data.order)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const code = searchParams.get('code')
    const phoneNumber = searchParams.get('phone')
    if (code && phoneNumber) {
      queueMicrotask(() => {
        lookup(code, phoneNumber)
      })
    }
  }, [searchParams])

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    lookup(keyword.trim(), phone.trim())
  }

  const timeline = order ? buildTimeline(order.status) : []

  return (
    <main className="page order-lookup-page">
      <div className="container">
        <div className="order-lookup">
          <section className="order-lookup__intro">
            <span>Tra cứu đơn hàng</span>
            <h1>Kiểm tra trạng thái mua hàng</h1>
            <p>Nhập mã đơn hàng và số điện thoại để xem tiến độ xử lý, giao hàng và thông tin sản phẩm.</p>
          </section>

          <section className="order-lookup__form-card">
            <form className="order-form" onSubmit={handleSubmit}>
              <label>
                Mã đơn hàng
                <input
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  placeholder="Ví dụ: MZ202605210001"
                  required
                />
              </label>
              <label>
                Số điện thoại mua hàng
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Ví dụ: 0901234567"
                  required
                />
              </label>
              <button type="submit" disabled={loading}>
                {loading ? 'Đang tra cứu...' : 'Tra cứu ngay'}
              </button>
            </form>
          </section>
        </div>

        {submitted && loading && <section className="lookup-empty"><h2>Đang tra cứu đơn hàng...</h2></section>}

        {submitted && !loading && error && (
          <section className="lookup-empty">
            <h2>Không tìm thấy đơn hàng</h2>
            <p>{error}</p>
          </section>
        )}

        {submitted && !loading && order && (
          <section className="order-result">
            <div className="order-result__summary">
              <div>
                <span>Mã đơn hàng</span>
                <strong>{order.code}</strong>
              </div>
              <div>
                <span>Khách hàng</span>
                <strong>{order.customerName}</strong>
              </div>
              <div>
                <span>Ngày đặt</span>
                <strong>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</strong>
              </div>
              <div>
                <span>Trạng thái</span>
                <strong className="status-pill">{statusLabels[order.status] || order.status}</strong>
              </div>
            </div>

            <div className="order-result__body">
              <section className="order-products">
                <h2>Sản phẩm trong đơn</h2>
                {order.items.map((item) => (
                  <article className="order-product" key={item.product?._id || item.name}>
                    <img src={item.image} alt={item.name} />
                    <div>
                      <Link to={`/products/${item.product?.slug || item.product?._id || ''}`}>{item.name}</Link>
                      <span>Số lượng: {item.quantity}</span>
                    </div>
                    <strong>{formatPrice(item.price * item.quantity)}</strong>
                  </article>
                ))}
                <div className="order-total">
                  <span>Tổng đơn hàng</span>
                  <strong>{formatPrice(order.total)}</strong>
                </div>
              </section>

              <section className="order-tracking">
                <h2>Tiến trình đơn hàng</h2>
                <div className="tracking-list">
                  {timeline.map((step) => (
                    <div className={`tracking-step ${step.done ? 'done' : ''}`} key={step.key}>
                      <span className="tracking-dot" />
                      <div>
                        <strong>{step.label}</strong>
                        <small>{step.done ? 'Đã cập nhật' : 'Đang chờ'}</small>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="delivery-card">
                  <div>
                    <span>Thanh toán</span>
                    <strong>{order.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' : 'Chuyển khoản ngân hàng'}</strong>
                  </div>
                  <div>
                    <span>Địa chỉ giao hàng</span>
                    <strong>{order.address}</strong>
                  </div>
                </div>
              </section>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

export default OrderLookup
