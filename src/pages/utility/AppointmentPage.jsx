import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import { services as fallbackServices, fetchServices } from '../../data/services'
import { team } from '../../data/team'

const appointmentSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone required'),
  service: z.string().min(1, 'Please select a service'),
  staff: z.string().min(1, 'Please select a staff member'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  notes: z.string().optional()
})

const AppointmentPage = () => {
  const [appointmentBooked, setAppointmentBooked] = useState(false)
  const [bookingDetails, setBookingDetails] = useState(null)
  const [servicesList, setServicesList] = useState(fallbackServices)

  useEffect(() => {
    let active = true;
    const loadServices = async () => {
      try {
        const loadedServices = await fetchServices();
        if (active && loadedServices.length > 0) {
          setServicesList(loadedServices);
        }
      } catch (err) {
        console.error('Failed to load services for appointment page:', err);
      }
    };
    loadServices();
    return () => {
      active = false;
    };
  }, []);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(appointmentSchema)
  })

  const onSubmit = (data) => {
    console.log('Appointment booked:', data)
    setBookingDetails(data)
    setAppointmentBooked(true)
    reset()
  }

  const staffOptions = team.map(t => ({ id: t.id, name: t.name, role: t.role }))
  const serviceOptions = servicesList.map(s => ({ id: s.id, name: s.name || s.title, duration: s.duration, price: s.price }))

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Book Appointment', path: '/appointment' }
  ]

  return (
    <PageWrapper title="Book Appointment">
      <Breadcrumb items={breadcrumbItems} />
      
      {/* <section className="breadcumb-wrapper" style={{
        padding: '60px 0',
        background: '#f9f9f9'
      }}>
        <div className="container">
          <div className="text-center">
            <h1>Book Your Appointment</h1>
            <p>Schedule your visit to Scuts and experience our premium services.</p>
          </div>
        </div>
      </section> */}

      <section className="space overflow-hidden">
        <div className="container">
          {appointmentBooked ? (
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
              <h2>Appointment Booked Successfully!</h2>
              <p className="mb-4">Thank you for choosing Scuts. Here are your booking details:</p>
              <div style={{ 
                background: '#f9f9f9', 
                padding: '24px', 
                borderRadius: '12px',
                maxWidth: '400px',
                margin: '0 auto'
              }}>
                <p><strong>Service:</strong> {bookingDetails?.service}</p>
                <p><strong>Staff:</strong> {bookingDetails?.staff}</p>
                <p><strong>Date:</strong> {bookingDetails?.date}</p>
                <p><strong>Time:</strong> {bookingDetails?.time}</p>
                <p><strong>Name:</strong> {bookingDetails?.name}</p>
              </div>
              <button 
                onClick={() => setAppointmentBooked(false)} 
                className="th-btn style1 mt-4"
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            <div className="row g-5">
              <div className="col-lg-8">
                <div className="appointment-form-wrap" style={{
                  background: '#fff',
                  padding: '40px',
                  borderRadius: '16px',
                  boxShadow: '0 2px 20px rgba(0,0,0,0.08)'
                }}>
                  <h3 className="mb-4">Appointment Details</h3>
                  
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Name *</label>
                        <input 
                          {...register('name')}
                          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                          style={{ padding: '14px', border: '1px solid #ddd', borderRadius: '8px' }}
                          placeholder="Your Name"
                        />
                        {errors.name && (
                          <span style={{ color: '#dc3545', fontSize: '14px' }}>{errors.name.message}</span>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Email *</label>
                        <input 
                          {...register('email')}
                          type="email"
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          style={{ padding: '14px', border: '1px solid #ddd', borderRadius: '8px' }}
                          placeholder="Your Email"
                        />
                        {errors.email && (
                          <span style={{ color: '#dc3545', fontSize: '14px' }}>{errors.email.message}</span>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Phone *</label>
                        <input 
                          {...register('phone')}
                          type="tel"
                          className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                          style={{ padding: '14px', border: '1px solid #ddd', borderRadius: '8px' }}
                          placeholder="Your Phone"
                        />
                        {errors.phone && (
                          <span style={{ color: '#dc3545', fontSize: '14px' }}>{errors.phone.message}</span>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Service *</label>
                        <select 
                          {...register('service')}
                          className={`form-control ${errors.service ? 'is-invalid' : ''}`}
                          style={{ padding: '14px', border: '1px solid #ddd', borderRadius: '8px' }}
                        >
                          <option value="">Select Service</option>
                          {serviceOptions.map(s => (
                            <option key={s.id} value={s.name}>{s.name} (₹{s.price})</option>
                          ))}
                        </select>
                        {errors.service && (
                          <span style={{ color: '#dc3545', fontSize: '14px' }}>{errors.service.message}</span>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Staff Member *</label>
                        <select 
                          {...register('staff')}
                          className={`form-control ${errors.staff ? 'is-invalid' : ''}`}
                          style={{ padding: '14px', border: '1px solid #ddd', borderRadius: '8px' }}
                        >
                          <option value="">Select Staff</option>
                          {staffOptions.map(s => (
                            <option key={s.id} value={s.name}>{s.name} - {s.role}</option>
                          ))}
                        </select>
                        {errors.staff && (
                          <span style={{ color: '#dc3545', fontSize: '14px' }}>{errors.staff.message}</span>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Date *</label>
                        <input 
                          {...register('date')}
                          type="date"
                          className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                          style={{ padding: '14px', border: '1px solid #ddd', borderRadius: '8px' }}
                        />
                        {errors.date && (
                          <span style={{ color: '#dc3545', fontSize: '14px' }}>{errors.date.message}</span>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Time *</label>
                        <select 
                          {...register('time')}
                          className={`form-control ${errors.time ? 'is-invalid' : ''}`}
                          style={{ padding: '14px', border: '1px solid #ddd', borderRadius: '8px' }}
                        >
                          <option value="">Select Time</option>
                          <option value="09:00">9:00 AM</option>
                          <option value="10:00">10:00 AM</option>
                          <option value="11:00">11:00 AM</option>
                          <option value="12:00">12:00 PM</option>
                          <option value="13:00">1:00 PM</option>
                          <option value="14:00">2:00 PM</option>
                          <option value="15:00">3:00 PM</option>
                          <option value="16:00">4:00 PM</option>
                          <option value="17:00">5:00 PM</option>
                        </select>
                        {errors.time && (
                          <span style={{ color: '#dc3545', fontSize: '14px' }}>{errors.time.message}</span>
                        )}
                      </div>
                      <div className="col-12">
                        <label className="form-label">Notes</label>
                        <textarea 
                          {...register('notes')}
                          rows={4}
                          className="form-control"
                          style={{ padding: '14px', border: '1px solid #ddd', borderRadius: '8px', resize: 'vertical' }}
                          placeholder="Any special requests or notes..."
                        ></textarea>
                      </div>
                      <div className="col-12">
                        <button type="submit" className="th-btn style1">
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              
              <div className="col-lg-4">
                <div className="appointment-info" style={{
                  background: '#f9f9f9',
                  padding: '30px',
                  borderRadius: '16px'
                }}>
                  <h4 className="mb-4">Why Book With Us?</h4>
                  <div className="mb-4">
                    <div className="d-flex gap-3 mb-3">
                      <i className="fas fa-check-circle" style={{ color: '#FF752B', fontSize: '20px' }}></i>
                      <div>
                        <strong>Expert Professionals</strong>
                        <p style={{ fontSize: '14px', color: 'var(--color-body)', margin: '4px 0 0' }}>
                          Our team consists of certified experts with years of experience.
                        </p>
                      </div>
                    </div>
                    <div className="d-flex gap-3 mb-3">
                      <i className="fas fa-check-circle" style={{ color: '#FF752B', fontSize: '20px' }}></i>
                      <div>
                        <strong>Premium Products</strong>
                        <p style={{ fontSize: '14px', color: 'var(--color-body)', margin: '4px 0 0' }}>
                          We use only the finest quality products for your treatments.
                        </p>
                      </div>
                    </div>
                    <div className="d-flex gap-3 mb-3">
                      <i className="fas fa-check-circle" style={{ color: '#FF752B', fontSize: '20px' }}></i>
                      <div>
                        <strong>Relaxing Atmosphere</strong>
                        <p style={{ fontSize: '14px', color: 'var(--color-body)', margin: '4px 0 0' }}>
                          Our spa is designed to provide the ultimate relaxation experience.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="mb-3">Contact Info</h4>
                  <p style={{ marginBottom: '8px' }}><i className="fas fa-phone-alt me-2" style={{ color: '#FF752B' }}></i>+1 (555) 123-4567</p>
                  <p style={{ marginBottom: '8px' }}><i className="fas fa-envelope me-2" style={{ color: '#FF752B' }}></i>help@Scuts.com</p>
                  <p><i className="fas fa-map-marker-alt me-2" style={{ color: '#FF752B' }}></i>12 Division Park, Berlin</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  )
}

export default AppointmentPage