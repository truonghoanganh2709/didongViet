import { Link } from 'react-router-dom';
import styles from './CategorySection.module.css';

export default function CategorySection({ categories = [] }) {
  if (!categories.length) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Danh mục nổi bật</h2>
      <div className={styles.grid}>
        {categories.map((cat) => (
          <Link key={cat._id} to={`/danh-muc/${cat.slug}`} className={styles.card}>
            <div className={styles.icon}>{cat.name.charAt(0)}</div>
            <span>{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
