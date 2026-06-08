import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>Page Not Found - Scuts</title>
      </Helmet>
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        background: '#121214' 
      }}>
        <Navbar />
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="text-center text-white" style={{ padding: '40px' }}>
            <div style={{ 
              fontSize: '120px', 
              fontWeight: 700, 
              color: '#FF752B',
              fontFamily: 'var(--font-heading)',
              lineHeight: 1
            }}>
              404
            </div>
            <h1 className="text-white mt-4 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Oops! Page Not Found
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '400px', margin: '0 auto 32px' }}>
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back on track.
            </p>
            <div className="d-flex gap-3 justify-content-center">
              <button 
                onClick={() => navigate(-1)}
                className="th-btn"
                style={{ 
                  background: 'transparent', 
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#fff'
                }}
              >
                Go Back
              </button>
              <Link to="/" className="th-btn style1">
                Go Home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default ErrorPage