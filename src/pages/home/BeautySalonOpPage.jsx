// import PageWrapper from '../../components/layout/PageWrapper'
// import HeroSlider from '../../components/sections/HeroSlider'
// import ServicesSection from '../../components/sections/ServicesSection'
// import AboutSection from '../../components/sections/AboutSection'
// import StatsBar from '../../components/sections/StatsBar'
// import TestimonialsSection from '../../components/sections/TestimonialsSection'
// import TeamSection from '../../components/sections/TeamSection'
// import CtaBanner from '../../components/sections/CtaBanner'
// import BlogSection from '../../components/sections/BlogSection'

// const BeautySalonOpPage = () => {
//   return (
//     <PageWrapper 
//       title="Beauty Salon - Schun Spa & Wellness" 
//       description="Experience our premium beauty services in a single page - Schun Beauty Salon OnePage."
//     >
//       <HeroSlider
//        modules={[EffectFade, Autoplay, Pagination, Navigation]}
//           effect="fade"
//           speed={1800}
//           loop={true}
//           autoplay={{ delay: 5000 }}
//           pagination={{ el: '.slider-pagination', clickable: true }}
//           navigation={{ prevEl: '.slider-prev', nextEl: '.slider-next' }}
//           className="th-slider" 
//         customSlides={[
//           {
//             id: 1,
//             bgImage: 'assets/img/hero/hero_bg_1_1.jpg',
//             title: "Reveal Your Natural Beauty",
//             subtitle: "Experience world-class spa treatments and beauty services designed to relax, rejuvenate, and restore your natural glow.",
//             ctaText: "Book Appointment",
//             ctaLink: "#services"
//           },
//           {
//             id: 2,
//             bgImage: 'assets/img/hero/hero_bg_1_2.jpg',
//             title: "Radiant Skin Starts Here",
//             subtitle: "Our advanced skincare treatments will leave your skin glowing and healthy.",
//             ctaText: "Explore Services",
//             ctaLink: "#services"
//           },
//           {
//             id: 3,
//             bgImage: 'assets/img/hero/hero_bg_1_3.jpg',
//             title: "Your Beauty, Our Passion",
//             subtitle: "Experience luxury beauty treatments tailored to enhance your natural glow.",
//             ctaText: "Book Now",
//             ctaLink: "#contact"
//           }
//         ]}
//         subtitle="Welcome to Schun"
//       />
//       <div id="services">
//         <ServicesSection />
//       </div>
//       <StatsBar />
//       <AboutSection />
//       <TestimonialsSection />
//       <div id="team">
//         <TeamSection />
//       </div>
//       <div id="contact">
//         <CtaBanner />
//       </div>
//       <BlogSection />
//     </PageWrapper>
//   )
// }

// export default BeautySalonOpPage


import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const HeroSlider = () => {
  const slides = [
    {
      bg: 'assets/img/hero/hero_bg_1_1.jpg',
      title: 'Elegant beauty Experts salon',
      text: 'At our salun, beauty transcends mere services; it’s a journey of transformation. We are committed to revitalizing your skin and elevating your overall experience.',
    },
    {
      bg: 'assets/img/hero/hero_bg_1_2.jpg',
      title: 'Unleash the Power of Your Look',
      text: 'At our salun, beauty transcends mere services; it’s a journey of transformation. We are committed to revitalizing your skin and elevating your overall experience.',
    },
    {
      bg: 'assets/img/hero/hero_bg_1_3.jpg',
      title: 'Bold Beauty, Timeless Elegance',
      text: 'At our salun, beauty transcends mere services; it’s a journey of transformation. We are committed to revitalizing your skin and elevating your overall experience.',
    },
  ];

  return (
    <div className="th-hero-wrapper hero-1" id="hero">
      <Swiper
        modules={[EffectFade, Autoplay, Pagination]}
        effect="fade"
        speed={1800}
        loop={true}
        autoplay={{ delay: 5000 }}
        pagination={{ el: '.slider-pagination', clickable: true }}
        className="th-slider"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx} data-image={slide.bg}>
            <div className="hero-inner" style={{ backgroundImage: `url(${slide.bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="container">
                <div className="row align-items-end">
                  <div className="col-xl-8">
                    <div className="hero-style1">
                      <span className="sub-title">WELCOME TO Scuts SALON</span>
                      <h1 className="hero-title">{slide.title}</h1>
                      <p className="hero-text">{slide.text}</p>
                      <div className="btn-group">
                        <a className="th-btn style1" href="contact.html">Book An Appointment</a>
                        <a className="th-btn style2" href="service.html">Explore Our Services</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="slider-pagination"></div>
      </Swiper>
      <div className="scroll-down">
        <a className="hero-scroll-wrap" href="#about-sec">
          <img alt="" src="assets/img/icon/scroll-down.svg" />
        </a>
      </div>
      <div className="social-wrapp">
        <div className="social-links">
          <span className="title">WE SOCIAL</span>
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;