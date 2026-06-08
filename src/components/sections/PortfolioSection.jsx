import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel } from 'swiper/modules'
import 'swiper/css'
import SectionTitle from '../ui/SectionTitle'

const portfolioItems = [
  {
    id: 1,
    title: 'Skin Care Treatment',
    number: '(01)',
    subtitle: 'Categories',
    category: 'Skin Care Treatment',
    thumb: 'assets/img/project/Skin care treatment 1.png',
    images: [
      'assets/img/project/Skin care treatment 1.png',
      'assets/img/project/Skin care treatment 2.png',
      'assets/img/project/Skin care treatment 3.png',
      'assets/img/project/Skin care treatment 4.png'
    ]
  },
  {
    id: 2,
    title: 'Facial Treatment',
    number: '(02)',
    subtitle: 'Categories',
    category: 'healthy hair',
    thumb: 'assets/img/project/project_1_5.jpg',
    images: [
      'assets/img/project/project_1_5.jpg',
      'assets/img/project/project_1_6.jpg',
      'assets/img/project/project_1_7.jpg',
      'assets/img/project/project_1_8.jpg'
    ]
  },
  {
    id: 3,
    title: 'Hair Coloring',
    number: '(03)',
    subtitle: 'Categories',
    category: 'touchable skin',
    thumb: 'assets/img/project/project_1_9.jpg',
    images: [
      'assets/img/project/project_1_9.jpg',
      'assets/img/project/project_1_10.jpg',
      'assets/img/project/project_1_11.jpg',
      'assets/img/project/project_1_12.jpg'
    ]
  },
  {
    id: 4,
    title: 'Spa Treatment',
    number: '(04)',
    subtitle: 'Categories',
    category: 'wellness treatments',
    thumb: 'assets/img/project/project_1_13.jpg',
    images: [
      'assets/img/project/project_1_13.jpg',
      'assets/img/project/project_1_14.jpg',
      'assets/img/project/project_1_15.jpg',
      'assets/img/project/project_1_16.jpg'
    ]
  }
]

const PortfolioSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef(null)

  const handleSlideChange = (index) => {
    setActiveIndex(index)
    if (swiperRef.current) {
      swiperRef.current.slideTo(index)
    }
  }

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev()
    }
  }

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext()
    }
  }



  return (
    <section className="project-area bg-smoke2 position-relative overflow-hidden space" id="project-sec">
      <div className="container">
        <div className="title-area text-center">
          <SectionTitle
            subtitle="Portfolio"
            title="Explore Our Portfolio"
          />
        </div>

        <div className="slider-area">
          {/* Fixed Navigation Overlay (Navigation Pill) */}
          <div className="project-nav-pill-wrapper">
             <div className="icon-box">
              <button 
                onClick={handlePrev} 
                className="slider-arrow style2 default slider-prev"
              >
                <i className="fa-solid fa-angle-left" style={{color: "white"}}></i>
              </button>
              
              <div className="text-center">
                <div className="project-thumb">
                  {portfolioItems.map((item, index) => (
                    <div 
                      key={item.id}
                      className={`tab-btn ${index === activeIndex ? 'active' : ''}`}
                    >
                      <img src={item.thumb} alt={item.title} />
                      <div className="category">
                        <span className="sub-title">Categories</span>
                        <h3 className="box-title">{item.category}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleNext} 
                className="slider-arrow style2 default slider-next"
              >
                <i className="fa-solid fa-angle-right" style={{color: "white"}}></i>
              </button>
            </div>
          </div>

          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Mousewheel]}
            direction="vertical"
            effect="slide"
            loop={false}
            mousewheel={{ releaseOnEdges: true }}
            spaceBetween={10}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="th-slider projectSlide has-shadow"
          >
            {portfolioItems.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="project-card">
                  <div className="project-card_wrapp">
                    <div className="box-img global-img">
                      <img src={item.images[0]} alt="project" />
                      <Link to={item.images[0]} className="icon-btn th-popup-image">
                        <i className="fas fa-plus"></i>
                      </Link>
                    </div>
                    <div className="box-img style2 global-img">
                      <img src={item.images[1]} alt="project" />
                      <Link to={item.images[1]} className="icon-btn th-popup-image">
                        <i className="fas fa-plus"></i>
                      </Link>
                    </div>
                    <div className="box-img style3 global-img">
                      <img src={item.images[2]} alt="project" />
                      <Link to={item.images[2]} className="icon-btn th-popup-image">
                        <i className="fas fa-plus"></i>
                      </Link>
                    </div>
                    <div className="box-img style4 global-img">
                      <img src={item.images[3]} alt="project" />
                      <Link to={item.images[3]} className="icon-btn th-popup-image">
                        <i className="fas fa-plus"></i>
                      </Link>
                    </div>
                  </div>
                  <div className="box-content">
                    <span className="number">{item.number}</span>
                    <h3 className="box-title">
                      <Link to="#">{item.title}</Link>
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style>{`
        .project-area {
          background-color: #1a1a1c;
        }
        
        .projectSlide {
          position: relative;
          height: 1074px;
          margin-right: -140px !important;
          z-index: 3;
        }

        @media (max-width: 1599px) {
          .projectSlide {
            margin-right: 0 !important;
          }
        }

        @media (max-width: 767px) {
          .projectSlide {
            height: 900px;
          }
        }

        .project-nav-pill-wrapper {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 100;
          width: 100%;
          pointer-events: none;
        }

        .icon-box {
          position: relative;
          margin: 0 auto;
          margin-top: 60px;
          background: #121214;
          backdrop-filter: blur(5px);
          border-radius: 64px;
          padding: 16px;
          width: 520px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0px;
          pointer-events: auto;
          z-index: 4;
          border: 1px solid rgba(255,117,43,0.3);
        }

        @media (max-width: 480px) {
          .icon-box {
            width: 90%;
          }
        }

        .slider-arrow {
          min-width: 58px;
          height: 58px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 48px;
          color: #fff;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .slider-arrow:hover {
          background-color: #FF752B;
        }

        .project-thumb {
          display: flex;
          width: 300px;
          position: relative;
          overflow: hidden;
          height: 58px;
        }

        @media (max-width: 480px) {
          .project-thumb {
            display: none;
          }
        }

        .tab-btn {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          border-radius: 48px;
          transition: all 0.4s ease-in-out;
          display: flex;
          gap: 16px;
          opacity: 0;
          visibility: hidden;
        }

        .tab-btn.active {
          opacity: 1;
          visibility: visible;
        }

        .tab-btn img {
          min-width: 88px;
          width: 88px;
          height: 58px;
          object-fit: cover;
          border-radius: 48px;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .tab-btn .category {
          text-align: left;
          min-width: 200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .tab-btn .category .sub-title {
          font-family: inherit;
          font-weight: 550;
          font-size: 14px;
          letter-spacing: 0.02em;
          color: #A3A3A3;
          text-transform: capitalize;
          display: block;
          margin-bottom: 2px;
        }

        .tab-btn .category .box-title {
          font-weight: 550;
          font-size: 18px;
          letter-spacing: 0.02em;
          color: #FFFFFF;
          margin-bottom: 0;
          line-height: 1.2;
        }

        .project-card {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          align-items: center;
        }

        .project-card_wrapp {
          display: grid;
          grid-template-columns: auto auto;
          width: 100%;
          padding: 60px 0;
        }

        @media (max-width: 767px) {
          .project-card_wrapp {
            gap: 30px;
          }
        }

        .project-card .box-content {
          position: absolute;
          top: 40%;
          left: 42%;
          transform: translate(-50%, -50%);
          z-index: 5;
        }

        @media (max-width: 1599px) {
          .project-card .box-content {
            left: 30%;
          }
        }

        .project-card .number {
          display: block;
          text-align: right;
          font-family: inherit;
          font-weight: 500;
          font-size: 32px;
          text-transform: capitalize;
          color: #111010ff;
          margin-right: -50px;
          margin-bottom: 14px;
        }

        .project-card .box-title {
          font-weight: 500;
          font-size: 56px;
          line-height: 66px;
          margin-bottom: 0;
          color: #1a1919ff;
        }

        .project-card .box-title a {
          color: inherit;
        }

        .project-card .box-img {
          position: relative;
          border-radius: 16px;
          max-width: 284px;
          height: 341px;
          z-index: 2;
          overflow: hidden;
        }

        .project-card .box-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 16px;
          transition: transform 0.5s ease;
        }

        .project-card .box-img:hover img {
          transform: scale(1.1);
        }

        @media (max-width: 991px) {
          .project-card .box-img {
            max-width: 200px;
          }
        }

        .project-card .box-img.style2 {
          max-width: 529px;
          height: 455px;
          display: block;
          margin-left: auto;
        }

        @media (max-width: 1199px) {
          .project-card .box-img.style2 {
            max-width: 390px;
          }
        }

        @media (max-width: 767px) {
          .project-card .box-img.style2 {
            max-width: 100%;
            height: 100%;
          }
        }

        .project-card .box-img.style3 {
          margin-top: 90px;
          margin-left: 100px;
        }

        .project-card .box-img.style4 {
          display: block;
          margin-left: auto;
          margin-right: 90px;
          margin-top: 231px;
        }

        .project-card .icon-btn {
          width: 50px;
          height: 50px;
          background-color: #fff;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          position: absolute;
          color: #121214;
          opacity: 0;
          visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translate(-50%, -50%);
          transition: all 0.4s ease-in-out;
          z-index: 10;
        }

        .project-card .box-img:hover .icon-btn {
          opacity: 1;
          visibility: visible;
        }

        .project-card .icon-btn:hover {
          background-color: #FF752B;
          color: #fff;
        }

        @media (max-width: 1299px) {
          .project-card .box-img:hover .icon-btn {
            top: 15%;
            right: 3%;
            left: unset;
          }
        }
      `}</style>
    </section>

  )
}

export default PortfolioSection