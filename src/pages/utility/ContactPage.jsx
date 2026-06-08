import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  number: z.string().min(10, 'Please enter a valid phone number'),
  subject: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

const ContactPage = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false)
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = (data) => {
    console.log('Contact form submitted:', data)
    setSubmitSuccess(true)
    reset()
    setTimeout(() => setSubmitSuccess(false), 5000)
  }

  const contactDetails = [
    {
      icon: 'fas fa-map-marker-alt',
      label: 'Our Address',
      items: [
        { text: 'Scuts unisex Salon and spa, NTR Nagar Rd, Gayatri Nagar, Vivekananda Nagar, Kukatpally, Hyderabad, Telangana 500072', 
          // url: 'https://www.google.com/maps'
         }
      ]
    },
    {
      icon: 'fas fa-phone-alt',
      label: 'Contact Number',
      items: [
        { text: 'Mobile: +91 9515440333', url: 'tel:+919515440333' },
        { text: 'Email: info@Scuts.com', url: 'mailto:info@Scuts.com' }
      ]
    },
    {
      icon: 'fas fa-clock',
      label: 'Hours of Operation',
      items: [
        { text: 'Mon - Thu: 9AM - 10PM' },
        { text: 'Fri - Sat: 9AM - 8PM' },
        { text: 'Sun: 9AM - 11PM' }
      ]
    }
  ]

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Contact Us', path: '/contact' }
  ]

  return (
    <PageWrapper title="Contact Us">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="space-top" id="contact-sec">
        <div className="container">
          <div className="row gy-40 gx-30">
            <div className="col-xxl-4 col-lg-6">
              <div className="contact-info-wrap">
                <div className="title-area mb-30">
                  <h3 className="sec-title">Get in touch</h3>
                  <p>Have an inquiry or some feedback for us? Fill out the form below to contact our team.</p>
                </div>
                
                {contactDetails.map((info, index) => (
                  <div className="contact-info" key={index}>
                    <div className="contact-info_icon">
                      <i className={info.icon}></i>
                    </div>
                    <div className="media-body">
                      <p className="contact-info_label">{info.label}</p>
                      {info.items.map((item, i) => (
                        item.url ? (
                          <a key={i} href={item.url} className="contact-info_link">{item.text}</a>
                        ) : (
                          <span key={i} className="contact-info_link d-block">{item.text}</span>
                        )
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="col-xxl-8 col-lg-6">
              <div className="contact-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3644.7310056272386!2d89.2286059153658!3d24.00527418490799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fe9b97badc6151%3A0x30b048c9fb2129bc!2sAngfuztheme!5e0!3m2!1sen!2sbd!4v1651028958211!5m2!1sen!2sbd"
                  allowFullScreen=""
                  loading="lazy"
                  title="Google Maps"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="space-bottom overflow-hidden">
        <div className="container">
          <div className="row gy-40">
            <div className="col-12">
              <form onSubmit={handleSubmit(onSubmit)} className="contact-form style2 ajax-contact">
                <h3 className="mb-4 mt-n2 text-center">Get In Touch</h3>
                
                {submitSuccess && (
                  <div className="alert alert-success mb-4 text-center">
                    Thank you for your message! We'll get back to you soon.
                  </div>
                )}

                <div className="row">
                  <div className="form-group col-md-6">
                    <input 
                      {...register('name')}
                      type="text" 
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
                      placeholder="Your Name" 
                    />
                    <i className="fas fa-user"></i>
                    {errors.name && <div className="invalid-feedback d-block">{errors.name.message}</div>}
                  </div>
                  <div className="form-group col-md-6">
                    <input 
                      {...register('email')}
                      type="email" 
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                      placeholder="Email Address" 
                    />
                    <i className="fas fa-envelope"></i>
                    {errors.email && <div className="invalid-feedback d-block">{errors.email.message}</div>}
                  </div>
                  <div className="form-group col-md-6">
                    <input 
                      {...register('number')}
                      type="tel" 
                      className={`form-control ${errors.number ? 'is-invalid' : ''}`} 
                      placeholder="Phone Number" 
                    />
                    <i className="fas fa-phone-alt"></i>
                    {errors.number && <div className="invalid-feedback d-block">{errors.number.message}</div>}
                  </div>
                  <div className="form-group col-md-6">
                    <select 
                      {...register('subject')}
                      className={`form-select nice-select ${errors.subject ? 'is-invalid' : ''}`}
                    >
                      <option value="" disabled hidden>Select Service</option>
                      <option value="Bridal Makeup">Bridal Makeup</option>
                      <option value="Beard Treatments">Beard Treatments</option>
                      <option value="Hair Coloring">Hair Coloring</option>
                      <option value="Aromatherapy">Aromatherapy</option>
                    </select>
                    {errors.subject && <div className="invalid-feedback d-block">{errors.subject.message}</div>}
                  </div>
                  <div className="form-group col-12">
                    <textarea 
                      {...register('message')}
                      cols="30" 
                      rows="3" 
                      className={`form-control ${errors.message ? 'is-invalid' : ''}`} 
                      placeholder="Your Message"
                    ></textarea>
                    <i className="fas fa-comment"></i>
                    {errors.message && <div className="invalid-feedback d-block">{errors.message.message}</div>}
                  </div>
                  <div className="form-btn col-12">
                    <button type="submit" className="th-btn fw-btn">SEND MESSAGE</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

export default ContactPage