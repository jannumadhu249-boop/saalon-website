import React from 'react';
import { Link } from 'react-router-dom';

const ProductShowcase = () => {
  const products = [
    { title: 'Face Peeling', img: 'faq_1_1.png', imgHover: 'faq_1.png' },
    { title: 'Hydration', img: 'faq_1_2.png', imgHover: 'faq_2.png' },
    { title: 'Tanned Skin', img: 'faq_1_3.png', imgHover: 'faq_3.png' },
  ];

  return (
    <section className="position-relative overflow-hidden space">
      <div className="container">
        <div className="row justify-content-lg-between justify-content-center align-items-center">
          <div className="col-lg-6">
            <div className="title-area text-center text-lg-start">
              <h2 className="sec-title text-anime-style-3 text-white">Face & Body Care</h2>
              <span className="title-img">
                <img alt="shape" src="assets/img/theme-img/title_shape.svg" />
              </span>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="sec-btn wow fadeInUp text-center text-lg-start">
              <p className="sec-text2">Your hair tells a story about who you are, and we’re dedicated to helping you share that narrative with elegance.</p>
            </div>
          </div>
        </div>
        <div className="row accordion-area product" id="faqAccordion">
          {products.map((product, idx) => (
            <div key={idx} className="col-md-6 col-xl-4 accordion-card_wrapp">
              <div className="product-card">
                <div className="box-wrapp">
                  <h3 className="box-title">{product.title}</h3>
                  <div className="icon"></div>
                </div>
                <div className="box-img">
                  <img alt="" src={`assets/img/normal/${product.img}`} />
                </div>
                <div className="box-content">
                  <div className="box-img2">
                    <img alt="" src={`assets/img/normal/${product.imgHover}`} />
                  </div>
                  <p className="box-text">Your hair tells a story about who you are, and we’re dedicated to helping you share that narrative with elegance.</p>
                  <Link className="th-btn style1" to="/shop">
                    READ MORE <img alt="" src="assets/img/icon/arrow-icon.svg" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="sec-btn mt-60 mb-0 text-center">
        <Link className="th-btn2 th-icon" to="/shop">BROWSE ALL</Link>
      </div>
    </section>
  );
};

export default ProductShowcase;