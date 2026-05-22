import { Link } from 'react-router-dom';
import './CategoryRow.css';

const CATEGORIES = [
  { name: 'iPhone', icon: '/assets/cat-iphone.svg', slug: 'iphone' },
  { name: 'Samsung', icon: '/assets/cat-samsung.svg', slug: 'samsung' },
  { name: 'Xiaomi', icon: '/assets/cat-xiaomi.svg', slug: 'xiaomi' },
  { name: 'OPPO', icon: '/assets/cat-oppo.svg', slug: 'oppo' },
  { name: 'Tablet', icon: '/assets/cat-tablet.svg', slug: 'tablet' },
  { name: 'Phụ kiện', icon: '/assets/cat-accessory.svg', slug: 'phu-kien' },
];

export default function CategoryRow({ categories = [] }) {
  const items =
    categories.length > 0
      ? categories.slice(0, 8).map((c) => ({
          name: c.name,
          icon: c.image || '/assets/product-placeholder.svg',
          slug: c.slug,
        }))
      : CATEGORIES;

  return (
    <section className="figma-categories">
      <div className="figma-categories__inner">
        <h2 className="figma-categories__title">Danh mục nổi bật</h2>
        <div className="figma-categories__grid">
          {items.map((cat) => (
            <Link key={cat.slug} to={`/danh-muc/${cat.slug}`} className="figma-categories__item">
              <img src={cat.icon} alt={cat.name} width={64} height={64} />
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
