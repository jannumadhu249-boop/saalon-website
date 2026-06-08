import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/effect-fade';

const slides = [
  {
    id: 1,
    bgImage: '/assets/img/hero/bg1/1.png',
    title: 'Elegant beauty Experts salon',
    subtitle: 'S Cuts Salon & Spa offers premium styling and relaxing spa services with expert professionals, personalised care, and high-quality products. Experience precision, comfort, and confidence in every visit.',
  },
  {
    id: 2,
    bgImage: '/assets/img/hero/bg1/5.png',
    title: 'Unleash the Power of Your Look',
    subtitle: 'S Cuts Salon & Spa offers premium styling and relaxing spa services with expert professionals, personalised care, and high-quality products. Experience precision, comfort, and confidence in every visit.',
  },
  {
    id: 3,
    bgImage: '/assets/img/hero/bg1/3.png',
    title: 'Bold Beauty, Timeless Elegance',
    subtitle: 'S Cuts Salon & Spa offers premium styling and relaxing spa services with expert professionals, personalised care, and high-quality products. Experience precision, comfort, and confidence in every visit.',
  }
];

const HeroSlider = () => {
  return (
    <div className="th-hero-wrapper hero-1" id="hero">
      <Swiper style={{ height: "100vh" }} modules={[Autoplay, EffectFade, Pagination]} effect="fade" speed={1500} loop={false} fadeEffect={{ crossFade: true }} autoplay={{ delay: 5000, disableOnInteraction: true }} pagination={{ el: '.slider-pagination', clickable: true }} className="th-slider" id="heroSlide1" >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => (
              <div
                className="hero-inner"
                style={{
                  backgroundRepeat: 'no-repeat',
                  display: 'flex',
                  // alignItems: 'flex-end', 
                  paddingBottom: '50px',
                  backgroundImage: `url("${slide.bgImage}")`,
                  // backgroundSize: 'cover', 
                  // backgroundPosition: 'center',
                  backgroundColor: '#000'
                }}
              >
                <div className="container">
                  <div className="row align-items-end">
                    <div className="col-xl-8">
                      <div className="hero-style1">
                        <AnimatePresence>
                          {isActive && (
                            <>
                              <motion.span
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="sub-title"
                              >
                                WELCOME TO Scuts SALON
                              </motion.span>
                              <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="hero-title"
                              >
                                {slide.title}
                              </motion.h1>
                              <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="hero-text"
                              >
                                {slide.subtitle}
                              </motion.p>
                              <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                                className="btn-group"
                              >
                                <Link to="/contact" className="th-btn style1">Book An Appointment</Link>
                                <Link to="/services" className="th-btn style2">Explore Our Services</Link>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
        <div className="slider-dots">
          <div className="slider-pagination" data-slider-id="#heroSlide1"></div>
        </div>
        <div className="slider-pagination2"></div>
      </Swiper>

      <div className="scroll-down">
        <a href="#about-sec" className="hero-scroll-wrap">
          <img src="/assets/img/icon/scroll-down.svg" alt="" />
        </a>
      </div>

      <div className="social-wrapp" style={{
        display: 'block',
        zIndex: 99,
        WebkitMaskImage: 'url(/assets/img/shape/bg-shape.png)',
        maskImage: 'url(/assets/img/shape/bg-shape.png)'
      }}>
        <div className="social-links">
          <span className="title">WE SOCIAL</span>
          <a href="https://www.facebook.com/scuts82"><i className="fab fa-facebook-f"></i></a>
          <a href="https://www.instagram.com/scuts_82/"><i className="fab fa-instagram"></i></a>
          <a href='https://wa.me/919010460800'><i className="fab fa-whatsapp"></i></a>
        </div>
      </div>
    </div >
  );
};

export default HeroSlider;