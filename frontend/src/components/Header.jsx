import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { categories } from '../data/products'
import './Header.scss'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const { totalQuantity } = useCart()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <header className="header">
      <div className="header__top">
        <div className="container">
          <span>Thu cũ đổi mới trợ giá tốt</span>
          <span>Trả góp 0% qua thẻ</span>
          <span>Bảo hành rõ ràng, đổi trả nhanh</span>
        </div>
      </div>

      <div className="header__main">
        <div className="container header__main-content">
          <Link className="logo logo--badge" to="/" aria-label="MobiZone">
            <img src="/images/logos/mobizone-logo.webp" alt="MobiZone" />
          </Link>

          <div className="category-area">
            <button
              className={`btn-category ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen((value) => !value)}
              type="button"
            >
              <span className="icon">☰</span>
              <span className="text">Danh mục</span>
            </button>

            {isMenuOpen && (
              <nav className="header__dropdown-menu" aria-label="Danh mục sản phẩm">
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/products?category=${encodeURIComponent(category)}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{category}</span>
                    <span>›</span>
                  </Link>
                ))}
              </nav>
            )}
          </div>

          <form className="search-bar">
            <input type="search" placeholder="Tìm điện thoại, laptop, phụ kiện..." />
            <button className="search-btn" type="submit" aria-label="Tìm kiếm">
              🔍
            </button>
          </form>

          <nav className="header-actions" aria-label="Tiện ích">
            <a className="action-item" href="tel:18006018">
              <span className="action-icon">☎</span>
              <span className="action-text">
                <span>Hotline</span>
                <strong>1800 6018</strong>
              </span>
            </a>
            <NavLink className="action-item" to="/order-lookup">
              <span className="action-icon">▣</span>
              <span className="action-text">
                <span>Tra cứu</span>
                <strong>Đơn hàng</strong>
              </span>
            </NavLink>
            {isAuthenticated ? (
              <button className="action-item action-item--button" type="button" onClick={handleLogout}>
                <span className="action-icon">👤</span>
                <span className="action-text">
                  <span>{user?.name || user?.email}</span>
                  <strong>Đăng xuất</strong>
                </span>
              </button>
            ) : (
              <NavLink className="action-item" to="/login">
                <span className="action-icon">👤</span>
                <span className="action-text">
                  <span>Đăng nhập</span>
                  <strong>Tài khoản</strong>
                </span>
              </NavLink>
            )}
            <NavLink className="action-item action-item--cart" to="/cart">
              <span className="action-icon">🛒</span>
              <span className="action-text">
                <span>Giỏ hàng</span>
                <strong>{totalQuantity} sản phẩm</strong>
              </span>
            </NavLink>
          </nav>
        </div>
      </div>

      <div className="header__nav">
        <div className="container">
          {categories.map((category) => (
            <NavLink key={category} to={`/products?category=${encodeURIComponent(category)}`}>
              {category}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header
