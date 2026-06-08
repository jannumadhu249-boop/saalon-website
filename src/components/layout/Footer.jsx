import { useState } from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  const currentYear = new Date().getFullYear()

  const services = [
    { label: 'Grooms Package', path: '/services' },
    { label: 'Facial Care', path: '/services' },
    { label: 'Package For Men', path: '/services' },
    { label: 'Hair Care', path: '/services' },
    { label: 'Waxing', path: '/services' },
    { label: 'Skin Care', path: '/services' },
    { label: 'Cuts & Shaves', path: '/services' }
  ]

  const openingTimes = [
    'Monday: 9am - 10pm',
    'Tuesday: 9am - 10pm',
    'Wednesday: 9am - 10pm',
    'Thursday: 9am - 10pm',
    'Fri - Sat: 9am - 8pm',
    'Sunday: 9am - 11pm'
  ]

  const galleryImages = [
    'assets/img/widget/gallery_1_1.jpg',
    'assets/img/widget/gallery_1_2.jpg',
    'assets/img/widget/gallery_1_3.jpg',
    'assets/img/widget/gallery_1_4.jpg',
    'assets/img/widget/gallery_1_5.jpg',
    'assets/img/widget/gallery_1_6.jpg'
  ]

  return (
    <footer className="footer-wrapper footer-layout1">
      <div className="container">
        <div className="footer-top">
          <div className="footer-logo">
            <Link to="/">
              <img src="assets/img/scut-logo.png" alt="Scuts" style={{ height: '100px' }} />
            </Link>
          </div>
          <div className="">
            <Link to="/services" className="th-btn style1">
              SCHEDULE A SERVICES
            </Link>
          </div>
        </div>
      </div>

      <ul className="footer-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>

      <div className="widget-area">
        <div className="container">
          <div className="row gy-4 justify-content-between">
            <div className="col-md-6 col-xl-auto">
              <div className="widget footer-widget">
                <h3 className="widget_title">About Our Salon</h3>
                <div className="th-widget-about">
                  <p className="about-text">
                    S Cuts Salon & Spa offers premium styling and relaxing spa services with expert professionals, personalised care, and high-quality products.
                  </p>
                  <div className="th-social">
                    <a href="https://www.facebook.com/scuts82" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    {/* <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-twitter"></i>
                    </a> */}
                    <a href="https://www.instagram.com/scuts_82/" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-instagram"></i>
                    </a>
                    {/* <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-linkedin-in"></i>
                    </a> */}
                    <a href="https://wa.me/919014100100" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-whatsapp"></i>
                    </a>
                  </div>
                </div>
                <p className="copyright-text">
                  Copyright <i className="fas fa-copyright"></i> {currentYear} <a href="https://themeforest.net/user/themeholy" target="_blank" rel="noopener noreferrer">S Cuts</a>. All Rights Reserved.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-xl-auto">
              <div className="widget widget_nav_menu footer-widget">
                <h3 className="widget_title">Our Services</h3>
                <div className="menu-all-pages-container">
                  <ul className="menu">
                    {services.map((service, index) => (
                      <li key={index}>
                        <Link to={service.path}>{service.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-xl-auto">
              <div className="widget widget_nav_menu footer-widget">
                <h4 className="widget_title">Opening Time</h4>
                <ul className="th-widget-schedule">
                  {openingTimes.map((time, index) => (
                    <li key={index}>
                      <span className="footer-info d-block mb-2" style={{color: '#B7BEC8'}}>{time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-md-6 col-xl-auto">
              <div className="widget footer-widget">
                <h3 className="widget_title">Explore Instagram</h3>
                <div className="sidebar-gallery">
                  {galleryImages.map((img, index) => (
                    <div key={index} className="gallery-thumb">
                      <img src={img} alt={`Gallery Image ${index + 1}`} />
                      <a href={img} className="gallery-btn th-popup-image">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <video autoPlay loop muted>
          <source src="assets/img/bg/Schun_beauty.mp4" type="video/mp4" />
        </video>
        <div className="footer-title">
          <h3 className="box-title">
            <Link to="/services" style={{fontSize: "40px"}}>Explore Every Detail of S Cuts</Link>
          </h3>
        </div>
      </div>

      <style>{`
        .footer-wrapper {
          background-color: #121214;
          color: #fff;
          padding: 80px 0 0;
          position: relative;
          z-index: 2;
        }
        .footer-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 50px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          margin-bottom: 50px;
        }
        .footer-menu {
          list-style: none;
          padding: 0;
          margin: 0 0 50px 0;
          display: flex;
          justify-content: center;
          gap: 30px;
          flex-wrap: wrap;
        }
        .footer-menu a {
          color: #fff;
          text-transform: uppercase;
          font-weight: 500;
          font-size: 14px;
          letter-spacing: 1px;
        }
        .footer-menu a:hover {
          color: #FF752B;
        }
        .widget_title {
          color: #fff;
          margin-bottom: 30px;
          font-size: 20px;
          position: relative;
          padding-bottom: 15px;
        }
        .widget_title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 50px;
          height: 2px;
          background: #FF752B;
        }
        .about-text {
          color: #B7BEC8;
          margin-bottom: 25px;
          line-height: 1.8;
        }
        .th-social a {
          width: 40px;
          height: 40px;
          line-height: 40px;
          background: rgba(255,255,255,0.05);
          color: #fff;
          display: inline-block;
          text-align: center;
          border-radius: 50%;
          margin-right: 10px;
          transition: 0.3s;
        }
        .th-social a:hover {
          background: #FF752B;
          transform: translateY(-3px);
        }
        .copyright-text {
          margin-top: 30px;
          color: #B7BEC8;
          font-size: 14px;
        }
        .footer-widget ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer-widget ul li {
          margin-bottom: 12px;
        }
        .footer-widget ul li a {
          color: #B7BEC8;
          transition: 0.3s;
        }
        .footer-widget ul li a:hover {
          color: #FF752B;
          padding-left: 5px;
        }
        .sidebar-gallery {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .gallery-thumb {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
        }
        .gallery-thumb img {
          width: 100%;
          height: 80px;
          object-fit: cover;
          transition: 0.3s;
        }
        .gallery-thumb:hover img {
          transform: scale(1.1);
        }
        .gallery-btn {
          position: absolute;
          inset: 0;
          background: rgba(255,117,43,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: 0.3s;
          color: #fff;
        }
        .gallery-thumb:hover .gallery-btn {
          opacity: 1;
        }
        .footer-bottom {
          position: relative;
          height: 200px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 50px;
        }
        .footer-bottom video {
          position: absolute;
          top: 50%;
          left: 50%;
          min-width: 100%;
          min-height: 100%;
          width: auto;
          height: auto;
          transform: translate(-50%, -50%);
          z-index: 1;
          filter: brightness(0.4);
        }
        .footer-title {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 0 20px;
        }
        .footer-title h3 a {
          font-size: clamp(30px, 5vw, 60px);
          color: #fff;
          font-family: var(--title-font);
        }
        @media (max-width: 767px) {
          .footer-top {
            flex-direction: column;
            gap: 30px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  )
}

export default Footer