import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Loader from './components/ui/Loader'
import PricingSection from './components/sections/PricingSection'
import Login from './components/layout/Login'
import Register from './components/layout/Registration'
import ForgotPassword from './components/layout/Forgotpassword'
import Dashboard from './pages/dashboard/Dashboard'

const HomePage = lazy(() => import('./pages/home/HomePage'))
const BeautySalonPage = lazy(() => import('./pages/home/BeautySalonPage'))
const BeautySalonOpPage = lazy(() => import('./pages/home/BeautySalonOpPage'))
const WellnessSpaPage = lazy(() => import('./pages/home/WellnessSpaPage'))
const WellnessSpaOpPage = lazy(() => import('./pages/home/WellnessSpaOpPage'))
const HairSalonPage = lazy(() => import('./pages/home/HairSalonPage'))
const HairSalonOpPage = lazy(() => import('./pages/home/HairSalonOpPage'))

const ServicesPage = lazy(() => import('./pages/services/ServicesPage'))
const ServiceDetailsPage = lazy(() => import('./pages/services/ServiceDetailsPage'))

const TeamPage = lazy(() => import('./pages/team/TeamPage'))
const TeamDetailsPage = lazy(() => import('./pages/team/TeamDetailsPage'))

const BlogPage = lazy(() => import('./pages/blog/BlogPage'))
const BlogDetailsPage = lazy(() => import('./pages/blog/BlogDetailsPage'))

const ShopPage = lazy(() => import('./pages/shop/ShopPage'))
const ShopDetailsPage = lazy(() => import('./pages/shop/ShopDetailsPage'))
const CartPage = lazy(() => import('./pages/shop/CartPage'))
const CheckoutPage = lazy(() => import('./pages/shop/CheckoutPage'))
const WishlistPage = lazy(() => import('./pages/shop/WishlistPage'))

const EventPage = lazy(() => import('./pages/events/EventPage'))
const EventDetailsPage = lazy(() => import('./pages/events/EventDetailsPage'))

const AboutPage = lazy(() => import('./pages/utility/AboutPage'))
const ContactPage = lazy(() => import('./pages/utility/ContactPage'))
const AppointmentPage = lazy(() => import('./pages/utility/AppointmentPage'))
const PricingPage = lazy(() => import('./pages/utility/PricingPage'))
const FaqPage = lazy(() => import('./pages/utility/FaqPage'))
const ErrorPage = lazy(() => import('./pages/utility/ErrorPage'))
const MyProfilePage = lazy(() => import('./pages/utility/MyProfilePage'))
const ChangePasswordPage = lazy(() => import('./pages/utility/ChangePasswordPage'))
const MyBookingsPage = lazy(() => import('./pages/utility/MyBookingsPage'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Loader fullPage />}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          <Route path="/home-beauty-salon" element={<BeautySalonPage />} />
          <Route path="/home-beauty-salon-op" element={<BeautySalonOpPage />} />
          <Route path="/home-wellness-spa" element={<WellnessSpaPage />} />
          <Route path="/home-wellness-spa-op" element={<WellnessSpaOpPage />} />
          <Route path="/home-hair-salon" element={<HairSalonPage />} />
          <Route path="/home-hair-salon-op" element={<HairSalonOpPage />} />
          
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailsPage />} />
          <Route path="/pricing" element={<PricingSection />} />
          
          <Route path="/team" element={<TeamPage />} />
          <Route path="/team/:slug" element={<TeamDetailsPage />} />
          
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailsPage />} />
          
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:slug" element={<ShopDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          
          <Route path="/events" element={<EventPage />} />
          <Route path="/events/:slug" element={<EventDetailsPage />} />
          
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/faq" element={<FaqPage />} />
          
          <Route path="/my-profile" element={<MyProfilePage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />

          <Route path="/dashboard" element={<Dashboard />} /> 
          
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App