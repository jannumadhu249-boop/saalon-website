import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import ProductCard from '../../components/ui/ProductCard'
import SectionTitle from '../../components/ui/SectionTitle'
import { products } from '../../data/products'

const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortBy, setSortBy] = useState('default')
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const categories = ['All', ...new Set(products.map(p => p.category))]

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory)

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return (a.salePrice || a.price) - (b.salePrice || b.price)
      case 'price-high':
        return (b.salePrice || b.price) - (a.salePrice || a.price)
      case 'newest':
        return b.id - a.id
      default:
        return 0
    }
  })

  const handleAddToCart = (product) => {
    console.log('Add to cart:', product.name)
  }

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' }
  ]

  return (
    <PageWrapper title="Shop">
      <Breadcrumb items={breadcrumbItems} />
      
      <section className="shop-sec space overflow-hidden">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-7">
              <SectionTitle
                subtitle="Our Products"
                title="Shop Now"
                description="Browse our collection of premium beauty and wellness products."
                align="center"
              />
            </div>
          </div>

          <div className="row g-4 mb-5">
            <div className="col-md-6 col-lg-4">
              <div className="shop-filters" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`th-btn ${activeCategory === cat ? 'style1' : 'style2'}`}
                    style={{ 
                      background: activeCategory === cat ? '#FF752B' : 'transparent',
                      border: activeCategory === cat ? 'none' : '1px solid #ddd',
                      color: activeCategory === cat ? '#fff' : '#333'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="col-md-6 col-lg-4 text-md-end">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ 
                  padding: '12px 16px', 
                  border: '1px solid #ddd', 
                  borderRadius: '8px',
                  minWidth: '200px'
                }}
              >
                <option value="default">Default Sort</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          <div className="row gy-4" ref={ref}>
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="col-md-6 col-xl-4"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard 
                  {...product}
                  onAddToCart={handleAddToCart}
                />
              </motion.div>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-5">
              <p>No products found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  )
}

export default ShopPage