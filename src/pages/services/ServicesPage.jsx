// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { useInView } from 'react-intersection-observer'
// import { motion } from 'framer-motion'
// import PageWrapper from '../../components/layout/PageWrapper'
// import Breadcrumb from '../../components/layout/Breadcrumb'
// import ServiceCard from '../../components/ui/ServiceCard'
// import SectionTitle from '../../components/ui/SectionTitle'
// import { services } from '../../data/services'
// import PricingSection from '../../components/sections/PricingSection'

// const ServicesPage = () => {
//   const [activeCategory, setActiveCategory] = useState('All')
//   const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })


//   const filteredServices = activeCategory === 'All' 
//     ? services 
//     : services.filter(s => s.category === activeCategory)

//   const breadcrumbItems = [
//     { label: 'Home', path: '/' },
//     { label: 'Services', path: '/services' }
//   ]

//   return (
//     <PageWrapper title="Our Services">
//       <Breadcrumb items={breadcrumbItems} />
      
//       <section className="space overflow-hidden">
//         <div className="container">
//           <div className="row justify-content-center mb-5">
//             {/* <div className="col-lg-7">
//               <SectionTitle
//                 subtitle="What We Offer"
//                 title="Our Premium Services"
//                 description="Discover our range of exceptional spa and beauty treatments designed to refresh your body and mind."
//                 align="center"
//               />
//             </div> */}
//           </div>

//           <div className="service-tabs mb-5" style={{ 
//             display: 'flex', 
//             justifyContent: 'center', 
//             flexWrap: 'wrap', 
//             gap: '12px' 
//           }}>
//             {/* {categories.map(cat => (
//               <button
//                 key={cat}
//                 onClick={() => setActiveCategory(cat)}
//                 className={`th-btn ${activeCategory === cat ? 'style1' : 'style2'}`}
//                 style={{ 
//                   background: activeCategory === cat ? '#FF752B' : 'transparent',
//                   border: activeCategory === cat ? 'none' : '1px solid #ddd',
//                   color: activeCategory === cat ? '#fff' : '#333'
//                 }}
//               >
//                 {cat}
//               </button>
//             ))} */}
//           </div>

//           <div className="row gy-4 justify-content-center" ref={ref}>
//             {filteredServices.map((service, index) => (
//               <motion.div
//                 key={service.id}
//                 className="col-md-6 col-xl-4"
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={inView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//               >
//                 <ServiceCard {...service} />
//               </motion.div>
//             ))}
//           </div>

//           {filteredServices.length === 0 && (
//             <div className="text-center py-5">
//               <p>No services found in this category.</p>
//             </div>
//           )}
//         </div>
//       </section>
//       <PricingSection />
//     </PageWrapper>
//   )
// }

// export default ServicesPage




// src/pages/services/ServicesPage.jsx
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import PageWrapper from '../../components/layout/PageWrapper';
import Breadcrumb from '../../components/layout/Breadcrumb';
import { services, categories } from '../../data/services';
import { useCart } from '../../context/CartContext';   // ✅ useCart from your context
import styles from './ServicesPage.module.css';

const ServicesPage = () => {
  // ✅ Use the correct property name 'items' instead of 'cartItems'
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('All');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [addedIds, setAddedIds] = useState({});

  const filteredServices = activeCategory === 'All'
    ? services
    : services.filter(s => s.category === activeCategory);

  // ✅ items is the array of cart items
  const getQuantity = (serviceId) => {
    const item = items.find(i => i.productId === serviceId);
    return item ? item.quantity : 0;
  };

  const handleAdd = (service) => {
    // ✅ addToCart expects a product object and optional quantity
    addToCart({
      id: service.id,
      name: service.name,
      price: service.price,
      image: service.image || '/assets/img/service-default.jpg',
    }, 1);
    // Flash feedback
    setAddedIds(prev => ({ ...prev, [service.id]: true }));
    setTimeout(() => setAddedIds(prev => ({ ...prev, [service.id]: false })), 800);
  };

  const handleIncrement = (service) => {
    const currentQty = getQuantity(service.id);
    updateQuantity(service.id, currentQty + 1);
  };

  const handleDecrement = (service) => {
    const currentQty = getQuantity(service.id);
    if (currentQty === 1) {
      removeFromCart(service.id);
    } else {
      updateQuantity(service.id, currentQty - 1);
    }
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' }
  ];

  return (
    <PageWrapper title="Men's Services">
      <Breadcrumb items={breadcrumbItems} />

      <section className={styles.servicesSection}>
        <div className="container">
          {/* Filter bar */}
          <div className={styles.filterBar}>
            <div className={styles.categories}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`${styles.categoryBtn} ${activeCategory === cat ? styles.active : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* <div className={styles.sortBox}>
              <select className={styles.sortSelect}>
                <option>Sort by: Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Duration: Shortest</option>
              </select>
            </div> */}
          </div>

          {/* Services grid */}
          <div className={styles.servicesGrid} ref={ref}>
            {filteredServices.map((service, index) => {
              const quantity = getQuantity(service.id);
              const isAdded = addedIds[service.id];

              return (
                <motion.div
                  key={service.id}
                  className={styles.serviceCard}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className={styles.serviceIcon}>{service.icon}</div>
                  <h3 className={styles.serviceName}>{service.name}</h3>
                  <div className={styles.serviceMeta}>
                    <span className={styles.duration}>⏱ {service.duration}</span>
                    <span className={styles.price}>₹{service.price}</span>
                  </div>

                  {quantity === 0 ? (
                    <button
                      onClick={() => handleAdd(service)}
                      className={`${styles.addToCartBtn} ${isAdded ? styles.addedFlash : ''}`}
                    >
                      {isAdded ? '✓ Booked' : 'Book Now'}
                    </button>
                  ) : (
                    <div className={styles.quantityControls}>
                      <button onClick={() => handleDecrement(service)} className={styles.qtyBtn}>
                        <i className="fas fa-minus"></i>
                      </button>
                      <span className={styles.qtyValue}>{quantity}</span>
                      <button onClick={() => handleIncrement(service)} className={styles.qtyBtn}>
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {filteredServices.length === 0 && (
            <div className={styles.noResults}>No services in this category.</div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
};

export default ServicesPage;