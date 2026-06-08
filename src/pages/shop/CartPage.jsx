import { Link } from 'react-router-dom'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import { useCart } from '../../context/CartContext'

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, cartTotal } = useCart()
  const shipping = 10
  const total = cartTotal + shipping

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Cart', path: '/cart' }
  ]

  if (items.length === 0) {
    return (
      <PageWrapper title="Shopping Cart">
        <Breadcrumb items={breadcrumbItems} />
        <section className="space overflow-hidden">
          <div className="container">
            <div className="text-center py-5">
              <h2>Your Cart is Empty</h2>
              <p>Looks like you haven't added any items to your cart yet.</p>
              <Link to="/shop" className="th-btn style1 mt-4">
                Continue Shopping
              </Link>
            </div>
          </div>
        </section>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper title="Shopping Cart">
      <Breadcrumb items={breadcrumbItems} />
      
      <section className="cart-sec space overflow-hidden">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8">
              <div className="cart-table">
                <div className="table-responsive">
                  <table className="table" style={{ minWidth: '600px' }}>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map(item => (
                        <tr key={item.productId}>
                          <td>
                            <div className="d-flex align-items-center gap-3">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                              />
                              <div>
                                <h5 style={{ margin: 0 }}>{item.name}</h5>
                                <span style={{ fontSize: '14px', color: '#888' }}>
                                  ₹{item.price.toFixed(2)} each
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>₹{item.price.toFixed(2)}</td>
                          <td>
                            <div className="quantity" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <button 
                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                style={{ 
                                  width: '28px', 
                                  height: '28px', 
                                  border: '1px solid #ddd', 
                                  background: 'transparent',
                                  borderRadius: '4px',
                                  cursor: 'pointer'
                                }}
                              >
                                <i className="fas fa-minus" style={{ fontSize: '10px' }}></i>
                              </button>
                              <input 
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 1)}
                                style={{ 
                                  width: '40px', 
                                  textAlign: 'center',
                                  border: '1px solid #ddd',
                                  borderRadius: '4px',
                                  padding: '4px'
                                }}
                              />
                              <button 
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                style={{ 
                                  width: '28px', 
                                  height: '28px', 
                                  border: '1px solid #ddd', 
                                  background: 'transparent',
                                  borderRadius: '4px',
                                  cursor: 'pointer'
                                }}
                              >
                                <i className="fas fa-plus" style={{ fontSize: '10px' }}></i>
                              </button>
                            </div>
                          </td>
                          <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                          <td>
                            <button 
                              onClick={() => removeFromCart(item.productId)}
                              style={{ 
                                background: 'none', 
                                border: 'none', 
                                cursor: 'pointer',
                                color: '#dc3545'
                              }}
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="cart-summary" style={{
                background: '#f9f9f9',
                padding: '24px',
                borderRadius: '12px'
              }}>
                <h4 className="mb-4">Cart Summary</h4>
                
                <div className="summary-row d-flex justify-content-between mb-3">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                
                <div className="summary-row d-flex justify-content-between mb-3">
                  <span>Shipping</span>
                  <span>₹{shipping.toFixed(2)}</span>
                </div>
                
                <div className="summary-total d-flex justify-content-between pt-3" style={{ borderTop: '1px solid #ddd' }}>
                  <span style={{ fontWeight: 700 }}>Total</span>
                  <span style={{ fontWeight: 700, fontSize: '20px', color: '#FF752B' }}>
                    ₹{total.toFixed(2)}
                  </span>
                </div>

                <Link to="/checkout" className="th-btn style1 w-100 mt-4">
                  Proceed to Checkout
                </Link>
                
                <Link to="/shop" className="th-btn style2 w-100 mt-3">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

export default CartPage