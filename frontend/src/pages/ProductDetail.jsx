import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { findProductById, products as mockProducts } from '../data/products'
import { productService } from '../services/productService'
import { formatPrice } from '../utils/format'
import { normalizeProduct, normalizeProducts } from '../utils/productMapper'

const ProductDetail = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [apiProducts, setApiProducts] = useState([])
  const [product, setProduct] = useState(() => findProductById(id))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    const loadProduct = async () => {
      setLoading(true)
      setError('')
      try {
        const [detailData, listData] = await Promise.all([
          productService.getProductById(id),
          productService.getProducts(),
        ])
        if (mounted) {
          setProduct(normalizeProduct(detailData.product))
          setApiProducts(normalizeProducts(listData.products))
        }
      } catch {
        if (mounted) {
          setProduct(findProductById(id))
          setApiProducts([])
          setError('Không tải được sản phẩm từ server, đang dùng dữ liệu mẫu.')
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadProduct()

    return () => {
      mounted = false
    }
  }, [id])

  if (!product) {
    return (
      <main className="page">
        <div className="container empty-state">
          <h1>Không tìm thấy sản phẩm</h1>
          <Link to="/products">Quay lại danh sách</Link>
        </div>
      </main>
    )
  }

  const productSource = apiProducts.length > 0 ? apiProducts : mockProducts
  const relatedProducts = productSource
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 5)

  const handleAddToCart = async () => {
    const productId = product.mongoId || product._id
    if (!productId) {
      alert('Sản phẩm mẫu chưa có trong database. Vui lòng seed sản phẩm trước.')
      return
    }

    try {
      await addToCart(productId, 1)
      alert('Đã thêm sản phẩm vào giỏ hàng')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <main className="page product-detail-page">
      <div className="container">
        {loading && <div className="notice">Đang tải sản phẩm...</div>}
        {error && <div className="notice notice--warning">{error}</div>}

        <div className="product-detail">
          <section className="product-detail__gallery">
            <img src={product.image} alt={product.name} />
          </section>

          <section className="product-detail__info">
            <span className="product-detail__category">{product.category}</span>
            <h1>{product.name}</h1>
            <div className="product-detail__rating">★★★★★ {product.rating}</div>
            <div className="product-detail__price">
              <strong>{formatPrice(product.price)}</strong>
              <span>{formatPrice(product.oldPrice)}</span>
              <em>-{product.discount}%</em>
            </div>

            <div className="option-group">
              <h3>Màu sắc</h3>
              <div>
                <button type="button">Đen</button>
                <button type="button">Trắng</button>
                <button type="button">Titan tự nhiên</button>
              </div>
            </div>

            <div className="option-group">
              <h3>Dung lượng</h3>
              <div>
                <button type="button">128GB</button>
                <button type="button">256GB</button>
                <button type="button">512GB</button>
              </div>
            </div>

            <div className="promotion-box">
              <h3>Khuyến mãi</h3>
              <p>{product.promotion}</p>
              <p>Miễn phí giao hàng nội thành cho đơn từ 500.000đ.</p>
            </div>

            <div className="buy-actions">
              <button type="button" className="buy-now" onClick={handleAddToCart}>Mua ngay</button>
              <button type="button" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
            </div>
          </section>
        </div>

        <div className="detail-panels">
          <section>
            <h2>Mô tả sản phẩm</h2>
            <p>{product.description}</p>
          </section>
          <section>
            <h2>Thông số kỹ thuật</h2>
            <ul>
              {product.specs.map((spec) => (
                <li key={spec}>{spec}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2>Chính sách bảo hành</h2>
            <ul>
              <li>Bảo hành chính hãng theo từng nhóm sản phẩm.</li>
              <li>Hỗ trợ đổi trả trong 7 ngày nếu phát sinh lỗi phần cứng.</li>
              <li>Hỗ trợ trả góp và giao hàng nhanh trong khu vực nội thành.</li>
            </ul>
          </section>
        </div>

        {relatedProducts.length > 0 && (
          <section className="related-products">
            <h2>Sản phẩm liên quan</h2>
            <div className="product-grid">
              {relatedProducts.map((item) => (
                <ProductCard product={item} key={item.id} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

export default ProductDetail
