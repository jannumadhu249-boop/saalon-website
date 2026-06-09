// import { useState, useEffect, useRef } from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import { navigation } from '../../data/navigation'
// import { useAuth } from '../../context/AuthContext'
// import { useCart } from '../../context/CartContext'
// import $ from 'jquery'
// import 'jquery.ripples'
// import '../../styles/Navbar.css'

// const Navbar = () => {
//   const { user, logout } = useAuth()
//   const { cartCount } = useCart()
//   const [isSticky, setIsSticky] = useState(false)
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
//   const location = useLocation()
//   const rippleRef = useRef(null)
//   const dropdownRef = useRef(null)

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setProfileDropdownOpen(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsSticky(window.scrollY > 50)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   useEffect(() => {
//     setMobileMenuOpen(false)
//   }, [location])

//   useEffect(() => {
//     const initRipples = () => {
//       if (rippleRef.current) {
//         try {
//           $(rippleRef.current).ripples({
//             resolution: 512,
//             dropRadius: 20,
//             perturbance: 0.04,
//           })
//         } catch (e) {
//           console.warn('Ripples init error:', e)
//         }
//       }
//     }
//     initRipples()
//     return () => {
//       if (rippleRef.current) {
//         try {
//           $(rippleRef.current).ripples('destroy')
//         } catch (e) {}
//       }
//     }
//   }, [])

//   return (
//     <header className={`th-header header-layout1 header-absolute ${isSticky ? 'sticky' : ''}`}>
//       <div className="navbar-inner container-fluid">
//         <div className="navbar-row">

//           {/* Logo */}
//           <div className="logo-container">
//             <div className="header-logo">
//               <Link to="/">
//                 <img src="assets/img/logo-scuts.png" alt="Scuts" />
//               </Link>
//             </div>
//             <div className="logo-divider"></div>
//           </div>

//           {/* Desktop Nav */}
//           <nav className="main-menu style2 d-none d-xl-inline-block">
//             <ul>
//               {navigation.map((item, index) => (
//                 <li
//                   key={index}
//                   className={item.children ? 'mega-menu-wrap' : ''}
//                 >
//                   <Link to={item.path} className="menu-link">
//                     {item.label}
//                   </Link>

//                   {item.children && (
//                     <div
//                       ref={item.label === 'Services' ? rippleRef : null}
//                       className="mega-menu"
//                     >
//                       <div className="container" style={{ position: 'relative', zIndex: 5 }}>
//                         <div className="row g-4">
//                           {item.children.map((child, childIdx) => (
//                             <div key={childIdx} className="col-lg">
//                               <div className="mega-menu-box">
//                                 <h4 className="mega-menu-title">{child.label}</h4>
//                                 <ul className="sub-menu">
//                                   {child.items
//                                     ? child.items.map((subItem, subIdx) => (
//                                         <li key={subIdx}>
//                                           <Link to={subItem.path}>{subItem.label}</Link>
//                                         </li>
//                                       ))
//                                     : (
//                                         <li>
//                                           <Link to={child.path}>{child.label}</Link>
//                                         </li>
//                                       )}
//                                 </ul>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           {/* Header Button */}
//           <div className="header-button" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
//             {/* Cart Icon */}
//             <Link to="/cart" className="th-btn style1 icon-only cart-icon">
//               <i className="fas fa-shopping-cart"></i>
//               {/* {cartCount > 0 && (
//                 <span style={{
//                   position: 'absolute',
//                   top: '-5px',
//                   right: '-5px',
//                   background: '#FF752B',
//                   color: '#fff',
//                   borderRadius: '50%',
//                   width: '18px',
//                   height: '18px',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   fontSize: '10px',
//                   fontWeight: '700'
//                 }}>
//                   {cartCount}
//                 </span>
//               )} */}
//             </Link>

//             {user ? (
//               <div className="profile-dropdown-wrapper" ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
//                 <button 
//                   onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
//                   style={{
//                     background: 'transparent',
//                     border: 'none',
//                     outline: 'none',
//                     cursor: 'pointer',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '8px',
//                     padding: '5px'
//                   }}
//                 >
//                   <div style={{
//                     width: '40px',
//                     height: '40px',
//                     borderRadius: '50%',
//                     background: '#FF752B',
//                     color: '#fff',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     fontWeight: 600,
//                     fontSize: '16px',
//                     border: '2px solid rgba(255, 255, 255, 0.2)'
//                   }}>
//                     {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
//                   </div>
//                 </button>
//                 {profileDropdownOpen && (
//                   <div style={{
//                     position: 'absolute',
//                     top: '100%',
//                     right: 0,
//                     background: '#ffffff',
//                     boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
//                     borderRadius: '12px',
//                     width: '200px',
//                     zIndex: 9999,
//                     marginTop: '10px',
//                     overflow: 'hidden',
//                     padding: '8px 0'
//                   }}>
//                     <div style={{ padding: '8px 16px', borderBottom: '1px solid #eee', marginBottom: '6px' }}>
//                       <div style={{ fontWeight: 600, fontSize: '14px', color: '#121214', wordBreak: 'break-all' }}>{user.name}</div>
//                       <div style={{ fontSize: '12px', color: '#888', wordBreak: 'break-all' }}>{user.email}</div>
//                     </div>
//                     <Link 
//                       to="/my-profile" 
//                       onClick={() => setProfileDropdownOpen(false)}
//                       style={{
//                         display: 'block',
//                         padding: '8px 16px',
//                         color: '#333',
//                         fontSize: '14px',
//                         textDecoration: 'none',
//                         transition: 'background 0.2s'
//                       }}
//                       onMouseEnter={(e) => e.target.style.background = '#f5f5f5'}
//                       onMouseLeave={(e) => e.target.style.background = 'transparent'}
//                     >
//                       <i className="far fa-user me-2" style={{ color: '#FF752B' }}></i> My Profile
//                     </Link>
//                     <Link 
//                       to="/change-password" 
//                       onClick={() => setProfileDropdownOpen(false)}
//                       style={{
//                         display: 'block',
//                         padding: '8px 16px',
//                         color: '#333',
//                         fontSize: '14px',
//                         textDecoration: 'none',
//                         transition: 'background 0.2s'
//                       }}
//                       onMouseEnter={(e) => e.target.style.background = '#f5f5f5'}
//                       onMouseLeave={(e) => e.target.style.background = 'transparent'}
//                     >
//                       <i className="fas fa-key me-2" style={{ color: '#FF752B' }}></i> Change Password
//                     </Link>
//                     <Link 
//                       to="/my-bookings" 
//                       onClick={() => setProfileDropdownOpen(false)}
//                       style={{
//                         display: 'block',
//                         padding: '8px 16px',
//                         color: '#333',
//                         fontSize: '14px',
//                         textDecoration: 'none',
//                         transition: 'background 0.2s'
//                       }}
//                       onMouseEnter={(e) => e.target.style.background = '#f5f5f5'}
//                       onMouseLeave={(e) => e.target.style.background = 'transparent'}
//                     >
//                       <i className="far fa-calendar-check me-2" style={{ color: '#FF752B' }}></i> My Bookings
//                     </Link>
//                     <button 
//                       onClick={() => {
//                         setProfileDropdownOpen(false);
//                         logout();
//                       }}
//                       style={{
//                         display: 'block',
//                         width: '100%',
//                         textAlign: 'left',
//                         border: 'none',
//                         background: 'transparent',
//                         padding: '8px 16px',
//                         color: '#dc3545',
//                         fontSize: '14px',
//                         cursor: 'pointer',
//                         transition: 'background 0.2s'
//                       }}
//                       onMouseEnter={(e) => e.target.style.background = '#fff5f5'}
//                       onMouseLeave={(e) => e.target.style.background = 'transparent'}
//                     >
//                       <i className="fas fa-sign-out-alt me-2"></i> Log out
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link to="/login" className="th-btn style1">
//                 Login
//               </Link>
//             )}

//             <Link to="/appointment" className="th-btn style1">
//               BOOK APPOINTMENT
//             </Link>
//             <button
//               type="button"
//               className="icon-btn sideMenuToggler d-xl-none"
//               onClick={() => setMobileMenuOpen(true)}
//             >
//               <i className="fas fa-bars"></i>
//             </button>
//           </div>

//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div className={`th-menu-wrapper ${mobileMenuOpen ? 'th-body-visible' : ''}`}>
//         <div className="th-menu-area text-center">
//           <button className="th-menu-toggle" onClick={() => setMobileMenuOpen(false)}>
//             <i className="fas fa-times"></i>
//           </button>
//           <div className="mobile-logo">
//             <Link to="/">
//               <img src="assets/img/logo-scuts.png" alt="Scuts" />
//             </Link>
//           </div>
//           <div className="th-mobile-menu">
//             <ul>
//               {navigation.map((item, index) => (
//                 <li key={index} className={item.children ? 'menu-item-has-children' : ''}>
//                   {item.children ? (
//                     <>
//                       <Link to={item.path}>{item.label}</Link>
//                       <ul className="sub-menu">
//                         {item.children.map((child, childIndex) => (
//                           <li key={childIndex} className={child.items ? 'menu-item-has-children' : ''}>
//                             <Link to={child.path}>{child.label}</Link>
//                             {child.items && (
//                               <ul className="sub-menu">
//                                 {child.items.map((subItem, subIdx) => (
//                                   <li key={subIdx}>
//                                     <Link to={subItem.path}>{subItem.label}</Link>
//                                   </li>
//                                 ))}
//                               </ul>
//                             )}
//                           </li>
//                         ))}
//                       </ul>
//                     </>
//                   ) : (
//                     <Link to={item.path}>{item.label}</Link>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </header>
//   )
// }

// export default Navbar






import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navigation } from '../../data/navigation'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import $ from 'jquery'
import 'jquery.ripples'
import '../../styles/Navbar.css'

const Navbar = () => {
  const { user, logout } = useAuth()
  const { cartCount } = useCart()
  const [isSticky, setIsSticky] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState(null)   // ← THIS WAS MISSING
  const location = useLocation()
  const rippleRef = useRef(null)
  const dropdownRef = useRef(null)

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Sticky navbar on scroll
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
    setOpenSubmenu(null)
  }, [location])

  // jQuery Ripples effect for mega menu
  useEffect(() => {
    const initRipples = () => {
      if (rippleRef.current) {
        try {
          $(rippleRef.current).ripples({
            resolution: 512,
            dropRadius: 20,
            perturbance: 0.04,
          })
        } catch (e) { console.warn('Ripples init error:', e) }
      }
    }
    initRipples()
    return () => {
      if (rippleRef.current) {
        try { $(rippleRef.current).ripples('destroy') } catch (e) {}
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

          {/* Desktop Navigation */}
          <nav className="main-menu style2 d-none d-xl-inline-block">
            <ul>
              {navigation.map((item, index) => (
                <li key={index} className={item.children ? 'mega-menu-wrap' : ''}>
                  <Link to={item.path} className="menu-link">{item.label}</Link>
                  {item.children && (
                    <div ref={item.label === 'Services' ? rippleRef : null} className="mega-menu">
                      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
                        <div className="row g-4">
                          {item.children.map((child, childIdx) => (
                            <div key={childIdx} className="col-lg">
                              <div className="mega-menu-box">
                                <h4 className="mega-menu-title">{child.label}</h4>
                                <ul className="sub-menu">
                                  {child.items
                                    ? child.items.map((subItem, subIdx) => (
                                        <li key={subIdx}><Link to={subItem.path}>{subItem.label}</Link></li>
                                      ))
                                    : <li><Link to={child.path}>{child.label}</Link></li>
                                  }
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

          {/* Header Buttons */}
          <div className="header-button">
            {/* Cart Icon with badge */}
            <Link to="/cart" className="th-btn style1 icon-only cart-icon">
              <i className="fas fa-shopping-cart"></i>
              {/* {cartCount > 0 && <span className="cart-badge">{cartCount}</span>} */}
            </Link>

            {user ? (
              <div className="profile-dropdown-wrapper" ref={dropdownRef}>
                <button className="profile-btn" onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}>
                  <div className="profile-avatar">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                </button>
                {profileDropdownOpen && (
                  <div className="profile-dropdown">
                    <div className="profile-info">
                      <div className="profile-name">{user.name}</div>
                      <div className="profile-email">{user.email}</div>
                    </div>
                    <Link to="/my-profile" onClick={() => setProfileDropdownOpen(false)}>
                      <i className="far fa-user"></i> My Profile
                    </Link>
                    <Link to="/change-password" onClick={() => setProfileDropdownOpen(false)}>
                      <i className="fas fa-key"></i> Change Password
                    </Link>
                    <Link to="/my-bookings" onClick={() => setProfileDropdownOpen(false)}>
                      <i className="far fa-calendar-check"></i> My Bookings
                    </Link>
                    <button onClick={() => { setProfileDropdownOpen(false); logout(); }}>
                      <i className="fas fa-sign-out-alt"></i> Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="th-btn style1">Login</Link>
            )}

            <Link to="/appointment" className="th-btn style1">BOOK APPOINTMENT</Link>
            <button className="icon-btn sideMenuToggler d-xl-none" onClick={() => setMobileMenuOpen(true)}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu – with collapsible submenus */}
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
              {navigation.map((item, idx) => {
                const hasChildren = item.children && item.children.length > 0;
                const menuKey = `top-${idx}`;
                return (
                  <li key={idx} className={hasChildren ? 'menu-item-has-children' : ''}>
                    {hasChildren ? (
                      <>
                        <div className="menu-item-wrap">
                          <Link to={item.path}>{item.label}</Link>
                          <button
                            className="submenu-toggle"
                            onClick={() => setOpenSubmenu(openSubmenu === menuKey ? null : menuKey)}
                          >
                            <i className={`fas ${openSubmenu === menuKey ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                          </button>
                        </div>
                        <ul className={`sub-menu ${openSubmenu === menuKey ? 'show' : ''}`}>
                          {item.children.map((child, cIdx) => {
                            const hasGrand = child.items && child.items.length > 0;
                            const childKey = `child-${idx}-${cIdx}`;
                            return (
                              <li key={cIdx} className={hasGrand ? 'menu-item-has-children' : ''}>
                                {hasGrand ? (
                                  <>
                                    <div className="menu-item-wrap">
                                      <Link to={child.path}>{child.label}</Link>
                                      <button
                                        className="submenu-toggle"
                                        onClick={() => setOpenSubmenu(openSubmenu === childKey ? null : childKey)}
                                      >
                                        <i className={`fas ${openSubmenu === childKey ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                                      </button>
                                    </div>
                                    <ul className={`sub-menu ${openSubmenu === childKey ? 'show' : ''}`}>
                                      {child.items.map((sub, sIdx) => (
                                        <li key={sIdx}>
                                          <Link to={sub.path}>{sub.label}</Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </>
                                ) : (
                                  <Link to={child.path}>{child.label}</Link>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </>
                    ) : (
                      <Link to={item.path}>{item.label}</Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar