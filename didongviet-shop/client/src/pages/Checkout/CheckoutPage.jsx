import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import { createOrder } from '../../services/orderService';
import { validateCoupon } from '../../services/couponService';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { formatPrice } from '../../utils/formatPrice';
import { ROUTES } from '../../constants/routes';
import styles from './CheckoutPage.module.css';

export default function CheckoutPage() {
  const { user } = useAuth();
  const { cart, fetchCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    ward: user?.address?.ward || '',
    district: user?.address?.district || '',
    city: user?.address?.city || '',
    paymentMethod: 'cod',
    note: '',
  });
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [loading, setLoading] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);
  const [error, setError] = useState('');
  const [couponMsg, setCouponMsg] = useState('');

  const items = cart?.items || [];
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shippingFee = 30000;
  const total = Math.max(0, subtotal + shippingFee - discount);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponMsg('');
    try {
      const { data } = await validateCoupon(couponCode.trim(), subtotal);
      setDiscount(data.data.discount);
      setAppliedCoupon(data.data.code);
      setCouponMsg(`Áp dụng mã ${data.data.code} thành công`);
    } catch (err) {
      setDiscount(0);
      setAppliedCoupon('');
      setCouponMsg(err.message);
    } finally {
      setCouponLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createOrder({
        shippingAddress: {
          name: form.name,
          phone: form.phone,
          street: form.street,
          ward: form.ward,
          district: form.district,
          city: form.city,
        },
        paymentMethod: form.paymentMethod,
        note: form.note,
        shippingFee,
        couponCode: appliedCoupon,
      });
      await fetchCart();
      navigate(ROUTES.ORDERS);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!items.length) {
    return (
      <div className="container">
        <p>Giỏ hàng trống. Không thể thanh toán.</p>
      </div>
    );
  }

  return (
    <div className={`container ${styles.page}`}>
      <h1 className="pageTitle">Thanh toán</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.fields}>
          <Input label="Họ tên" name="name" value={form.name} onChange={handleChange} required />
          <Input label="Số điện thoại" name="phone" value={form.phone} onChange={handleChange} required />
          <Input label="Địa chỉ" name="street" value={form.street} onChange={handleChange} required />
          <Input label="Phường/Xã" name="ward" value={form.ward} onChange={handleChange} />
          <Input label="Quận/Huyện" name="district" value={form.district} onChange={handleChange} />
          <Input label="Tỉnh/Thành phố" name="city" value={form.city} onChange={handleChange} required />
          <label className={styles.selectLabel}>
            Phương thức thanh toán
            <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
              <option value="cod">COD - Thanh toán khi nhận</option>
              <option value="bank_transfer">Chuyển khoản</option>
              <option value="momo">MoMo</option>
            </select>
          </label>
          <Input label="Ghi chú" name="note" value={form.note} onChange={handleChange} />
        </div>
        <aside className={styles.summary}>
          <p>Tạm tính: {formatPrice(subtotal)}</p>
          <p>Phí ship: {formatPrice(shippingFee)}</p>
          {discount > 0 && <p className={styles.discount}>Giảm giá: -{formatPrice(discount)}</p>}

          <div className={styles.coupon}>
            <input
              type="text"
              placeholder="Mã giảm giá (DDV10, GIAM500K...)"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            />
            <button type="button" onClick={handleApplyCoupon} disabled={couponLoading}>
              {couponLoading ? '...' : 'Áp dụng'}
            </button>
          </div>
          {couponMsg && <p className={styles.couponMsg}>{couponMsg}</p>}

          <p className={styles.total}>Tổng: {formatPrice(total)}</p>
          {error && <p className={styles.error}>{error}</p>}
          <Button type="submit" disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Đặt hàng'}
          </Button>
        </aside>
      </form>
    </div>
  );
}
