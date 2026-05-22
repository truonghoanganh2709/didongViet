import { useEffect, useState } from 'react';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../../services/categoryService';
import Button from '../../../components/common/Button/Button';
import styles from '../AdminDashboardPage.module.css';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    const { data } = await getCategories();
    setCategories(data.data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      if (editingId) {
        await updateCategory(editingId, { name });
      } else {
        await createCategory({ name });
      }
      setName('');
      setEditingId(null);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (cat) => {
    setEditingId(cat._id);
    setName(cat.name);
  };

  const handleDelete = async (id, catName) => {
    if (!window.confirm(`Xóa danh mục "${catName}"?`)) return;
    try {
      await deleteCategory(id);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section className={styles.section}>
      <h2>Quản lý danh mục</h2>
      <form className={styles.inlineForm} onSubmit={handleSubmit}>
        <input
          placeholder="Tên danh mục"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Button type="submit">{editingId ? 'Cập nhật' : 'Thêm'}</Button>
        {editingId && (
          <button type="button" className={styles.cancelBtn} onClick={() => { setEditingId(null); setName(''); }}>
            Hủy
          </button>
        )}
      </form>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Slug</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.slug}</td>
              <td className={styles.actions}>
                <button type="button" onClick={() => handleEdit(c)}>Sửa</button>
                <button type="button" onClick={() => handleDelete(c._id, c.name)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
