import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../../services/categoryService';
import { ROUTES } from '../../../constants/routes';
import styles from './NavigationMenu.module.css';

export default function NavigationMenu() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then(({ data }) => setCategories(data.data || []))
      .catch(() => setCategories([]));
  }, []);

  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <Link to={ROUTES.HOME} className={styles.item}>
          Trang chủ
        </Link>
        <Link to={ROUTES.PRODUCTS} className={styles.item}>
          Tất cả sản phẩm
        </Link>
        {categories.map((cat) => (
          <Link key={cat._id} to={`/danh-muc/${cat.slug}`} className={styles.item}>
            {cat.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
