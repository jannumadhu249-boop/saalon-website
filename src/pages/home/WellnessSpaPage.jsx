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

const WellnessSpaPage = () => {
  const variant = homeVariants["home-wellness-spa"]

  return (
    <PageWrapper 
      title="Wellness Spa - Scuts Spa & Wellness" 
      description="Discover holistic wellness and relaxation at Scuts. Premium spa therapies, meditation sessions, and organic treatments."
    >
      <HeroSlider 
        customSlides={[
          {
            id: 1,
            bgImage: 'assets/img/hero/hero_bg_2_1.jpg',
            title: variant.heroTitle,
            subtitle: variant.heroSubtitle,
            ctaText: variant.ctaText,
            ctaLink: variant.ctaLink
          },
          {
            id: 2,
            bgImage: 'assets/img/hero/hero_bg_2_2.jpg',
            title: "Find Your Inner Peace",
            subtitle: "Immerse yourself in our tranquil environment designed for complete mental and physical relaxation.",
            ctaText: "Learn More",
            ctaLink: "/about"
          },
          {
            id: 3,
            bgImage: 'assets/img/hero/hero_bg_2_3.jpg',
            title: "Holistic Healing Journey",
            subtitle: "Restore balance to your mind, body, and spirit with our comprehensive wellness programs.",
            ctaText: "Book Treatment",
            ctaLink: "/appointment"
          }
        ]}
        subtitle="Wellness Sanctuary"
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

export default WellnessSpaPage