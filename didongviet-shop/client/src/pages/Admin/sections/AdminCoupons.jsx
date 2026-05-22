import { useEffect, useState } from 'react';
import {
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} from '../../../services/couponService';
import Button from '../../../components/common/Button/Button';
import styles from '../AdminDashboardPage.module.css';

const empty = {
  code: '',
  type: 'percent',
  value: '',
  minOrder: '0',
  maxDiscount: '',
  usageLimit: '100',
  expiresAt: '',
};

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    const { data } = await getCoupons();
    setCoupons(data.data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      code: form.code,
      type: form.type,
      value: Number(form.value),
      minOrder: Number(form.minOrder),
      maxDiscount: form.maxDiscount ? Number(form.maxDiscount) : undefined,
      usageLimit: Number(form.usageLimit),
      expiresAt: new Date(form.expiresAt),
      isActive: true,
    };
    try {
      if (editingId) {
        await updateCoupon(editingId, payload);
      } else {
        await createCoupon(payload);
      }
      setForm(empty);
      setEditingId(null);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (c) => {
    setEditingId(c._id);
    setForm({
      code: c.code,
      type: c.type,
      value: c.value,
      minOrder: c.minOrder,
      maxDiscount: c.maxDiscount || '',
      usageLimit: c.usageLimit,
      expiresAt: c.expiresAt?.slice(0, 10) || '',
    });
  };

  const handleDelete = async (id, code) => {
    if (!window.confirm(`Xóa mã ${code}?`)) return;
    try {
      await deleteCoupon(id);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section className={styles.section}>
      <h2>Quản lý mã giảm giá</h2>
      <form className={styles.adminForm} onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <input placeholder="Mã (DDV10)" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} required />
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option value="percent">Phần trăm (%)</option>
            <option value="fixed">Số tiền cố định</option>
          </select>
          <input type="number" placeholder="Giá trị" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} required />
          <input type="number" placeholder="Đơn tối thiểu" value={form.minOrder} onChange={(e) => setForm({ ...form, minOrder: e.target.value })} />
          <input type="number" placeholder="Giảm tối đa (%) " value={form.maxDiscount} onChange={(e) => setForm({ ...form, maxDiscount: e.target.value })} />
          <input type="number" placeholder="Giới hạn lượt dùng" value={form.usageLimit} onChange={(e) => setForm({ ...form, usageLimit: e.target.value })} />
          <input type="date" value={form.expiresAt} onChange={(e) => setForm({ ...form, expiresAt: e.target.value })} required />
        </div>
        <Button type="submit">{editingId ? 'Cập nhật' : 'Thêm mã'}</Button>
      </form>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Mã</th>
            <th>Loại</th>
            <th>Giá trị</th>
            <th>Đã dùng</th>
            <th>Hết hạn</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((c) => (
            <tr key={c._id}>
              <td><strong>{c.code}</strong></td>
              <td>{c.type === 'percent' ? '%' : 'VNĐ'}</td>
              <td>{c.type === 'percent' ? `${c.value}%` : c.value.toLocaleString('vi-VN')}</td>
              <td>{c.usedCount}/{c.usageLimit}</td>
              <td>{new Date(c.expiresAt).toLocaleDateString('vi-VN')}</td>
              <td className={styles.actions}>
                <button type="button" onClick={() => handleEdit(c)}>Sửa</button>
                <button type="button" onClick={() => handleDelete(c._id, c.code)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
