import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import { useCart } from '../../context/CartContext'

const checkoutSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zip: z.string().min(5, 'Valid ZIP code required'),
  country: z.string().min(2, 'Country is required'),
  paymentMethod: z.enum(['card', 'paypal', 'cod'])
})

const CheckoutPage = () => {
  const navigate = useNavigate()
  const { items, cartTotal, clearCart } = useCart()
  const [orderSuccess, setOrderSuccess] = useState(false)
  const shipping = 10
  const total = cartTotal + shipping

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'card'
    }
  })

  const { addBooking } = useAuth()
  const onSubmit = (data) => {
    console.log('Order submitted:', data)
    console.log('Cart items:', items)
    // Create a booking record
    const bookingData = {
      items,
      total: total,
      date: new Date().toISOString(),
      status: 'Confirmed',
      paymentMethod: data.paymentMethod,
      shippingAddress: {
        address: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip,
        country: data.country,
      },
    }
    addBooking(bookingData)
    setOrderSuccess(true)
    clearCart()
  }

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Cart', path: '/cart' },
    { label: 'Checkout', path: '/checkout' }
  ]

  if (items.length === 0 && !orderSuccess) {
    return (
      <PageWrapper title="Checkout">
        <Breadcrumb items={breadcrumbItems} />
        <section className="space overflow-hidden">
          <div className="container">
            <div className="text-center py-5">
              <h2>Your Cart is Empty</h2>
              <p>Add some products to your cart before checking out.</p>
              <Link to="/shop" className="th-btn style1 mt-4">
                Continue Shopping
              </Link>
            </div>
          </div>
        </section>
      </PageWrapper>
    )
  }

  if (orderSuccess) {
    return (
      <PageWrapper title="Order Success">
        <section className="space overflow-hidden">
          <div className="container">
            <div className="text-center py-5">
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: '#28a745', 
                borderRadius: '50%', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px'
              }}>
                <i className="fas fa-check" style={{ color: '#fff', fontSize: '40px' }}></i>
              </div>
              <h2>Order Placed Successfully!</h2>
              <p>Thank you for your order. We'll process it shortly.</p>
              <div className="d-flex gap-3 justify-content-center mt-4">
                <Link to="/" className="th-btn style1">
                  Back to Home
                </Link>
                <Link to="/shop" className="th-btn style2">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </section>
      </PageWrapper>
    )
  }

  // After successful order, optionally redirect after a brief pause
  useEffect(() => {
    if (orderSuccess) {
      const timer = setTimeout(() => {
        navigate('/')
      }, 4000) // 4 seconds
      return () => clearTimeout(timer)
    }
  }, [orderSuccess, navigate])

  return (
    <PageWrapper title="Checkout">
      <Breadcrumb items={breadcrumbItems} />
      
      <section className="checkout-sec space overflow-hidden">
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-5">
              <div className="col-lg-8">
                <div className="checkout-form">
                  <h3 className="mb-4 text-white">Billing Details</h3>
                  
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label text-white">First Name *</label>
                      <input 
                        {...register('firstName')}
                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                        style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                      />
                      {errors.firstName && (
                        <span style={{ color: '#dc3545', fontSize: '14px' }}>
                          {errors.firstName.message}
                        </span>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-white">Last Name *</label>
                      <input 
                        {...register('lastName')}
                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                        style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                      />
                      {errors.lastName && (
                        <span style={{ color: '#dc3545', fontSize: '14px' }}>
                          {errors.lastName.message}
                        </span>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-white">Email *</label>
                      <input 
                        type="email"
                        {...register('email')}
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                      />
                      {errors.email && (
                        <span style={{ color: '#dc3545', fontSize: '14px' }}>
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-white">Phone *</label>
                      <input 
                        type="tel"
                        {...register('phone')}
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                      />
                      {errors.phone && (
                        <span style={{ color: '#dc3545', fontSize: '14px' }}>
                          {errors.phone.message}
                        </span>
                      )}
                    </div>
                    <div className="col-12">
                      <label className="form-label text-white">Address *</label>
                      <input 
                        {...register('address')}
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                        style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                      />
                      {errors.address && (
                        <span style={{ color: '#dc3545', fontSize: '14px' }}>
                          {errors.address.message}
                        </span>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-white">City *</label>
                      <input 
                        {...register('city')}
                        className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                        style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                      />
                      {errors.city && (
                        <span style={{ color: '#dc3545', fontSize: '14px' }}>
                          {errors.city.message}
                        </span>
                      )}
                    </div>
                    <div className="col-md-3">
                      <label className="form-label text-white">State *</label>
                      <input 
                        {...register('state')}
                        className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                        style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                      />
                      {errors.state && (
                        <span style={{ color: '#dc3545', fontSize: '14px' }}>
                          {errors.state.message}
                        </span>
                      )}
                    </div>
                    <div className="col-md-3">
                      <label className="form-label text-white">ZIP Code *</label>
                      <input 
                        {...register('zip')}
                        className={`form-control ${errors.zip ? 'is-invalid' : ''}`}
                        style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                      />
                      {errors.zip && (
                        <span style={{ color: '#dc3545', fontSize: '14px' }}>
                          {errors.zip.message}
                        </span>
                      )}
                    </div>
                    <div className="col-12">
                      <label className="form-label text-white">Country *</label>
                      <select 
                        {...register('country')}
                        className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                        style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                      >
                        <option value="">Select Country</option>
                        <option value="US">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="CA">Canada</option>
                        <option value="AU">Australia</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                      </select>
                      {errors.country && (
                        <span style={{ color: '#dc3545', fontSize: '14px' }}>
                          {errors.country.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* <h4 className="mt-5 mb-3">Payment Method</h4>
                  <div className="payment-methods">
                    <div className="form-check mb-2">
                      <input 
                        {...register('paymentMethod')}
                        type="radio" 
                        id="card" 
                        value="card"
                        className="form-check-input"
                      />
                      <label className="form-check-label" htmlFor="card">
                        Credit/Debit Card
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input 
                        {...register('paymentMethod')}
                        type="radio" 
                        id="paypal" 
                        value="paypal"
                        className="form-check-input"
                      />
                      <label className="form-check-label" htmlFor="paypal">
                        PayPal
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input 
                        {...register('paymentMethod')}
                        type="radio" 
                        id="cod" 
                        value="cod"
                        className="form-check-input"
                      />
                      <label className="form-check-label" htmlFor="cod">
                        Cash on Delivery
                      </label>
                    </div>
                  </div> */}
                </div>
              </div>

              <div className="col-lg-4">
                <div className="order-summary" style={{
                  background: '#f9f9f9',
                  padding: '24px',
                  borderRadius: '12px',
                  position: 'sticky',
                  top: '100px'
                }}>
                  <h4 className="mb-4">Order Summary</h4>
                  
                  {items.map(item => (
                    <div key={item.productId} className="d-flex justify-content-between mb-3">
                      <div>
                        <span>{item.name}</span>
                        <span style={{ color: '#888', fontSize: '14px' }}> x {item.quantity}</span>
                      </div>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  
                  <div className="summary-row d-flex justify-content-between mb-3 pt-3" style={{ borderTop: '1px solid #ddd' }}>
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

                  <button type="submit" className="th-btn style1 w-100 mt-4">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </PageWrapper>
  )
}

export default CheckoutPage