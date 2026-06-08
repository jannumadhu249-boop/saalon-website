import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from './Navbar'
import Footer from './Footer'

const PageWrapper = ({ children, title, description }) => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <Helmet>
        <title>{title ? `${title} | Scuts` : 'Scuts - Spa & Wellness Salon'}</title>
        {description && (
          <meta name="description" content={description} />
        )}
      </Helmet>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default PageWrapper