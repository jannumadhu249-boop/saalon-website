// import { Link } from 'react-router-dom'
// import PageWrapper from '../../components/layout/PageWrapper'
// import Breadcrumb from '../../components/layout/Breadcrumb'
// import { useCart } from '../../context/CartContext'
// import { useState } from 'react'
// import cartStyles from './CartPage.module.css'

// const CartPage = () => {
//   const { items, updateQuantity, removeFromCart, cartTotal, addToCart } = useCart()
//   const shipping = 10
//   const total = cartTotal + shipping
//   // static services data
//   const services = [
//     { id: 's1', name: 'Haircut', price: 500, image: '/assets/img/service1.jpg' },
//     { id: 's2', name: 'Facial', price: 800, image: '/assets/img/service2.jpg' },
//     { id: 's3', name: 'Manicure', price: 300, image: '/assets/img/service3.jpg' },
//     { id: 's4', name: 'Massage', price: 1200, image: '/assets/img/service4.jpg' }
//   ];
//   const [selectedIds, setSelectedIds] = useState([]);

//   const toggleSelect = (id) => {
//     setSelectedIds(prev =>
//       prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
//     );
//   };

//   const addSelectedToCart = () => {
//     selectedIds.forEach(id => {
//       const svc = services.find(s => s.id === id);
//       if (svc) {
//         // addToCart expects a product object; quantity defaults to 1
//         addToCart(svc);
//       }
//     });
//     setSelectedIds([]);
//   };

//   const breadcrumbItems = [
//     { label: 'Home', path: '/' },
//     { label: 'Cart', path: '/cart' }
//   ]

  

//   return (
//     <PageWrapper title="Shopping Cart">
//       <Breadcrumb items={breadcrumbItems} />
      
//       <section className="cart-sec space overflow-hidden">
//         <div className="container">
//           {/* Services selection grid */}
//           <div className={cartStyles.servicesGrid}>
//             {services.map(svc => (
//               <div
//                 key={svc.id}
//                 className={cartStyles.serviceCard + (selectedIds.includes(svc.id) ? ' selected' : '')}
//                 onClick={() => toggleSelect(svc.id)}
//                 style={{ cursor: 'pointer', border: selectedIds.includes(svc.id) ? '2px solid #FF752B' : '1px solid #ddd' }}
//               >
//                 <img src={svc.image} alt={svc.name} className={cartStyles.serviceImage} />
//                 <h5>{svc.name}</h5>
//                 <p>₹{svc.price.toFixed(2)}</p>
//               </div>
//             ))}
//           </div>
//           <button
//             className="th-btn style1 mt-3"
//             onClick={addSelectedToCart}
//             disabled={selectedIds.length === 0}
//           >
//             Add Selected Services to Cart
//           </button>

//           <div className="row">
//             <div className="col-lg-8">
//               {items.length === 0 ? (
//                 <p className="text-center mt-4">Your cart is empty. Please add services.</p>
//               ) : (
//                 <table className="cart-table">
//                   <thead>
//                     <tr>
//                       <th>Product</th>
//                       <th>Price</th>
//                       <th>Quantity</th>
//                       <th>Total</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {items.map(item => (
//                       <tr key={item.productId}>
//                         <td>
//                           <div className="d-flex align-items-center gap-3">
//                             <img 
//                               src={item.image} 
//                               alt={item.name}
//                               style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
//                             />
//                             <div>
//                               <h5 style={{ margin: 0 }}>{item.name}</h5>
//                               <span style={{ fontSize: '14px', color: '#888' }}>
//                                 ₹{item.price.toFixed(2)} each
//                               </span>
//                             </div>
//                           </div>
//                         </td>
//                         <td>₹{item.price.toFixed(2)}</td>
//                         <td>
//                           <div className="quantity" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
//                             <button 
//                               onClick={() => updateQuantity(item.productId, item.quantity - 1)}
//                               style={{ 
//                                 width: '28px', 
//                                 height: '28px', 
//                                 border: '1px solid #ddd', 
//                                 background: 'transparent',
//                                 borderRadius: '4px',
//                                 cursor: 'pointer'
//                               }}
//                             >
//                               <i className="fas fa-minus" style={{ fontSize: '10px' }}></i>
//                             </button>
//                             <input 
//                               type="number"
//                               value={item.quantity}
//                               onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 1)}
//                               style={{ 
//                                 width: '40px', 
//                                 textAlign: 'center',
//                                 border: '1px solid #ddd',
//                                 borderRadius: '4px',
//                                 padding: '4px'
//                               }}
//                             />
//                             <button 
//                               onClick={() => updateQuantity(item.productId, item.quantity + 1)}
//                               style={{ 
//                                 width: '28px', 
//                                 height: '28px', 
//                                 border: '1px solid #ddd', 
//                                 background: 'transparent',
//                                 borderRadius: '4px',
//                                 cursor: 'pointer'
//                               }}
//                             >
//                               <i className="fas fa-plus" style={{ fontSize: '10px' }}></i>
//                             </button>
//                           </div>
//                         </td>
//                         <td>₹{(item.price * item.quantity).toFixed(2)}</td>
//                         <td>
//                           <button 
//                             onClick={() => removeFromCart(item.productId)}
//                             style={{ 
//                               background: 'none', 
//                               border: 'none', 
//                               cursor: 'pointer',
//                               color: '#dc3545'
//                             }}
//                           >
//                             <i className="fas fa-times"></i>
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               )}
//             </div>

//             <div className="col-lg-4">
//               <div className="cart-summary" style={{
//                 background: '#f9f9f9',
//                 padding: '24px',
//                 borderRadius: '12px'
//               }}>
//                 <h4 className="mb-4">Cart Summary</h4>
                
//                 <div className="summary-row d-flex justify-content-between mb-3">
//                   <span>Subtotal</span>
//                   <span>₹{cartTotal.toFixed(2)}</span>
//                 </div>
                
//                 <div className="summary-row d-flex justify-content-between mb-3">
//                   <span>Shipping</span>
//                   <span>₹{shipping.toFixed(2)}</span>
//                 </div>
                
//                 <div className="summary-total d-flex justify-content-between pt-3" style={{ borderTop: '1px solid #ddd' }}>
//                   <span style={{ fontWeight: 700 }}>Total</span>
//                   <span style={{ fontWeight: 700, fontSize: '20px', color: '#FF752B' }}>
//                     ₹{total.toFixed(2)}
//                   </span>
//                 </div>

//                 <Link to="/checkout" className="th-btn style1 w-100 mt-4">
//                   Proceed to Checkout
//                 </Link>
                
//                 <Link to="/shop" className="th-btn style2 w-100 mt-3">
//                   Continue Shopping
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </PageWrapper>
//   )
// }

// export default CartPage




// src/pages/CartPage.jsx
import { Link } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import Breadcrumb from '../../components/layout/Breadcrumb';
import { useCart } from '../../context/CartContext';
import cartStyles from './CartPage.module.css';

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, cartTotal } = useCart();
  const shipping = 10;
  const total = cartTotal + shipping;

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Cart', path: '/cart' }
  ];

  return (
    <PageWrapper title="Shopping Cart">
      <Breadcrumb items={breadcrumbItems} />

      <section className="cart-sec space overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {items.length === 0 ? (
                <div className={cartStyles.emptyCart}>
                  <i className="fas fa-shopping-cart fa-3x"></i>
                  <p>Your cart is empty.</p>
                  <Link to="/services" className="th-btn style1 mt-3">
                    Browse Services
                  </Link>
                </div>
              ) : (
                <>
                  <div className="table-responsive">
                    <table className="cart-table text-white">
                      <thead>
                        <tr>
                          <th className='text-white text-center'>Service</th>
                          <th className='text-white text-center'>Price</th>
                          {/* <th className='text-white text-center'>Quantity</th> */}
                          <th className='text-white text-center'>Total</th>
                          <th className='text-white text-center'>Action</th>
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
                                  style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '12px' }}
                                />
                                <div>
                                  <h5 style={{ margin: 0 }}>{item.name}</h5>
                                  <span style={{ fontSize: '13px', color: '#888' }}>
                                    ₹{item.price} each
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>₹{item.price.toFixed(2)}</td>
                            {/* <td>
                              <div className="quantity" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <button
                                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                  className={cartStyles.qtyBtn}
                                >
                                  <i className="fas fa-minus"></i>
                                </button>
                                <input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 1)}
                                  className={cartStyles.qtyInput}
                                />
                                <button
                                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                  className={cartStyles.qtyBtn}
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>
                            </td> */}
                            <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                            <td>
                              <button
                                onClick={() => removeFromCart(item.productId)}
                                className={cartStyles.removeBtn}
                              >
                                <i className="fas fa-trash-alt"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className={cartStyles.continueShopping}>
                    <Link to="/services" className="th-btn style2">
                      <i className="fas fa-arrow-left"></i> Add More Services
                    </Link>
                  </div>
                </>
              )}
            </div>

            <div className="col-lg-4">
              <div className={cartStyles.summaryCard}>
                <h4>Cart Summary</h4>
                <div className={cartStyles.summaryRow}>
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className={cartStyles.summaryRow}>
                  <span>Shipping</span>
                  <span>₹{shipping.toFixed(2)}</span>
                </div>
                <div className={cartStyles.summaryTotal}>
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <Link to="/checkout" className="th-btn style1 w-100 mt-4">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default CartPage;