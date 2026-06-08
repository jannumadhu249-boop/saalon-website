const Badge = ({ children, variant = 'default', className = '' }) => {
  const variantClasses = {
    default: '',
    primary: 'category',
    sale: 'category',
    new: 'category'
  }

  return (
    <span className={`badge ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  )
}

export default Badge