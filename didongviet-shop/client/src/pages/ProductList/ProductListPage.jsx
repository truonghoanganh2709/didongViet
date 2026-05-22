import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductGrid from '../../components/product/ProductGrid/ProductGrid';
import ProductFilter from '../../components/product/ProductFilter/ProductFilter';
import Pagination from '../../components/common/Pagination/Pagination';
import Loader from '../../components/common/Loader/Loader';
import { getProducts, getBrands } from '../../services/productService';
import { getCategoryBySlug } from '../../services/categoryService';
import styles from './ProductListPage.module.css';

const defaultFilters = {
  sort: 'newest',
  brand: '',
  minPrice: '',
  maxPrice: '',
  page: 1,
};

export default function ProductListPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [filters, setFilters] = useState(defaultFilters);
  const [brands, setBrands] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [title, setTitle] = useState('Tất cả sản phẩm');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBrands()
      .then(({ data }) => setBrands(data.data || []))
      .catch(() => setBrands([]));
  }, []);

  useEffect(() => {
    const resolveCategory = async () => {
      if (slug) {
        try {
          const { data } = await getCategoryBySlug(slug);
          setCategoryId(data.data._id);
          setTitle(data.data.name);
        } catch {
          setCategoryId('');
        }
      } else if (q) {
        setTitle(`Kết quả: "${q}"`);
        setCategoryId('');
      } else {
        setTitle('Tất cả sản phẩm');
        setCategoryId('');
      }
    };
    resolveCategory();
  }, [slug, q]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const params = {
          page: filters.page,
          limit: 12,
          sort: filters.sort === 'newest' ? undefined : filters.sort,
        };
        if (categoryId) params.category = categoryId;
        if (q) params.q = q;
        if (filters.brand) params.brand = filters.brand;
        if (filters.minPrice) params.minPrice = filters.minPrice;
        if (filters.maxPrice) params.maxPrice = filters.maxPrice;

        const { data } = await getProducts(params);
        setProducts(data.data);
        setPagination({
          page: data.pagination.page,
          pages: data.pagination.pages,
        });
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [filters, categoryId, q]);

  return (
    <div className="container">
      <h1 className="pageTitle">{title}</h1>
      <div className={styles.layout}>
        <ProductFilter filters={filters} brands={brands} onChange={setFilters} />
        <div className={styles.main}>
          {loading ? (
            <Loader />
          ) : (
            <>
              <ProductGrid products={products} />
              <Pagination
                page={pagination.page}
                pages={pagination.pages}
                onPageChange={(page) => setFilters((f) => ({ ...f, page }))}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
