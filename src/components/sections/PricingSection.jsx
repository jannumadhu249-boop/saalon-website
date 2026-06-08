import React from 'react';
import { Link } from 'react-router-dom';

const PricingSection = () => {
  const plans = [
    {
      name: 'Essential Glow',
      price: 90,
      features: ['Express Facial', 'Manicure & Pedicure', 'Deep Tissue Massage', 'Aromatherapy Treatment'],
      popular: false,
      delay: '.2s',
    },
    {
      name: 'relax & Renew',
      price: 129,
      features: ['Deep Cleansing Facial', 'Manicure & Pedicure', 'Deep Tissue Massage', 'Aromatherapy Treatment'],
      popular: false,
      delay: '.4s',
    },
    {
      name: 'everday elegance',
      price: 199,
      features: ['Haircut & Style', 'Eyelash Extensions', 'Express Facial', 'Body Massage & Spa'],
      popular: true,
      delay: '.6s',
    },
    {
      name: 'luxury spa day',
      price: 299,
      features: ['Fully Body Massage', 'Anti-Aging Facial', 'Delux Spa Session', 'Aromatherapy Treatment'],
      popular: false,
      delay: '.8s',
    },
  ];

  return (
    <section className="bg-smoke2 overflow-hidden space overflow-hidden">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="title-area text-center">
              <h2 className="sec-title text-anime-style-3">Affordable Pricing Plan</h2>
              <span className="title-img">
                <img src="assets/img/theme-img/title_shape.svg" alt="shape" />
              </span>
              <p className="mt-40">
                We believe that self-care and beauty should be accessible to everyone. That’s
                why we offer a range of thoughtfully curated pricing packages designed to meet your unique needs.
              </p>
            </div>
          </div>
        </div>

        <div className="row gy-4 justify-content-center">
          {plans.map((plan, idx) => (
            <div key={idx} className="col-xl-4 col-xxl-3 col-md-6">
              <div className={`price-box th-ani wow fadeInUp ${plan.popular ? 'active' : ''}`} data-wow-delay={plan.delay}>
                {plan.popular && <span className="offer-tag">POPULAR</span>}
                <h3 className="box-title">{plan.name}</h3>
                <h4 className="box-price">
                  <span className="dollar">₹</span>{plan.price}
                </h4>
                <div className="box-content">
                  <div className="available-list">
                    <ul>
                      {plan.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <Link to="/contact" className="th-btn black-border fw-btn">
                    CHOOSE PLAN <i className="fa-solid fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative shapes */}
      <div className="shape-mockup jump-reverse d-none d-xxl-block" data-top="0%" data-left="0%">
        <img src="assets/img/shape/flower-5.png" alt="" />
      </div>
      <div className="shape-mockup movingX d-none d-xxl-block" data-bottom="0%" data-right="0%">
        <img src="assets/img/shape/element-6.png" alt="" />
      </div>
    </section>
  );
};

export default PricingSection;