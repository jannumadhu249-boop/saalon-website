import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageWrapper from '../../components/layout/PageWrapper'
import Breadcrumb from '../../components/layout/Breadcrumb'
import { faq } from '../../data/faq'

const FaqPage = () => {
  const [openId, setOpenId] = useState(null)

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id)
  }

  const categories = [...new Set(faq.map(f => f.category))]
  
  const groupedFaqs = categories.map(cat => ({
    category: cat,
    questions: faq.filter(f => f.category === cat)
  }))

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'FAQ', path: '/faq' }
  ]

  return (
    <PageWrapper title="FAQ">
      <Breadcrumb items={breadcrumbItems} />
      
      <section className="breadcumb-wrapper" style={{
        padding: '60px 0',
        background: '#f9f9f9'
      }}>
        <div className="container">
          <div className="text-center">
            <h1>Frequently Asked Questions</h1>
            <p>Find answers to common questions about our services.</p>
          </div>
        </div>
      </section>

      <section className="space overflow-hidden">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8">
              <div className="accordion-area">
                {groupedFaqs.map((group, groupIndex) => (
                  <div key={groupIndex} className="mb-5">
                    <h3 className="mb-4" style={{ fontFamily: 'var(--font-heading)', color: '#FF752B' }}>
                      {group.category}
                    </h3>
                    {group.questions.map((item) => (
                      <div 
                        key={item.id}
                        className="accordion-card"
                        style={{
                          background: '#fff',
                          borderRadius: '12px',
                          marginBottom: '12px',
                          overflow: 'hidden',
                          border: '1px solid #eee'
                        }}
                      >
                        <button
                          onClick={() => toggleFaq(item.id)}
                          style={{
                            width: '100%',
                            padding: '20px 24px',
                            background: 'none',
                            border: 'none',
                            textAlign: 'left',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <span style={{ fontWeight: 600, fontSize: '16px' }}>
                            {item.question}
                          </span>
                          <i 
                            className={`fas ${openId === item.id ? 'fa-minus' : 'fa-plus'}`}
                            style={{ 
                              color: '#FF752B',
                              transition: 'transform 0.3s ease'
                            }}
                          ></i>
                        </button>
                        <div 
                          style={{
                            maxHeight: openId === item.id ? '200px' : '0',
                            overflow: 'hidden',
                            transition: 'max-height 0.3s ease'
                          }}
                        >
                          <div style={{ 
                            padding: '0 24px 20px', 
                            color: 'var(--color-body)',
                            lineHeight: '1.7'
                          }}>
                            {item.answer}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-5 pt-4" style={{ borderTop: '1px solid #eee' }}>
            <p className="mb-3">Didn't find the answer to your question?</p>
            <Link to="/contact" className="th-btn style1">Contact Us</Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

export default FaqPage