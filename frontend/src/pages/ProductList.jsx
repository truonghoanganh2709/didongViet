import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { categories, products as mockProducts } from '../data/products'
import { productService } from '../services/productService'
import { normalizeProducts } from '../utils/productMapper'

const allLabel = 'Tất cả'

const priceRanges = [
  { label: 'Tất cả giá', min: 0, max: Infinity },
  { label: 'Dưới 5 triệu', min: 0, max: 5000000 },
  { label: '5 - 10 triệu', min: 5000000, max: 10000000 },
  { label: '10 - 20 triệu', min: 10000000, max: 20000000 },
  { label: 'Trên 20 triệu', min: 20000000, max: Infinity },
]

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || allLabel
  const [category, setCategory] = useState(initialCategory)
  const [brand, setBrand] = useState(allLabel)
  const [priceRange, setPriceRange] = useState(priceRanges[0].label)
  const [sort, setSort] = useState('featured')
  const [keyword, setKeyword] = useState('')
  const [apiProducts, setApiProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    queueMicrotask(() => {
      setCategory(searchParams.get('category') || allLabel)
    })
  }, [searchParams])

  useEffect(() => {
    let mounted = true

    const loadProducts = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await productService.getProducts()
        if (mounted) setApiProducts(normalizeProducts(data.products))
      } catch {
        if (mounted) {
          setApiProducts([])
          setError('Không tải được sản phẩm từ server, đang dùng dữ liệu mẫu.')
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadProducts()

    return () => {
      mounted = false
    }
  }, [])

  const sourceProducts = apiProducts.length > 0 ? apiProducts : mockProducts
  const brands = useMemo(() => [allLabel, ...new Set(sourceProducts.map((product) => product.brand))], [sourceProducts])

  const filteredProducts = useMemo(() => {
    const range = priceRanges.find((item) => item.label === priceRange) || priceRanges[0]

    return sourceProducts
      .filter((product) => category === allLabel || product.category === category)
      .filter((product) => brand === allLabel || product.brand === brand)
      .filter((product) => product.price >= range.min && product.price < range.max)
      .filter((product) => product.name.toLowerCase().includes(keyword.trim().toLowerCase()))
      .sort((a, b) => {
        if (sort === 'price-asc') return a.price - b.price
        if (sort === 'price-desc') return b.price - a.price
        if (sort === 'discount') return b.discount - a.discount
        return b.rating - a.rating
      })
  }, [brand, category, keyword, priceRange, sort, sourceProducts])

  const handleCategoryChange = (value) => {
    setCategory(value)
    if (value === allLabel) {
      setSearchParams({})
    } else {
      setSearchParams({ category: value })
    }
  }

  return (
    <main className="page product-list-page">
      <div className="container">
        <div className="page-heading">
          <h1>Danh sách sản phẩm</h1>
          <p>Lọc theo hãng, giá, danh mục và tìm kiếm theo tên sản phẩm.</p>
        </div>

        <section className="filters">
          <label>
            Tìm kiếm
            <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="Nhập tên sản phẩm" />
          </label>
          <label>
            Danh mục
            <select value={category} onChange={(event) => handleCategoryChange(event.target.value)}>
              <option>{allLabel}</option>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            Hãng
            <select value={brand} onChange={(event) => setBrand(event.target.value)}>
              {brands.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            Khoảng giá
            <select value={priceRange} onChange={(event) => setPriceRange(event.target.value)}>
              {priceRanges.map((item) => (
                <option key={item.label}>{item.label}</option>
              ))}
            </select>
          </label>
          <label>
            Sắp xếp
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="featured">Nổi bật</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
              <option value="discount">Giảm giá nhiều</option>
            </select>
          </label>
        </section>

        {loading && <div className="notice">Đang tải sản phẩm...</div>}
        {error && <div className="notice notice--warning">{error}</div>}
        <div className="result-count">{filteredProducts.length} sản phẩm phù hợp</div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default ProductList
