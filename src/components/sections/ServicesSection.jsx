import { useState } from 'react'
import { Link } from 'react-router-dom'
import SectionTitle from '../ui/SectionTitle'

const beautyServices = [
  {
    id: 1,
    title: 'Groom  Packages',
    image: 'assets/img/service/Groom packages.png',
    // image2: 'assets/img/service/ser_1.jpg',
    description: 'Our Beauty Salon is a haven of elegance and expertise, where are committed to helping you look and feel your best.',
    number: '01.'
  },
  {
    id: 2,
    title: 'Facial Care',
    image: 'assets/img/service/Facial care.png',
    // image2: 'assets/img/service/ser_2.jpg',
    description: 'Our Beauty Salon is a haven of elegance and expertise, where are committed to helping you look and feel your best.',
    number: '02.'
  },
  {
    id: 3,
    title: 'Packages For Men',
    image: 'assets/img/service/Packages for men.png',
    // image2: 'assets/img/service/ser_3.jpg',
    description: 'Our Beauty Salon is a haven of elegance and expertise, where are committed to helping you look and feel your best.',
    number: '03'
  },
  {
    id: 4,
    title: 'Hair Care',
    image: 'assets/img/service/Hair care women.png',
    // image2: 'assets/img/service/ser_4.jpg',
    description: 'Our Beauty Salon is a haven of elegance and expertise, where are committed to helping you look and feel your best.',
    number: '04'
  },
  {
    id: 5,
    title: 'Waxing',
    image: 'assets/img/service/Waxing.png',
    // image2: 'assets/img/service/ser_4.jpg',
    description: 'Our Beauty Salon is a haven of elegance and expertise, where are committed to helping you look and feel your best.',
    number: '05'
  },
  {
    id: 6,
    title: 'Skin Care',
    image: 'assets/img/service/Skin care.png',
    // image2: 'assets/img/service/ser_4.jpg',
    description: 'Our Beauty Salon is a haven of elegance and expertise, where are committed to helping you look and feel your best.',
    number: '06'
  },
  {
    id: 7,
    title: 'Cuts & Shaves',
    image: 'assets/img/service/Cuts and shaves.png',
    // image2: 'assets/img/service/ser_4.jpg',
    description: 'Our Beauty Salon is a haven of elegance and expertise, where are committed to helping you look and feel your best.',
    number: '07'
  },
]

const ServicesSection = () => {
  const [activeService, setActiveService] = useState(1)

  return (
    <section className="position-relative overflow-hidden space" id="service-sec">
      <div className="container">
        {/* Title Row */}
        <div className="row justify-content-lg-between justify-content-center align-items-center">
          <div className="col-lg-6">
            <div className="title-area">
              <h2 className="sec-title text-anime-style-3 text-white">
                Beauty Care services
              </h2>
              <span className="title-img">
                <img src="assets/img/theme-img/title_shape.svg" alt="shape" />
              </span>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="sec-btn wow fadeInUp">
              <p className="sec-text2">
                We provide a tranquil space for those looking to elevate their natural allure and express their personal flair.
              </p>
            </div>
          </div>
        </div>

        {/* Service List Area */}
        <div className="service-area position-relative">
          <div className="service-list-area">
            {beautyServices.map((service, index) => (
              <div 
                key={service.id}
                className={`service-list hover-item ${activeService === service.id ? 'item-active' : ''}`}
                onMouseEnter={() => setActiveService(service.id)}
              >
                <div className="service-img global-img">
                  <img src={service.image} alt="" />
                </div>
                <div className="service-img2 global-img">
                  <img src={service.image2} alt="" />
                </div>
                <div className="service-content">
                  <div className="shape">
                    <img src="assets/img/icon/ser-shape-1.svg" alt="" />
                  </div>
                  <h3 className="box-title">{service.title}</h3>
                  <p className="box-text">{service.description}</p>
                  <Link to="/services" className="th-btn style4 th-icon">
                    VIEW DETAILS
                  </Link>
                </div>
                <div className="service-list-content">
                  <div className="service-wrapp">
                    {/* <span className="number">{service.number}</span> */}
                    <h3 className="box-title">{service.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* BOOK A SERVICE Button */}
          {/* <div className="ser-btn">
            <Link to="/services" className="th-btn2 th-icon">
              BOOK A SERVICE
            </Link>
          </div> */}
        </div>

        {/* Decorative Shape */}
        {/* <div className="shape-mockup spin d-none d-xl-block" style={{right: "10%", bottom: "21%"}}>
          <img src="assets/img/shape/element-3.png" alt="" />
        </div> */}
      </div>
    </section>
  )
}

export default ServicesSection