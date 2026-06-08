import PageWrapper from '../../components/layout/PageWrapper'
import HeroSlider from '../../components/sections/HeroSlider'
import FeaturesBar from '../../components/sections/FeaturesBar'
import ServicesSection from '../../components/sections/ServicesSection'
import AboutSection from '../../components/sections/AboutSection'
import StatsBar from '../../components/sections/StatsBar'
import MarqueeBanner from '../../components/sections/MarqueeBanner'
import ProductShowcase from '../../components/sections/ProductShowcase'
import PortfolioSection from '../../components/sections/PortfolioSection'
import VideoBanner from '../../components/sections/VideoBanner'
import GalleryGrid from '../../components/sections/GalleryGrid'
import TestimonialsSection from '../../components/sections/TestimonialsSection'
import TeamSection from '../../components/sections/TeamSection'
import CtaBanner from '../../components/sections/CtaBanner'
import FaqSection from '../../components/sections/FaqSection'
import BlogSection from '../../components/sections/BlogSection'
import { homeVariants } from '../../data/homeVariants'

const HairSalonPage = () => {
  const variant = homeVariants["home-hair-salon"]

  return (
    <PageWrapper 
      title="Hair Salon - Scuts Spa & Wellness" 
      description="Expert haircare and styling services at Scuts. Professional stylists, premium products, and customized looks."
    >
      <HeroSlider 
        customSlides={[
          {
            id: 1,
            bgImage: 'assets/img/hero/hero_bg_3_1.jpg',
            title: variant.heroTitle,
            subtitle: variant.heroSubtitle,
            ctaText: variant.ctaText,
            ctaLink: variant.ctaLink
          },
          {
            id: 2,
            bgImage: 'assets/img/hero/hero_bg_3_2.jpg',
            title: "Transform Your Style",
            subtitle: "Our expert stylists will help you achieve the perfect look that matches your personality.",
            ctaText: "Book Appointment",
            ctaLink: "/appointment"
          },
          {
            id: 3,
            bgImage: 'assets/img/hero/hero_bg_3_3.jpg',
            title: "Salon-Quality Hair Care",
            subtitle: "Experience premium hair treatments and styling that will leave you looking stunning.",
            ctaText: "Our Services",
            ctaLink: "/services"
          },
          {
            id: 4,
            bgImage: 'assets/img/hero/hero_bg_3_4.jpg',
            title: "Rock Your Look",
            subtitle: "Get ready for any occasion with our professional hair styling services.",
            ctaText: "Contact Us",
            ctaLink: "/contact"
          }
        ]}
        subtitle="Hair Excellence"
      />
      <FeaturesBar />
      <ServicesSection />
      <AboutSection />
      <StatsBar />
      <MarqueeBanner />
      <ProductShowcase />
      <PortfolioSection />
      <VideoBanner />
      <GalleryGrid />
      <TestimonialsSection />
      <TeamSection />
      <CtaBanner />
      <FaqSection />
      <BlogSection />
    </PageWrapper>
  )
}

export default HairSalonPage