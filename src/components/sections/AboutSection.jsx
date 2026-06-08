import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { Link } from 'react-router-dom'

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  return (
    <div className="about-area overflow-hidden space" id="about-sec" ref={ref}>
      <div className="container">
        <div className="row gy-4">
          {/* Left Column - Title + Image */}
          <div className="col-lg-5 mb-30 mb-xl-0">
            <div className="title-area pe-xl-5">
              <h2 className="sec-title text-anime-style-3 text-white">
                About Us
              </h2>
              <span className="title-img">
                <img src="assets/img/theme-img/title_shape.svg" alt="shape" />
              </span>
              <h3 className="h4 text-white mt-30 text-uppercase">
                Best Scuts Spa & Beauty salon <span className="text-theme">Since 2019</span>
              </h3>
            </div>
            <div className="img-box1">
              <div className="img1 image scale">
                <img src="assets/img/normal/2.png" alt="About" />
              </div>
            </div>
          </div>

          {/* Right Column - Counter Image + Text + Client Box */}
          <div className="col-lg-7">
            <div className="ps-xl-4">
              <div className="img-box2">
                <div className="discount-wrapp">
                  <h2 className="about-counter">
                    <span className="counter-number">
                      {inView ? <CountUp end={10} duration={2} /> : '0'}
                    </span>
                  </h2>
                  <div className="discount-tag">
                    <span className="discount-anime">
                      {"We have Years of Experience in Beauty and Spa Services ** Scuts**".split("").map((char, index) => (
                        <span key={index} className={`char${index + 1}`}>{char === ' ' ? '\u00A0' : char}</span>
                      ))}
                    </span>
                  </div>
                </div>
                <div className="img2 image scale">
                  <img src="assets/img/normal/1.png" alt="About" />
                </div>
              </div>
              <p className="sec-text">
                “Luxury isn’t a service. It’s an experience you carry with you.”

                Welcome to S Cuts Salon & Spa — where style is crafted with precision and care.

                We create refined looks and relaxing experiences designed around you.

                Precision Styling
                Premium Products
                Personalised Care
                Relaxing Spa Rituals
                Expert Professionals

                At S Cuts Salon & Spa, every detail is thoughtfully designed to elevate your confidence.
              </p>
              
              {/* Client Box */}
              {/* <div className="client-box mt-60">
                <div className="client-thumb-group">
                  <div className="thumb">
                    <img src="assets/img/shape/client-1.png" alt="avater" />
                  </div>
                  <div className="thumb">
                    <img src="assets/img/shape/client-2.png" alt="avater" />
                  </div>
                  <div className="thumb">
                    <img src="assets/img/shape/client-3.png" alt="avater" />
                  </div>
                  <div className="thumb icon">
                    <i className="fa-solid fa-star"></i>
                    <span>5.0</span>
                  </div>
                  <h4 className="box-title">100k+ Clients Worldwide</h4>
                </div>
              </div> */}

              {/* Buttons */}
              <div className="btn-group mt-60">
                <Link to="/contact" className="th-btn style1">
                  DISCOVER US MORE
                </Link>
                <Link to="/services" className="th-btn style2">
                  BOOK ONLINE
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Shape */}
        {/* <div className="shape-mockup jumpAni d-none d-lg-block" style={{bottom: "0%", right: "0%"}}>
          <img src="assets/img/shape/element-1.png" alt="" />
        </div> */}
      </div>
    </div>
  )
}

export default AboutSection