import React from 'react'

const SectionTitle = ({ 
  subtitle, 
  title, 
  description, 
  align = 'center', 
  className = '',
  showShape = true
}) => {
  const alignClass = align === 'center' ? 'text-center' : ''
  
  return (
    <div className={`title-area ${alignClass} ${className}`}>
      {subtitle && (
        <span className="sub-title" style={{ color: '#FF752B' }}>
          {subtitle}
        </span>
      )}
      {title && (
        <h2 className="sec-title">{title}</h2>
      )}
      {showShape && (
        <span className="title-img">
          <img src="assets/img/theme-img/title_shape.svg" alt="shape" />
        </span>
      )}
      {description && (
        <p className="mb-0">{description}</p>
      )}
    </div>
  )
}

export default SectionTitle