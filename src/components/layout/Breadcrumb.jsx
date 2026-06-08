import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import $ from 'jquery'
import 'jquery.ripples'

const Breadcrumb = ({ items, bgImage = '/assets/img/bg/breadcumb-bg.jpg' }) => {
  const rippleRef = useRef(null)

  useEffect(() => {
    try {
      if (rippleRef.current) {
        $(rippleRef.current).ripples({
          resolution: 256,
          dropRadius: 20,
          perturbance: 0.04,
          imageUrl: bgImage,
        })
      }
    } catch (error) {
      console.warn("Ripples not initialized:", error)
    }

    return () => {
      try {
        if (rippleRef.current) {
          $(rippleRef.current).ripples('destroy')
        }
      } catch (error) {
        // Ignore destroy error
      }
    }
  }, [])

  if (!items || items.length === 0) return null
  
  const title = items[items.length - 1]?.label || 'Breadcrumb'

  return (
    <div ref={rippleRef} className="breadcumb-wrapper th-ripples" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="container">
        <div className="breadcumb-content">
          <motion.h1 
            className="breadcumb-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {title}
          </motion.h1>
          <motion.ul 
            className="breadcumb-menu"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >

            {items.map((item, index) => {
              const isLast = index === items.length - 1
              return (
                <li key={index}>
                  {isLast ? (
                    <span>{item.label}</span>
                  ) : (
                    <Link to={item.path || '#'}>{item.label}</Link>
                  )}
                </li>
              )
            })}
          </motion.ul>
        </div>
      </div>
    </div>
  )
}

export default Breadcrumb