import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import AboutSection from '../../components/sections/AboutSection'
import StatsBar from '../../components/sections/StatsBar'
import MarqueeBanner from '../../components/sections/MarqueeBanner'
import VideoBanner from '../../components/sections/VideoBanner'
import TestimonialsSection from '../../components/sections/TestimonialsSection'
import TeamSection from '../../components/sections/TeamSection'
import FaqSection from '../../components/sections/FaqSection'

const AboutPage = () => {
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' }
  ]

  return (
    <PageWrapper title="About Us">
      <Breadcrumb items={breadcrumbItems} />
      <AboutSection />
      <StatsBar />
      <MarqueeBanner />
      <TeamSection />
      <VideoBanner />
      <TestimonialsSection />
      <FaqSection />

    </PageWrapper>
  )
}

export default AboutPage