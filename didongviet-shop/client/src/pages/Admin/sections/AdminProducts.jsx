import { useEffect, useState } from 'react';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../../services/productService';
import { getCategories } from '../../../services/categoryService';
import { formatPrice } from '../../../utils/formatPrice';
import Button from '../../../components/common/Button/Button';
import styles from '../AdminDashboardPage.module.css';

const emptyForm = {
  name: '',
  brand: '',
  category: '',
  price: '',
  salePrice: '',
  stock: '',
  description: '',
  isFeatured: false,
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const [pRes, cRes] = await Promise.all([
        getProducts({ limit: 100 }),
        getCategories(),
      ]);
      setProducts(pRes.data.data);
      setCategories(cRes.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm({
      ...emptyForm,
      category: categories[0]?._id || '',
    });
    setShowForm(true);
  };

  const openEdit = (p) => {
    setEditingId(p._id);
    setForm({
      name: p.name,
      brand: p.brand,
      category: p.category?._id || p.category,
      price: p.price,
      salePrice: p.salePrice || '',
      stock: p.stock,
      description: p.description || '',
      isFeatured: p.isFeatured || false,
    });
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
      salePrice: form.salePrice ? Number(form.salePrice) : undefined,
      stock: Number(form.stock),
    };
    try {
      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await createProduct(payload);
      }
      setShowForm(false);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Xóa "${name}"?`)) return;
    try {
      await deleteProduct(id);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Đang tải...</p>;

  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <h2>Quản lý sản phẩm</h2>
        <Button type="button" onClick={openCreate}>
          + Thêm sản phẩm
        </Button>
      </div>

      {showForm && (
        <form className={styles.adminForm} onSubmit={handleSave}>
          <h3>{editingId ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</h3>
          <div className={styles.formGrid}>
            <input placeholder="Tên sản phẩm *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <input placeholder="Hãng *" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} required />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required>
              <option value="">Danh mục</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
            <input type="number" placeholder="Giá *" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            <input type="number" placeholder="Giá KM" value={form.salePrice} onChange={(e) => setForm({ ...form, salePrice: e.target.value })} />
            <input type="number" placeholder="Tồn kho *" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
          </div>
          <textarea placeholder="Mô tả" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
          <label>
            <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
            Sản phẩm nổi bật
          </label>
          <div className={styles.formActions}>
            <Button type="submit">Lưu</Button>
            <button type="button" className={styles.cancelBtn} onClick={() => setShowForm(false)}>Hủy</button>
          </div>
        </form>
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Hãng</th>
            <th>Giá</th>
            <th>Kho</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.brand}</td>
              <td>{formatPrice(p.salePrice && p.salePrice < p.price ? p.salePrice : p.price)}</td>
              <td>{p.stock}</td>
              <td className={styles.actions}>
                <button type="button" onClick={() => openEdit(p)}>Sửa</button>
                <button type="button" onClick={() => handleDelete(p._id, p.name)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
