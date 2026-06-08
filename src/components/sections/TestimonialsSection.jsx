// import { useInView } from 'react-intersection-observer'
// import { motion } from 'framer-motion'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Pagination, Navigation, Autoplay } from 'swiper/modules'
// import { testimonials } from '../../data/testimonials'
// import TestimonialCard from '../ui/TestimonialCard'
// import SectionTitle from '../ui/SectionTitle'

// import 'swiper/css'
// import 'swiper/css/pagination'
// import 'swiper/css/navigation'

// const TestimonialsSection = () => {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   })

//   return (
//     <section className="bg-smoke2 space overflow-hidden" ref={ref}>
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-lg-7">
//             <SectionTitle
//               subtitle="Testimonials"
//               title="What Our Clients Say"
//               description="Hear what our valued clients have to say about their experience at Schun."
//               align="center"
//             />
//           </div>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//         >
//           <Swiper
//             modules={[Pagination, Navigation, Autoplay]}
//             autoplay={{
//               delay: 4000,
//               disableOnInteraction: false,
//             }}
//             pagination={{
//               clickable: true,
//               el: '.testimonial-pagination',
//             }}
//             navigation={{
//               nextEl: '.testimonial-next',
//               prevEl: '.testimonial-prev',
//             }}
//             loop={true}
//             spaceBetween={30}
//             breakpoints={{
//               0: { slidesPerView: 1 },
//               768: { slidesPerView: 2 },
//               992: { slidesPerView: 2 },
//             }}
//           >
//             {testimonials.map((testimonial) => (
//               <SwiperSlide key={testimonial.id}>
//                 <TestimonialCard {...testimonial} />
//               </SwiperSlide>
//             ))}
//           </Swiper>
          
//           <div className="slider-controller mt-4">
//             <div className="testimonial-pagination" style={{
//               display: 'flex',
//               justifyContent: 'center',
//               gap: '8px',
//               marginTop: '20px'
//             }}></div>
//             <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px' }}>
//               <button className="testimonial-prev" style={{
//                 background: 'transparent',
//                 border: '1px solid #ddd',
//                 width: '50px',
//                 height: '50px',
//                 borderRadius: '50%',
//                 cursor: 'pointer'
//               }}>
//                 <i className="fas fa-arrow-left"></i>
//               </button>
//               <button className="testimonial-next" style={{
//                 background: 'transparent',
//                 border: '1px solid #ddd',
//                 width: '50px',
//                 height: '50px',
//                 borderRadius: '50%',
//                 cursor: 'pointer'
//               }}>
//                 <i className="fas fa-arrow-right"></i>
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   )
// }

// export default TestimonialsSection



import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TestimonialsSection = () => {
  const testimonials = [
    { name: 'Sarah Smith', text: 'I was very impressed with the solar panel installation process. The team was efficient, professional, and always kept me informed of the progress.', title: 'Flexible schedule and Cordial Expert Team!' },
    { name: 'Emily Smith', text: 'I was very impressed with the solar panel installation process. The team was efficient, professional, and always kept me informed of the progress.', title: 'Incredible Results and Cost Savings!' },
    { name: 'Michael Taylor', text: 'I was very impressed with the solar panel installation process. The team was efficient, professional, and always kept me informed of the progress.', title: 'Got a incridible style by Scuts salon!' },
    { name: 'Sarah Smith', text: 'I was very impressed with the solar panel installation process. The team was efficient, professional, and always kept me informed of the progress.', title: 'A Worthwhile Service by the salon!' },
  ];

  return (
    <section className="testi-area position-relative overflow-hidden space" id="testi-sec">
      <div className="container-fiuld">
        <div className="title-area text-center">
          <h2 className="sec-title text-anime-style-3">Customers Bright Feedback</h2>
          <span className="title-img">
            <img alt="shape" src="assets/img/theme-img/title_shape.svg" />
          </span>
        </div>
        <div className="slider-wrap">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              576: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1400: { slidesPerView: 4 },
              1600: { slidesPerView: 5 }
            }}
            navigation={{ prevEl: '.slider-prev', nextEl: '.slider-next' }}
            pagination={{ el: '.slider-pagination', clickable: true }}
            className="testiSlide1"
          >
            {testimonials.map((testi, idx) => (
              <SwiperSlide key={idx}>
                <div className="testi-card">
                  <span className="rating">
                    {[...Array(5)].map((_, i) => <i key={i} className="fa-sharp fa-solid fa-star-sharp"></i>)}
                  </span>
                  <h3 className="box-title2">{testi.title}</h3>
                  <p className="box-text">{testi.text}</p>
                  <div className="box-wrapp">
                    <div className="box-profile">
                      <div className="box-author">
                        <img alt="Avater" src={`assets/img/testimonial/testi_1_${idx+1}.png`} />
                      </div>
                      <div className="box-info">
                        <h3 className="box-title">{testi.name}</h3>
                        <span className="box-desig">Customer</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="slider-controller">
            <div className="slider-pagination"></div>
            <button className="slider-arrow style2 default slider-prev">
              <img alt="" src="assets/img/icon/arrow-left3.svg" />
            </button>
            <button className="slider-arrow style2 default slider-next">
              <img alt="" src="assets/img/icon/arrow-right3.svg" />
            </button>
          </div>
        </div>
      </div>
      <div className="shape-mockup jumpAni d-none d-xl-block" style={{ left: '0%', top: '0%' }}>
        <img alt="" src="assets/img/shape/flower-3.png" />
      </div>
    </section>
  );
};

export default TestimonialsSection;