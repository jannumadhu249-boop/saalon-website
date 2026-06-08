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
import PricingSection from '../../components/sections/PricingSection'


const HomePage = () => {
  return (
    <PageWrapper
      title="Scuts - Spa & Wellness Salon"
      description="Experience world-class spa treatments and beauty services at Scuts. Discover premium spa treatments, expert beauticians, and personalized care."
    >
      <HeroSlider />
      {/* <FeaturesBar /> */}
      <AboutSection />
      <StatsBar />
      <ServicesSection />
      <MarqueeBanner />
      <ProductShowcase />
      {/* <PortfolioSection /> */}
      <VideoBanner />
      <GalleryGrid />
      <PricingSection />
      <TestimonialsSection />
      <TeamSection />
      <CtaBanner />
      <FaqSection />
      <BlogSection />
    </PageWrapper>
  )
}

export default HomePage