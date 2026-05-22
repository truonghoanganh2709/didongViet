import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCompareList, removeFromCompare, clearCompare } from '../../utils/compareStorage';
import { formatPrice } from '../../utils/formatPrice';
import { ROUTES } from '../../constants/routes';
import styles from './ComparePage.module.css';

const SPEC_KEYS = ['screen', 'chip', 'ram', 'storage', 'battery', 'camera', 'os', 'sim'];

export default function ComparePage() {
  const [items, setItems] = useState([]);

  const refresh = () => setItems(getCompareList());

  useEffect(() => {
    refresh();
  }, []);

  const handleRemove = (id) => {
    removeFromCompare(id);
    refresh();
  };

  if (!items.length) {
    return (
      <div className="container">
        <h1 className="pageTitle">So sánh sản phẩm</h1>
        <p>
          Chưa có sản phẩm để so sánh (tối đa 3). Bấm ⚖ trên thẻ sản phẩm để thêm.{' '}
          <Link to={ROUTES.PRODUCTS}>Xem sản phẩm</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className={styles.head}>
        <h1 className="pageTitle">So sánh ({items.length}/3)</h1>
        <button type="button" onClick={() => { clearCompare(); refresh(); }} className={styles.clear}>
          Xóa tất cả
        </button>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Tiêu chí</th>
              {items.map((p) => (
                <th key={p._id}>
                  <button type="button" className={styles.remove} onClick={() => handleRemove(p._id)}>
                    ×
                  </button>
                  <Link to={`/san-pham/${p.slug}`}>{p.name}</Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Giá</td>
              {items.map((p) => (
                <td key={p._id}>
                  {formatPrice(p.salePrice && p.salePrice < p.price ? p.salePrice : p.price)}
                </td>
              ))}
            </tr>
            <tr>
              <td>Hãng</td>
              {items.map((p) => (
                <td key={p._id}>{p.brand}</td>
              ))}
            </tr>
            <tr>
              <td>Đánh giá</td>
              {items.map((p) => (
                <td key={p._id}>
                  {p.rating?.count ? `★ ${p.rating.average}` : '—'}
                </td>
              ))}
            </tr>
            {SPEC_KEYS.map((key) => (
              <tr key={key}>
                <td>{key}</td>
                {items.map((p) => (
                  <td key={p._id}>{p.specs?.[key] || '—'}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
