import { useParams, Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import { team } from '../../data/team'

const TeamDetailsPage = () => {
  const { slug } = useParams()
  const member = team.find(t => t.slug === slug)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  if (!member) {
    return (
      <PageWrapper title="Team Member Not Found">
        <div className="container py-5">
          <div className="text-center">
            <h2>Team Member Not Found</h2>
            <p>The team member you're looking for doesn't exist.</p>
            <Link to="/team" className="th-btn style1">Back to Team</Link>
          </div>
        </div>
      </PageWrapper>
    )
  }

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Our Team', path: '/team' },
    { label: member.name, path: `/team/${slug}` }
  ]

  return (
    <PageWrapper title={member.name}>
      <Breadcrumb items={breadcrumbItems} />
      
      <section className="space overflow-hidden">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <div className="team-detail-image">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    style={{ width: '100%', borderRadius: '16px' }}
                  />
                </div>
                
                <div className="team-social mt-4" style={{ display: 'flex', gap: '12px' }}>
                  {member.social.facebook && (
                    <a 
                      href={member.social.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="icon-btn"
                      style={{ width: '50px', height: '50px', border: '1px solid #ddd', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  )}
                  {member.social.instagram && (
                    <a 
                      href={member.social.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="icon-btn"
                      style={{ width: '50px', height: '50px', border: '1px solid #ddd', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  )}
                  {member.social.twitter && (
                    <a 
                      href={member.social.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="icon-btn"
                      style={{ width: '50px', height: '50px', border: '1px solid #ddd', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                  )}
                </div>
              </motion.div>
            </div>

            <div className="col-lg-7">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="sub-title" style={{ color: '#FF752B', fontWeight: 600 }}>
                  {member.role}
                </span>
                <h1 className="mt-2 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  {member.name}
                </h1>
                
                <div className="team-bio mb-4">
                  <h3>About</h3>
                  <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--color-body)' }}>
                    {member.bio}
                  </p>
                </div>

                <div className="team-specialties">
                  <h3>Specialties</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    {member.specialties.map((spec, index) => (
                      <span 
                        key={index}
                        style={{
                          padding: '8px 16px',
                          background: '#f9f9f9',
                          borderRadius: '20px',
                          fontSize: '14px'
                        }}
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

export default TeamDetailsPage