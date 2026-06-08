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

const BeautySalonPage = () => {
  const variant = homeVariants["home-beauty-salon"]

  return (
    <PageWrapper 
      title="Beauty Salon - Scuts Spa & Wellness" 
      description="Discover our premium beauty services and treatments at Scuts. Expert beauticians, relaxing atmosphere, and personalized care."
    >
      <HeroSlider customSlides={[
        {
          id: 1,
          bgImage: 'assets/img/hero/hero_bg_1_1.jpg',
          title: variant.heroTitle,
          subtitle: variant.heroSubtitle,
          ctaText: variant.ctaText,
          ctaLink: variant.ctaLink
        },
        {
          id: 2,
          bgImage: 'assets/img/hero/hero_bg_1_2.jpg',
          title: "Radiant Skin Starts Here",
          subtitle: "Our advanced skincare treatments will leave your skin glowing and healthy.",
          ctaText: "Explore Services",
          ctaLink: "/services"
        },
        {
          id: 3,
          bgImage: 'assets/img/hero/hero_bg_1_3.jpg',
          title: "Your Beauty, Our Passion",
          subtitle: "Experience luxury beauty treatments tailored to enhance your natural glow.",
          ctaText: "Book Now",
          ctaLink: "/appointment"
        }
      ]} />
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

export default BeautySalonPage