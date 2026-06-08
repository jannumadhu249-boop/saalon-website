import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import { pricing } from '../../data/pricing'

const PricingPage = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly')

  const getPrice = (monthlyPrice) => {
    return billingPeriod === 'monthly' ? monthlyPrice : monthlyPrice * 10
  }

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Pricing', path: '/pricing' }
  ]

  return (
    <PageWrapper title="Pricing Plans">
      <Breadcrumb items={breadcrumbItems} />
      
      <section className="breadcumb-wrapper" style={{
        padding: '60px 0',
        background: '#f9f9f9'
      }}>
        <div className="container">
          <div className="text-center">
            <h1>Our Pricing Plans</h1>
            <p>Choose the perfect plan for your beauty and wellness needs.</p>
          </div>
        </div>
      </section>

      <section className="space overflow-hidden">
        <div className="container">
          <div className="text-center mb-5">
            <div className="billing-toggle" style={{
              display: 'inline-flex',
              background: '#f9f9f9',
              borderRadius: '30px',
              padding: '4px'
            }}>
              <button
                onClick={() => setBillingPeriod('monthly')}
                className="th-btn"
                style={{
                  background: billingPeriod === 'monthly' ? '#FF752B' : 'transparent',
                  color: billingPeriod === 'monthly' ? '#fff' : '#333',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '12px 24px'
                }}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className="th-btn"
                style={{
                  background: billingPeriod === 'yearly' ? '#FF752B' : 'transparent',
                  color: billingPeriod === 'yearly' ? '#fff' : '#333',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '12px 24px'
                }}
              >
                Yearly <span style={{ fontSize: '12px', opacity: 0.8 }}>(Save 17%)</span>
              </button>
            </div>
          </div>

          <div className="row g-4 justify-content-center">
            {pricing.map((plan, index) => (
              <div key={plan.id} className="col-md-6 col-xl-3">
                <div 
                  className="price-box" 
                  style={{
                    background: '#fff',
                    borderRadius: '16px',
                    padding: '30px',
                    textAlign: 'center',
                    border: plan.isPopular ? '2px solid #FF752B' : '2px solid transparent',
                    boxShadow: plan.isPopular ? '0 4px 20px rgba(255, 117, 43, 0.2)' : '0 2px 15px rgba(0,0,0,0.08)',
                    position: 'relative'
                  }}
                >
                  {plan.isPopular && (
                    <span style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#FF752B',
                      color: '#fff',
                      padding: '4px 16px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 600
                    }}>
                      POPULAR
                    </span>
                  )}
                  
                  <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>
                    {plan.name}
                  </h3>
                  <div className="price" style={{ marginBottom: '24px' }}>
                    <span style={{ fontSize: '48px', fontWeight: 700, color: '#FF752B' }}>
                      ₹{getPrice(plan.price)}
                    </span>
                    <span style={{ color: '#888' }}>/{billingPeriod === 'monthly' ? 'session' : 'year'}</span>
                  </div>
                  
                  <ul className="available-list" style={{ 
                    listStyle: 'none', 
                    padding: 0, 
                    margin: '0 0 24px',
                    textAlign: 'left'
                  }}>
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <i className="fas fa-check" style={{ color: '#FF752B' }}></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    to="/appointment" 
                    className={`th-btn ${plan.isPopular ? 'style1' : 'black-border'} w-100`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <p style={{ color: 'var(--color-body)' }}>
              Need a custom plan? <Link to="/contact" style={{ color: '#FF752B', fontWeight: 600 }}>Contact us</Link> for personalized pricing.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-area" style={{ position: 'relative' }}>
        <div style={{ 
          backgroundImage: 'url(assets/img/bg/cta-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '80px 0',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(18,18,20,0.9), rgba(18,18,20,0.7))'
          }}></div>
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div className="text-center text-white">
              <h2 className="text-white">Not Sure Which Plan Is Right For You?</h2>
              <p className="mb-4" style={{ maxWidth: '600px', margin: '16px auto' }}>
                Book a free consultation and our experts will help you find the perfect plan.
              </p>
              <Link to="/contact" className="th-btn style1">Get Consultation</Link>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

export default PricingPage