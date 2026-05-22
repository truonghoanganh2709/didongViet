import styles from './Pagination.module.css';

export default function Pagination({ page, pages, onPageChange }) {
  if (pages <= 1) return null;

  const items = [];
  for (let i = 1; i <= pages; i += 1) {
    if (i === 1 || i === pages || Math.abs(i - page) <= 1) {
      items.push(i);
    } else if (items[items.length - 1] !== '...') {
      items.push('...');
    }
  }

  return (
    <nav className={styles.pagination} aria-label="Phân trang">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className={styles.btn}
      >
        ‹ Trước
      </button>
      {items.map((item, idx) =>
        item === '...' ? (
          <span key={`dots-${idx}`} className={styles.dots}>
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            className={`${styles.btn} ${item === page ? styles.active : ''}`}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        )
      )}
      <button
        type="button"
        disabled={page >= pages}
        onClick={() => onPageChange(page + 1)}
        className={styles.btn}
      >
        Sau ›
      </button>
    </nav>
  );
}
