import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import TeamCard from '../../components/ui/TeamCard'
import SectionTitle from '../../components/ui/SectionTitle'
import { team } from '../../data/team'

const TeamPage = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Our Team', path: '/team' }
  ]

  return (
    <PageWrapper title="Our Team">
      <Breadcrumb items={breadcrumbItems} />
      
      <section className="team-sec space overflow-hidden">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-7">
              <SectionTitle
                subtitle="Meet The Team"
                title="Our Expert Beauticians"
                description="Our talented team of professionals is dedicated to providing you with the best beauty services."
                align="center"
              />
            </div>
          </div>

          <div className="row gy-4" ref={ref}>
            {team.map((member, index) => (
              <motion.div
                key={member.id}
                className="col-md-6 col-xl-4"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TeamCard {...member} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

export default TeamPage