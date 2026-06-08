import { useParams, Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import { events } from '../../data/events'

const EventDetailsPage = () => {
  const { slug } = useParams()
  const event = events.find(e => e.slug === slug)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  if (!event) {
    return (
      <PageWrapper title="Event Not Found">
        <div className="container py-5">
          <div className="text-center">
            <h2>Event Not Found</h2>
            <p>The event you're looking for doesn't exist.</p>
            <Link to="/events" className="th-btn style1">Back to Events</Link>
          </div>
        </div>
      </PageWrapper>
    )
  }

  const relatedEvents = events
    .filter(e => e.id !== event.id)
    .slice(0, 3)

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Events', path: '/events' },
    { label: event.title, path: `/events/${slug}` }
  ]

  return (
    <PageWrapper title={event.title}>
      <Breadcrumb items={breadcrumbItems} />
      
      <section className="event-details space overflow-hidden">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <div className="event-detail-image mb-4">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    style={{ width: '100%', borderRadius: '16px' }}
                  />
                </div>

                <span className="event-date" style={{
                  display: 'inline-block',
                  background: '#FF752B',
                  color: '#fff',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  marginBottom: '16px'
                }}>
                  {event.date}
                </span>

                <h1 style={{ fontFamily: 'var(--font-heading)', marginBottom: '20px' }}>
                  {event.title}
                </h1>

                <div className="event-meta mb-4" style={{ display: 'flex', gap: '24px', color: '#888' }}>
                  <span><i className="fas fa-clock"></i> {event.time}</span>
                  <span><i className="fas fa-map-marker"></i> {event.location}</span>
                </div>

                <div className="event-content" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                  <p style={{ color: 'var(--color-body)', marginBottom: '20px' }}>
                    {event.description}
                  </p>
                  <p style={{ color: 'var(--color-body)', marginBottom: '20px' }}>
                    Join us for an unforgettable experience at {event.title}. This event is designed to 
                    provide you with valuable knowledge and skills that you can apply in your daily life.
                  </p>
                  <p style={{ color: 'var(--color-body)' }}>
                    Whether you're a beginner or looking to deepen your practice, this event has something 
                    for everyone. Our expert instructors will guide you through each step of the way.
                  </p>
                </div>

                <div className="event-price mt-5 p-4" style={{ 
                  background: '#f9f9f9', 
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <span style={{ color: '#888' }}>Ticket Price</span>
                    <p style={{ fontSize: '32px', fontWeight: 700, color: '#FF752B', margin: 0 }}>
                      ₹{event.price}
                    </p>
                  </div>
                  <Link to="/appointment" className="th-btn style1">
                    Book Now
                  </Link>
                </div>
              </motion.div>
            </div>

            <div className="col-lg-4">
              <div className="sidebar">
                <div className="widget">
                  <h3 className="widget_title">Other Events</h3>
                  {relatedEvents.map(ev => (
                    <div key={ev.id} className="related-event mb-3" style={{
                      display: 'flex',
                      gap: '12px',
                      padding: '12px',
                      background: '#f9f9f9',
                      borderRadius: '8px'
                    }}>
                      <img 
                        src={ev.image} 
                        alt={ev.title}
                        style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
                      />
                      <div>
                        <h5 style={{ fontSize: '14px', margin: '0 0 4px' }}>
                          <Link to={`/events/${ev.slug}`} style={{ color: 'inherit' }}>
                            {ev.title}
                          </Link>
                        </h5>
                        <span style={{ fontSize: '12px', color: '#888' }}>{ev.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

export default EventDetailsPage