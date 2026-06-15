import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import ServiceCard from '../../components/ui/ServiceCard'
import { services as fallbackServices, fetchServices } from '../../data/services'

const ServiceDetailsPage = () => {
  const { slug } = useParams()
  const [servicesList, setServicesList] = useState(fallbackServices)
  const [isLoading, setIsLoading] = useState(true)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    let active = true;
    const loadServices = async () => {
      try {
        setIsLoading(true);
        const loadedServices = await fetchServices();
        if (active && loadedServices.length > 0) {
          setServicesList(loadedServices);
        }
      } catch (err) {
        console.error('Failed to load services for details page:', err);
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };
    loadServices();
    return () => {
      active = false;
    };
  }, []);

  const service = servicesList.find(s => s.slug === slug)

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: service ? (service.title || service.name) : '', path: `/services/${slug}` }
  ]

  if (isLoading) {
    return (
      <PageWrapper title="Loading Service Details">
        <Breadcrumb items={breadcrumbItems} />
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem', color: '#FF752B' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3" style={{ color: '#5b6e8c', fontWeight: 500 }}>Loading service details...</p>
        </div>
      </PageWrapper>
    )
  }

  if (!service) {
    return (
      <PageWrapper title="Service Not Found">
        <div className="container py-5">
          <div className="text-center">
            <h2>Service Not Found</h2>
            <p>The service you're looking for doesn't exist.</p>
            <Link to="/services" className="th-btn style1">Back to Services</Link>
          </div>
        </div>
      </PageWrapper>
    )
  }

  const relatedServices = servicesList
    .filter(s => s.category === service.category && s.id !== service.id)
    .slice(0, 3)

  return (
    <PageWrapper title={service.title || service.name}>
      <Breadcrumb items={breadcrumbItems} />
      
      <section className="space overflow-hidden">
        <div className="container" ref={ref}>
          <div className="row g-5">
            <div className="col-lg-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <div className="service-detail-image mb-4">
                  <img 
                    src={service.image || '/assets/img/service-default.jpg'} 
                    alt={service.title || service.name}
                    style={{ width: '100%', maxHeight: '450px', objectFit: 'cover', borderRadius: '16px' }}
                  />
                </div>
                
                <div className="service-detail-content">
                  <span className="sub-title" style={{ color: '#FF752B', fontWeight: 600 }}>
                    {service.category}
                  </span>
                  <h1 className="mt-2 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                    {service.title || service.name}
                  </h1>
                  <p style={{ fontSize: '18px', lineHeight: '1.8', color: 'var(--color-body)' }}>
                    {service.description || 'Experience complete relaxation with our signature treatment that rejuvenates your entire body.'}
                  </p>
                  <p style={{ color: 'var(--color-body)' }}>
                    {service.shortDesc || 'Premium beauty and wellness treatment.'}
                  </p>

                  <div className="service-meta mt-5" style={{
                    display: 'flex',
                    gap: '40px',
                    padding: '24px',
                    background: '#f9f9f9',
                    borderRadius: '12px'
                  }}>
                    <div>
                      <span style={{ color: '#888', fontSize: '14px' }}>Duration</span>
                      <p style={{ fontWeight: 600, fontSize: '18px', margin: 0 }}>{service.duration}</p>
                    </div>
                    <div>
                      <span style={{ color: '#888', fontSize: '14px' }}>Price</span>
                      <p style={{ fontWeight: 600, fontSize: '18px', margin: 0, color: '#FF752B' }}>
                        ₹{service.price}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <Link to="/appointment" className="th-btn style1">
                      Book This Service
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="col-lg-4">
              <div className="sidebar" style={{ position: 'sticky', top: '100px' }}>
                <div className="widget">
                  <h3 className="widget_title">Related Services</h3>
                  {relatedServices.length > 0 ? (
                    <div className="related-services">
                      {relatedServices.map(rel => (
                        <ServiceCard key={rel.id} {...rel} />
                      ))}
                    </div>
                  ) : (
                    <p>No related services found.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

export default ServiceDetailsPage