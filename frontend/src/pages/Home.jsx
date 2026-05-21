import { useEffect, useState } from 'react'
import HeroSection from '../components/HeroSection'
import QuickLinks from '../components/QuickLinks'
import BestSellers from '../components/BestSellers'
import ProductSection from '../components/ProductSection'
import Footer from '../components/Footer'
import { products as mockProducts } from '../data/products'
import { productService } from '../services/productService'
import { normalizeProducts } from '../utils/productMapper'

const byCategory = (products, category, limit = 5) =>
  products.filter((product) => product.category === category).slice(0, limit)

const Home = () => {
  const [products, setProducts] = useState(mockProducts)

  useEffect(() => {
    let mounted = true

    const loadProducts = async () => {
      try {
        const data = await productService.getProducts()
        if (mounted && data.products?.length) {
          setProducts(normalizeProducts(data.products))
        }
      } catch {
        if (mounted) setProducts(mockProducts)
      }
    }

    loadProducts()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <main className="home-page">
      <HeroSection />
      <QuickLinks />
      <BestSellers products={products} />

      <ProductSection
        title="Flash Sale hôm nay"
        subtitle="Giá tốt cho điện thoại, phụ kiện và hàng công nghệ chính hãng"
        products={products.slice().sort((a, b) => b.discount - a.discount).slice(0, 10)}
        category="Khuyến mãi"
      />

      <ProductSection
        title="iPhone nổi bật"
        subtitle="Máy mới chính hãng, hỗ trợ thu cũ đổi mới"
        products={byCategory(products, 'iPhone')}
        category="iPhone"
      />

      <ProductSection
        title="Samsung Galaxy nổi bật"
        subtitle="Flagship, điện thoại gập và dòng A bán chạy"
        products={byCategory(products, 'Samsung')}
        category="Samsung"
      />

      <ProductSection
        title="Laptop và tablet"
        subtitle="Thiết bị học tập, làm việc và giải trí"
        products={[...byCategory(products, 'Laptop', 3), ...byCategory(products, 'iPad / Tablet', 2)]}
        category="Laptop"
      />

      <ProductSection
        title="Phụ kiện nên mua kèm"
        subtitle="Sạc nhanh, tai nghe, loa và pin dự phòng"
        products={byCategory(products, 'Phụ kiện')}
        category="Phụ kiện"
      />

      <section className="tech-news">
        <div className="container">
          <div className="tech-news__header">
            <h2>Tin tức công nghệ</h2>
            <p>Cập nhật xu hướng mua sắm, mẹo dùng điện thoại và laptop.</p>
          </div>
          <div className="tech-news__grid">
            <article>
              <strong>Cách chọn điện thoại phù hợp trong tầm giá 10 triệu</strong>
              <span>So sánh màn hình, pin, camera và chính sách bảo hành trước khi mua.</span>
            </article>
            <article>
              <strong>Nên mua laptop mỏng nhẹ hay laptop hiệu năng?</strong>
              <span>Gợi ý lựa chọn theo nhu cầu học tập, văn phòng và sáng tạo nội dung.</span>
            </article>
            <article>
              <strong>Phụ kiện nào nên mua kèm điện thoại mới?</strong>
              <span>Sạc nhanh, cáp, ốp lưng và tai nghe giúp trải nghiệm trọn vẹn hơn.</span>
            </article>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Home
