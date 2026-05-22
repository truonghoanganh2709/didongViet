import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import './MainNav.css';

const NAV_ITEMS = [
  { label: 'iPhone', slug: 'iphone' },
  { label: 'Samsung', slug: 'samsung' },
  { label: 'Xiaomi', slug: 'xiaomi' },
  { label: 'OPPO', slug: 'oppo' },
  { label: 'Tablet', slug: 'tablet' },
  { label: 'Phụ kiện', slug: 'phu-kien' },
];

export default function MainNav() {
  return (
    <nav className="figma-nav">
      <div className="figma-nav__inner">
        <button type="button" className="figma-nav__menu">
          ☰ Danh mục
        </button>
        <ul className="figma-nav__list">
          {NAV_ITEMS.map((item) => (
            <li key={item.slug}>
              <Link to={`/danh-muc/${item.slug}`}>{item.label}</Link>
            </li>
          ))}
          <li>
            <Link to={ROUTES.PRODUCTS} className="figma-nav__hot">
              Khuyến mãi HOT
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
