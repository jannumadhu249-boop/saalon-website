import PageWrapper from '../../components/layout/PageWrapper'
import HeroSlider from '../../components/sections/HeroSlider'
import ServicesSection from '../../components/sections/ServicesSection'
import AboutSection from '../../components/sections/AboutSection'
import StatsBar from '../../components/sections/StatsBar'
import TestimonialsSection from '../../components/sections/TestimonialsSection'
import TeamSection from '../../components/sections/TeamSection'
import CtaBanner from '../../components/sections/CtaBanner'
import BlogSection from '../../components/sections/BlogSection'

const HairSalonOpPage = () => {
  return (
    <PageWrapper 
      title="Hair Salon - Scuts" 
      description="Expert haircare in one page - Scuts Hair Salon OnePage."
    >
      <HeroSlider 
        customSlides={[
          {
            id: 1,
            bgImage: 'assets/img/hero/hero_bg_3_1.jpg',
            title: "Style Your Perfect Look",
            subtitle: "Expert haircare and styling services tailored to bring out your unique beauty and personal style.",
            ctaText: "View Services",
            ctaLink: "#services"
          },
          {
            id: 2,
            bgImage: 'assets/img/hero/hero_bg_3_2.jpg',
            title: "Transform Your Style",
            subtitle: "Our expert stylists will help you achieve the perfect look that matches your personality.",
            ctaText: "Book Appointment",
            ctaLink: "#contact"
          },
          {
            id: 3,
            bgImage: 'assets/img/hero/hero_bg_3_3.jpg',
            title: "Salon-Quality Hair Care",
            subtitle: "Experience premium hair treatments and styling that will leave you looking stunning.",
            ctaText: "Our Services",
            ctaLink: "#services"
          },
          {
            id: 4,
            bgImage: 'assets/img/hero/hero_bg_3_4.jpg',
            title: "Rock Your Look",
            subtitle: "Get ready for any occasion with our professional hair styling services.",
            ctaText: "Contact Us",
            ctaLink: "#contact"
          }
        ]}
        subtitle="Hair Excellence"
      />
      <div id="services">
        <ServicesSection />
      </div>
      <StatsBar />
      <AboutSection />
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

export default HairSalonOpPage