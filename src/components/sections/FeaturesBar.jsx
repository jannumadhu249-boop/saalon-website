import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const features = [
  {
    icon: 'fa-spa',
    title: 'Premium Spa Treatments',
    description: 'Relax and rejuvenate with our signature treatments'
  },
  {
    icon: 'fa-user-md',
    title: 'Expert Beauticians',
    description: 'Professional team dedicated to your beauty'
  },
  {
    icon: 'fa-heart',
    title: 'Personalized Care',
    description: 'Customized services tailored to your needs'
  }
]

const FeaturesBar = () => {
  return (
    <div className="features-bar" style={{ 
      background: '#fff', 
      padding: '40px 0',
      marginTop: '-60px',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="container">
        <div className="row gy-4 justify-content-center">
          {features.map((feature, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="feature-box" style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '20px',
                padding: '20px'
              }}>
                <div className="feature-icon" style={{
                  width: '60px',
                  height: '60px',
                  background: '#FF752B',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <i className={`fas ${feature.icon}`} style={{ color: '#fff', fontSize: '24px' }}></i>
                </div>
                <div className="feature-content">
                  <h4 style={{ 
                    fontSize: '18px', 
                    fontWeight: 600, 
                    marginBottom: '8px',
                    fontFamily: 'var(--font-heading)'
                  }}>
                    {feature.title}
                  </h4>
                  <p style={{ 
                    color: 'var(--color-body)', 
                    margin: 0,
                    fontSize: '14px'
                  }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturesBar