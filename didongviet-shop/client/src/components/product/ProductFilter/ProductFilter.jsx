import styles from './ProductFilter.module.css';

export default function ProductFilter({ filters, brands, onChange }) {
  const handle = (key, value) => {
    onChange({ ...filters, [key]: value, page: 1 });
  };

  return (
    <aside className={styles.filter}>
      <h3>Bộ lọc</h3>

      <label className={styles.field}>
        Sắp xếp
        <select value={filters.sort} onChange={(e) => handle('sort', e.target.value)}>
          <option value="newest">Mới nhất</option>
          <option value="price_asc">Giá tăng dần</option>
          <option value="price_desc">Giá giảm dần</option>
          <option value="name">Tên A-Z</option>
          <option value="rating">Đánh giá cao</option>
        </select>
      </label>

      <label className={styles.field}>
        Hãng
        <select value={filters.brand} onChange={(e) => handle('brand', e.target.value)}>
          <option value="">Tất cả</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        Giá tối thiểu
        <input
          type="number"
          min={0}
          step={1000000}
          value={filters.minPrice}
          onChange={(e) => handle('minPrice', e.target.value)}
          placeholder="0"
        />
      </label>

      <label className={styles.field}>
        Giá tối đa
        <input
          type="number"
          min={0}
          step={1000000}
          value={filters.maxPrice}
          onChange={(e) => handle('maxPrice', e.target.value)}
          placeholder="50000000"
        />
      </label>

      <button
        type="button"
        className={styles.reset}
        onClick={() =>
          onChange({
            sort: 'newest',
            brand: '',
            minPrice: '',
            maxPrice: '',
            page: 1,
          })
        }
      >
        Xóa bộ lọc
      </button>
    </aside>
  );
}
