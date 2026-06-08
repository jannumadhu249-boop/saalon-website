import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import ServiceCard from '../../components/ui/ServiceCard'
import SectionTitle from '../../components/ui/SectionTitle'
import { services } from '../../data/services'
import PricingSection from '../../components/sections/PricingSection'

const ServicesPage = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })


  const filteredServices = activeCategory === 'All' 
    ? services 
    : services.filter(s => s.category === activeCategory)

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' }
  ]

  return (
    <PageWrapper title="Our Services">
      <Breadcrumb items={breadcrumbItems} />
      
      <section className="space overflow-hidden">
        <div className="container">
          <div className="row justify-content-center mb-5">
            {/* <div className="col-lg-7">
              <SectionTitle
                subtitle="What We Offer"
                title="Our Premium Services"
                description="Discover our range of exceptional spa and beauty treatments designed to refresh your body and mind."
                align="center"
              />
            </div> */}
          </div>

          <div className="service-tabs mb-5" style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            gap: '12px' 
          }}>
            {/* {categories.map(cat => (
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
            ))} */}
          </div>

          <div className="row gy-4 justify-content-center" ref={ref}>
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                className="col-md-6 col-xl-4"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-5">
              <p>No services found in this category.</p>
            </div>
          )}
        </div>
      </section>
      <PricingSection />
    </PageWrapper>
  )
}

export default ServicesPage