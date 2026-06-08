const TestimonialCard = ({ name, role, avatar, rating = 5, text }) => {
  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i key={i} className={`fas fa-star ${i <= rating ? 'text-theme' : ''}`}></i>
      )
    }
    return stars
  }

  return (
    <div className="th-review-widget">
      <div className="profile">
        <div className="author">
          <img src={avatar} alt={name} />
        </div>
        <div className="media-body">
          <h4 className="name">{name}</h4>
          <span className="desig">{role}</span>
        </div>
      </div>
      <div className="rating">
        {renderStars(rating)}
      </div>
      <p className="box-text">"{text}"</p>
    </div>
  )
}

export default TestimonialCard