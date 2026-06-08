// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import SectionTitle from '../ui/SectionTitle'
// import { faq } from '../../data/faq'

// const FaqSection = () => {
//   const [activeIndex, setActiveIndex] = useState(0)

//   return (
//     <div className="overflow-hidden" id="faq-sec">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-xl-8">
//             <div className="title-area text-center">
//               <SectionTitle
//                 subtitle="FAQ"
//                 title="Frequently Asked Questions"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-lg-12">
//             <div className="accordion" id="faqAccordion">
//               {faq.slice(0, 4).map((item, index) => (
//                 <div key={index} className={`accordion-item ${activeIndex === index ? 'active' : ''}`}>
//                   <h3 className="accordion-header" id={`heading-${index}`}>
//                     <button
//                       className={`accordion-button ${activeIndex === index ? '' : 'collapsed'}`}
//                       type="button"
//                       onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
//                     >
//                       {item.question}
//                     </button>
//                   </h3>
//                   <div 
//                     id={`collapse-${index}`}
//                     className={`accordion-collapse collapse ${activeIndex === index ? 'show' : ''}`}
//                   >
//                     <div className="accordion-body">
//                       <p>{item.answer}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default FaqSection





import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FaqSection = () => {
  const faqs = [
    { q: 'What services does S Cuts Salon & Spa offer?', a: 'We offer a wide range of beauty and grooming services including haircuts, styling, facials, skin care treatments, spa therapies, grooming packages, and waxing for both men and women.' },
    { q: 'Do I need to book an appointment in advance?', a: 'Yes, we recommend booking in advance to ensure availability and avoid waiting time. You can easily book online or contact us directly.' },
    { q: 'What products do you use for treatments?', a: 'We use premium, high-quality beauty and skincare products to ensure safe, effective, and long-lasting results for our clients.' },
    { q: 'Do you offer services for men?', a: 'Yes, we provide specialized grooming packages for men including haircuts, shaves, facials, and complete grooming solutions. (Groom Packages section)' },
    { q: 'Are your services suitable for all skin types?', a: 'Absolutely. Our treatments are customized based on your skin type and concerns, ensuring safe and personalized care.' },
    { q: 'How long does a typical facial or spa session take?', a: 'Depending on the service, sessions usually range from 30 minutes to 90 minutes for a complete relaxing experience.' },
  ];

  const [openIndex, setOpenIndex] = useState(1);

  return (
    <div className="overflow-hidden overflow-hidden" id="faq-sec">
      <div className="container th-container3">
        <div className="row">
          <div className="col-xl-5">
            <div className="title-area mb-40">
              <h2 className="sec-title text-white">Frequently Asked Questions</h2>
              <span className="title-img">
                <img alt="shape" src="assets/img/theme-img/title_shape.svg" />
              </span>
              <p className="mt-40 text-white">
                Didn't find the answer to your question?
                <span className="d-block">Send it to us by chat. We will be happy to answer you!</span>
              </p>
            </div>
            <div className="faq-button">
              <Link className="th-btn style1" to="/contact">CONTACT US</Link>
            </div>
          </div>
          <div className="col-xl-7">
            <div className="accordion-area accordion mt-n1" id="faqAccordion2">
              {faqs.map((faq, idx) => (
                <div key={idx} className={`accordion-card style2 ${openIndex === idx ? 'active' : ''}`}>
                  <div className="accordion-header" id={`collapse-item-${idx+4}`}>
                    <button
                      className={`accordion-button ${openIndex === idx ? '' : 'collapsed'}`}
                      onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                      type="button"
                    >
                      {faq.q}
                    </button>
                  </div>
                  <div className={`accordion-collapse collapse ${openIndex === idx ? 'show' : ''}`}>
                    <div className="accordion-body">
                      <p className="faq-text">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;