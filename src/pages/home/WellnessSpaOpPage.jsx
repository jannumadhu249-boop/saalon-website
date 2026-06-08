import PageWrapper from '../../components/layout/PageWrapper'
import HeroSlider from '../../components/sections/HeroSlider'
import ServicesSection from '../../components/sections/ServicesSection'
import AboutSection from '../../components/sections/AboutSection'
import StatsBar from '../../components/sections/StatsBar'
import TestimonialsSection from '../../components/sections/TestimonialsSection'
import TeamSection from '../../components/sections/TeamSection'
import CtaBanner from '../../components/sections/CtaBanner'
import BlogSection from '../../components/sections/BlogSection'

const WellnessSpaOpPage = () => {
  return (
    <PageWrapper 
      title="Wellness Spa - Scuts" 
      description="Holistic wellness and relaxation in one page - Scuts Wellness Spa OnePage."
    >
      <HeroSlider 
        customSlides={[
          {
            id: 1,
            bgImage: 'assets/img/hero/hero_bg_2_1.jpg',
            title: "Discover True Wellness",
            subtitle: "Embark on a journey of relaxation and healing with our premium spa therapies and holistic treatments.",
            ctaText: "Explore Services",
            ctaLink: "#services"
          },
          {
            id: 2,
            bgImage: 'assets/img/hero/hero_bg_2_2.jpg',
            title: "Find Your Inner Peace",
            subtitle: "Immerse yourself in our tranquil environment designed for complete mental and physical relaxation.",
            ctaText: "Learn More",
            ctaLink: "#about"
          },
          {
            id: 3,
            bgImage: 'assets/img/hero/hero_bg_2_3.jpg',
            title: "Holistic Healing Journey",
            subtitle: "Restore balance to your mind, body, and spirit with our comprehensive wellness programs.",
            ctaText: "Book Treatment",
            ctaLink: "#contact"
          }
        ]}
        subtitle="Wellness Sanctuary"
      />
      <div id="services">
        <ServicesSection />
      </div>
      <StatsBar />
      <div id="about">
        <AboutSection />
      </div>
      <TestimonialsSection />
      <div id="team">
        <TeamSection />
      </div>
      <div id="contact">
        <CtaBanner />
      </div>
      <BlogSection />
    </PageWrapper>
  )
}

export default WellnessSpaOpPage