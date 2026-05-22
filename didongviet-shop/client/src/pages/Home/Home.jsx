import { useEffect, useState } from 'react';
import TopBar from '../../components/figma/TopBar/TopBar';
import SiteHeader from '../../components/figma/SiteHeader/SiteHeader';
import MainNav from '../../components/figma/MainNav/MainNav';
import HeroBanner from '../../components/figma/HeroBanner/HeroBanner';
import ServiceStrip from '../../components/figma/ServiceStrip/ServiceStrip';
import CategoryRow from '../../components/figma/CategoryRow/CategoryRow';
import FlashSale from '../../components/figma/FlashSale/FlashSale';
import ProductSection from '../../components/figma/ProductSection/ProductSection';
import SiteFooter from '../../components/figma/SiteFooter/SiteFooter';
import { getCategories } from '../../services/categoryService';
import { getProducts } from '../../services/productService';
import { ROUTES } from '../../constants/routes';
import './Home.css';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getCategories().then((r) => r.data.data || []),
      getProducts({ featured: 'true', limit: 10 }).then((r) => r.data.data || []),
      getProducts({ sort: 'price_desc', limit: 5 }).then((r) => r.data.data || []),
    ])
      .then(([cats, feat, sale]) => {
        setCategories(cats);
        setFeatured(feat);
        setSaleProducts(sale.filter((p) => p.salePrice && p.salePrice < p.price));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home-page">
      <TopBar />
      <SiteHeader />
      <MainNav />

      <main className="home-page__main">
        <HeroBanner />
        <ServiceStrip />
        <CategoryRow categories={categories} />

        {!loading && (
          <>
            <FlashSale products={saleProducts.length ? saleProducts : featured} />
            <ProductSection
              title="Điện thoại nổi bật"
              products={featured}
              viewAllLink={ROUTES.PRODUCTS}
            />
          </>
        )}

        {loading && (
          <div className="home-page__loading">Đang tải sản phẩm...</div>
        )}

        <section className="home-page__promo">
          <img src="/assets/banner-side-1.svg" alt="Khuyến mãi Samsung" />
          <img src="/assets/banner-side-2.svg" alt="Khuyến mãi Xiaomi" />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
