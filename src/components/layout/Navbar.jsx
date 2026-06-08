import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navigation } from '../../data/navigation'
import $ from 'jquery'
import 'jquery.ripples'
import '../../styles/Navbar.css'

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const rippleRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  useEffect(() => {
    const initRipples = () => {
      if (rippleRef.current) {
        try {
          $(rippleRef.current).ripples({
            resolution: 512,
            dropRadius: 20,
            perturbance: 0.04,
          })
        } catch (e) {
          console.warn('Ripples init error:', e)
        }
      }
    }
    initRipples()
    return () => {
      if (rippleRef.current) {
        try {
          $(rippleRef.current).ripples('destroy')
        } catch (e) {}
      }
    }
  }, [])

  return (
    <header className={`th-header header-layout1 header-absolute ${isSticky ? 'sticky' : ''}`}>
      <div className="navbar-inner container-fluid">
        <div className="navbar-row">

          {/* Logo */}
          <div className="logo-container">
            <div className="header-logo">
              <Link to="/">
                <img src="assets/img/logo-scuts.png" alt="Scuts" />
              </Link>
            </div>
            <div className="logo-divider"></div>
          </div>

          {/* Desktop Nav */}
          <nav className="main-menu style2 d-none d-xl-inline-block">
            <ul>
              {navigation.map((item, index) => (
                <li
                  key={index}
                  className={item.children ? 'mega-menu-wrap' : ''}
                >
                  <Link to={item.path} className="menu-link">
                    {item.label}
                  </Link>

                  {item.children && (
                    <div
                      ref={item.label === 'Services' ? rippleRef : null}
                      className="mega-menu"
                    >
                      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
                        <div className="row g-4">
                          {item.children.map((child, childIdx) => (
                            <div key={childIdx} className="col-lg">
                              <div className="mega-menu-box">
                                <h4 className="mega-menu-title">{child.label}</h4>
                                <ul className="sub-menu">
                                  {child.items
                                    ? child.items.map((subItem, subIdx) => (
                                        <li key={subIdx}>
                                          <Link to={subItem.path}>{subItem.label}</Link>
                                        </li>
                                      ))
                                    : (
                                        <li>
                                          <Link to={child.path}>{child.label}</Link>
                                        </li>
                                      )}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Button */}
          <div className="header-button">
            <Link to="/appointment-modal" className="th-btn style1">
              BOOK APPOINTMENT
            </Link>
            <button
              type="button"
              className="icon-btn sideMenuToggler d-xl-none"
              onClick={() => setMobileMenuOpen(true)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`th-menu-wrapper ${mobileMenuOpen ? 'th-body-visible' : ''}`}>
        <div className="th-menu-area text-center">
          <button className="th-menu-toggle" onClick={() => setMobileMenuOpen(false)}>
            <i className="fas fa-times"></i>
          </button>
          <div className="mobile-logo">
            <Link to="/">
              <img src="assets/img/logo-scuts.png" alt="Scuts" />
            </Link>
          </div>
          <div className="th-mobile-menu">
            <ul>
              {navigation.map((item, index) => (
                <li key={index} className={item.children ? 'menu-item-has-children' : ''}>
                  {item.children ? (
                    <>
                      <Link to={item.path}>{item.label}</Link>
                      <ul className="sub-menu">
                        {item.children.map((child, childIndex) => (
                          <li key={childIndex} className={child.items ? 'menu-item-has-children' : ''}>
                            <Link to={child.path}>{child.label}</Link>
                            {child.items && (
                              <ul className="sub-menu">
                                {child.items.map((subItem, subIdx) => (
                                  <li key={subIdx}>
                                    <Link to={subItem.path}>{subItem.label}</Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link to={item.path}>{item.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar