import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import SectionTitle from '../../components/ui/SectionTitle'
import { events } from '../../data/events'
import { Link } from 'react-router-dom'

const EventPage = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Events', path: '/events' }
  ]

  return (
    <PageWrapper title="Events">
      <Breadcrumb items={breadcrumbItems} />
      
      <section className="event-sec space overflow-hidden">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-7">
              <SectionTitle
                subtitle="Upcoming Events"
                title="Join Our Events"
                description="Participate in our workshops, wellness sessions, and community events."
                align="center"
              />
            </div>
          </div>

          <div className="row gy-4" ref={ref}>
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                className="col-md-6"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="event-card" style={{
                  background: '#fff',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                }}>
                  <div className="event-image" style={{ position: 'relative' }}>
                    <img 
                      src={event.image} 
                      alt={event.title}
                      style={{ width: '100%', height: '240px', objectFit: 'cover' }}
                    />
                    <span className="event-date" style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      background: '#FF752B',
                      color: '#fff',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontWeight: 600
                    }}>
                      {event.date}
                    </span>
                  </div>
                  <div className="event-content p-4">
                    <div className="event-meta mb-3" style={{ display: 'flex', gap: '16px', color: '#888', fontSize: '14px' }}>
                      <span><i className="fas fa-clock"></i> {event.time}</span>
                      <span><i className="fas fa-map-marker"></i> {event.location}</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '12px' }}>
                      <Link to={`/events/${event.slug}`} style={{ color: 'inherit' }}>
                        {event.title}
                      </Link>
                    </h3>
                    <p style={{ color: 'var(--color-body)', marginBottom: '16px' }}>
                      {event.description}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span style={{ fontWeight: 600, color: '#FF752B' }}>₹{event.price}</span>
                      <Link to={`/events/${event.slug}`} className="th-btn style2">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

export default EventPage