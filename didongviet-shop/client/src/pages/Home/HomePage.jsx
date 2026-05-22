import { useEffect, useState } from 'react';
import BannerCarousel from '../../components/home/BannerCarousel/BannerCarousel';
import CategorySection from '../../components/home/CategorySection/CategorySection';
import ProductGrid from '../../components/product/ProductGrid/ProductGrid';
import Loader from '../../components/common/Loader/Loader';
import { getCategories } from '../../services/categoryService';
import { getProducts } from '../../services/productService';
import styles from './HomePage.module.css';

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getCategories().then((r) => r.data.data),
      getProducts({ featured: 'true', limit: 8 }).then((r) => r.data.data),
    ])
      .then(([cats, prods]) => {
        setCategories(cats);
        setProducts(prods);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container">
      <BannerCarousel />
      <CategorySection categories={categories} />
      <section className={styles.featured}>
        <h2 className="pageTitle">Sản phẩm nổi bật</h2>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
