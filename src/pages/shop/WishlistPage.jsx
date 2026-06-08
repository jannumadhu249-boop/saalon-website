import { Link } from 'react-router-dom'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import ProductCard from '../../components/ui/ProductCard'
import { useCart } from '../../context/CartContext'
import { products } from '../../data/products'

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, addToCart } = useCart()
  
  const wishlistProducts = products.filter(p => wishlist.includes(p.id))

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Wishlist', path: '/wishlist' }
  ]

  if (wishlistProducts.length === 0) {
    return (
      <PageWrapper title="Wishlist">
        <Breadcrumb items={breadcrumbItems} />
        <section className="space overflow-hidden">
          <div className="container">
            <div className="text-center py-5">
              <h2>Your Wishlist is Empty</h2>
              <p>Save your favorite products to purchase later.</p>
              <Link to="/shop" className="th-btn style1 mt-4">
                Browse Products
              </Link>
            </div>
          </div>
        </section>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper title="Wishlist">
      <Breadcrumb items={breadcrumbItems} />
      
      <section className="wishlist-sec space overflow-hidden">
        <div className="container">
          <h3 className="mb-4">My Wishlist ({wishlistProducts.length} items)</h3>
          
          <div className="row g-4">
            {wishlistProducts.map(product => (
              <div key={product.id} className="col-md-6 col-xl-4">
                <div className="wishlist-item" style={{
                  background: '#fff',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
                }}>
                  <ProductCard 
                    {...product}
                    onAddToCart={(p) => addToCart(p)}
                  />
                  <div className="wishlist-actions p-3" style={{ borderTop: '1px solid #eee' }}>
                    <button 
                      onClick={() => addToCart(product)}
                      className="th-btn style1 w-100"
                    >
                      Move to Cart
                    </button>
                    <button 
                      onClick={() => removeFromWishlist(product.id)}
                      className="th-btn w-100 mt-2"
                      style={{ border: '1px solid #ddd', background: 'transparent' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

export default WishlistPage