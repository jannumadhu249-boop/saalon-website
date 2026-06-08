import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import YetAnotherReactLightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import ProductCard from '../../components/ui/ProductCard'
import { useCart } from '../../context/CartContext'
import { products } from '../../data/products'

const ShopDetailsPage = () => {
  const { slug } = useParams()
  const product = products.find(p => p.slug === slug)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [quantity, setQuantity] = useState(1)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart()

  if (!product) {
    return (
      <PageWrapper title="Product Not Found">
        <div className="container py-5">
          <div className="text-center">
            <h2>Product Not Found</h2>
            <p>The product you're looking for doesn't exist.</p>
            <Link to="/shop" className="th-btn style1">Back to Shop</Link>
          </div>
        </div>
      </PageWrapper>
    )
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const images = [
    { src: product.image },
    ...(product.images?.slice(1).map(img => ({ src: img })) || [])
  ]

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product.id)
    }
  }

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: product.name, path: `/shop/${slug}` }
  ]

  return (
    <PageWrapper title={product.name}>
      <Breadcrumb items={breadcrumbItems} />
      
      <section className="product-details space overflow-hidden">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <div 
                  className="product-gallery" 
                  onClick={() => setLightboxOpen(true)}
                  style={{ cursor: 'pointer' }}
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    style={{ width: '100%', borderRadius: '16px' }}
                  />
                </div>

                <YetAnotherReactLightbox
                  open={lightboxOpen}
                  close={() => setLightboxOpen(false)}
                  slides={images}
                />
              </motion.div>
            </div>

            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span style={{ color: '#888' }}>{product.category}</span>
                <h1 style={{ fontFamily: 'var(--font-heading)', marginTop: '8px', marginBottom: '16px' }}>
                  {product.name}
                </h1>

                <div className="product-rating mb-3">
                  {[...Array(5)].map((_, i) => (
                    <i 
                      key={i} 
                      className={`fas fa-star ${i < product.rating ? 'text-theme' : ''}`}
                      style={{ color: i < product.rating ? '#FF752B' : '#ddd' }}
                    ></i>
                  ))}
                  <span style={{ marginLeft: '8px', color: '#888' }}>
                    ({product.reviewCount} reviews)
                  </span>
                </div>

                <div className="product-price mb-4">
                  <span style={{ 
                    fontSize: '32px', 
                    fontWeight: 700, 
                    color: '#FF752B' 
                  }}>
                    ₹{product.price}
                  </span>
                  {product.salePrice && (
                    <span style={{ 
                      fontSize: '20px', 
                      color: '#999', 
                      textDecoration: 'line-through',
                      marginLeft: '12px' 
                    }}>
                      ₹{product.salePrice}
                    </span>
                  )}
                </div>

                <p style={{ color: 'var(--color-body)', lineHeight: '1.8', marginBottom: '24px' }}>
                  {product.description}
                </p>

                <div className="product-meta mb-4">
                  <div className="d-flex gap-3 align-items-center mb-3">
                    <span style={{ fontWeight: 600 }}>Quantity:</span>
                    <div className="quantity" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        style={{ 
                          width: '36px', 
                          height: '36px', 
                          border: '1px solid #ddd', 
                          background: 'transparent',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <input 
                        type="number" 
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        style={{ 
                          width: '50px', 
                          textAlign: 'center',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          padding: '8px'
                        }}
                      />
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        style={{ 
                          width: '36px', 
                          height: '36px', 
                          border: '1px solid #ddd', 
                          background: 'transparent',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="product-actions d-flex gap-3">
                  <button onClick={handleAddToCart} className="th-btn style1">
                    Add to Cart
                  </button>
                  <button 
                    onClick={handleWishlistToggle}
                    className="th-btn"
                    style={{ 
                      border: '1px solid #ddd',
                      background: isInWishlist(product.id) ? '#FF752B' : 'transparent',
                      color: isInWishlist(product.id) ? '#fff' : '#333'
                    }}
                  >
                    <i className={`fas fa-heart ${isInWishlist(product.id) ? 'fas' : ''}`}></i>
                  </button>
                </div>

                <div className="product-info mt-4" style={{ borderTop: '1px solid #eee', paddingTop: '16px' }}>
                  <p style={{ margin: '8px 0' }}><strong>SKU:</strong> {product.sku}</p>
                  <p style={{ margin: '8px 0' }}><strong>Category:</strong> {product.category}</p>
                  <p style={{ margin: '8px 0' }}>
                    <strong>Availability:</strong> 
                    <span style={{ color: product.inStock ? '#28a745' : '#dc3545' }}>
                      {product.inStock ? ' In Stock' : ' Out of Stock'}
                    </span>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="related-products mt-5">
              <h3 className="mb-4">Related Products</h3>
              <div className="row g-4">
                {relatedProducts.map(rel => (
                  <div key={rel.id} className="col-md-6 col-xl-3">
                    <ProductCard {...rel} onAddToCart={(p) => addToCart(p)} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  )
}

export default ShopDetailsPage