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




import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import PageWrapper from '../../components/layout/PageWrapper';
import Breadcrumb from '../../components/layout/Breadcrumb';
import { fetchServices, fetchCategories } from '../../data/services';
import { useCart } from '../../context/CartContext';
import styles from './ServicesPage.module.css';

const ServicesPage = () => {
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeGender, setActiveGender] = useState('All');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [addedIds, setAddedIds] = useState({});

  useEffect(() => {
    let active = true;
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [loadedCategories, loadedServices] = await Promise.all([
          fetchCategories(),
          fetchServices()
        ]);
        if (active) {
          const allCategory = { _id: 'All', name: 'All' };
          setCategories([allCategory, ...loadedCategories]);
          setServices(loadedServices);
          setError(null);
        }
      } catch (err) {
        console.error('Error loading services and categories:', err);
        if (active) {
          setError('Failed to load services. Please try again later.');
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };
    loadData();
    return () => {
      active = false;
    };
  }, []);

  // 1. Filter by category
  let filteredByCategory = activeCategory === 'All'
    ? services
    : services.filter(s => s.categoryId === activeCategory);

  // 2. Filter by gender
  const filteredServices = filteredByCategory.filter(service => {
    if (activeGender === 'All') return true;
    if (activeGender === 'Men') return service.gender === 'men' || service.gender === 'unisex';
    if (activeGender === 'Women') return service.gender === 'women' || service.gender === 'unisex';
    return true;
  });

  const getQuantity = (serviceId) => {
    const item = items.find(i => i.productId === serviceId);
    return item ? item.quantity : 0;
  };

  const handleAdd = (service) => {
    addToCart({
      id: service.id,
      name: service.name,
      price: service.price,
      image: service.image || '/assets/img/service-default.jpg',
    }, 1);
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

  if (isLoading) {
    return (
      <PageWrapper title="Salon Services">
        <Breadcrumb items={breadcrumbItems} />
        <section className={styles.servicesSection}>
          <div className="container text-center py-5">
            <div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem', color: '#FF752B' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3" style={{ color: '#5b6e8c', fontWeight: 500 }}>Loading premium salon services...</p>
          </div>
        </section>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper title="Salon Services">
        <Breadcrumb items={breadcrumbItems} />
        <section className={styles.servicesSection}>
          <div className="container text-center py-5">
            <div className="alert alert-danger" role="alert" style={{ maxWidth: '500px', margin: '0 auto', borderRadius: '12px' }}>
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="th-btn mt-4"
              style={{ backgroundColor: '#FF752B', borderColor: '#FF752B', color: '#fff', borderRadius: '40px', padding: '10px 24px' }}
            >
              Retry
            </button>
          </div>
        </section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="Salon Services">
      <Breadcrumb items={breadcrumbItems} />

      <section className={styles.servicesSection}>
        <div className="container">
          {/* Filter bar */}
          <div className={styles.filterBar}>
            {/* Category buttons */}
            <div className={styles.categories}>
              {categories.map(cat => (
                <button
                  key={cat._id}
                  onClick={() => setActiveCategory(cat._id)}
                  className={`${styles.categoryBtn} ${activeCategory === cat._id ? styles.active : ''}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Gender toggle (like registration form) */}
            <div className={styles.genderToggle}>
              <button
                type="button"
                className={`${styles.genderOption} ${activeGender === 'All' ? styles.activeGender : ''}`}
                onClick={() => setActiveGender('All')}
              >
                All
              </button>
              <button
                type="button"
                className={`${styles.genderOption} ${activeGender === 'Men' ? styles.activeGender : ''}`}
                onClick={() => setActiveGender('Men')}
              >
                Men
              </button>
              <button
                type="button"
                className={`${styles.genderOption} ${activeGender === 'Women' ? styles.activeGender : ''}`}
                onClick={() => setActiveGender('Women')}
              >
                Women
              </button>
            </div>
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
                  <div className={styles.serviceIcon}>
                    {service.image ? (
                      <img 
                        src={service.image} 
                        alt={service.name} 
                        style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                    ) : (
                      <span style={{ fontSize: '48px' }}>{service.icon}</span>
                    )}
                  </div>
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
            <div className={styles.noResults}>No services match the selected filters.</div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
};

export default ServicesPage;