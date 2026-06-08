import { Link } from 'react-router-dom'

const BlogCard = ({ title, excerpt, date, author, category, image, slug }) => {
  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  }) : ''

  return (
    <div className="blog-card">
      <div className="blog-img">
        <Link to={`/blog/${slug}`}>
          <img src={image} alt={title} />
        </Link>
        <span className="blog-tag">{category}</span>
      </div>
      <div className="blog-content">
        <div className="blog-meta">
          <Link to={`/blog/${slug}`}>
            <i className="fa-sharp fa-solid fa-calendar-days"></i>
            {formattedDate}
          </Link>
          <Link to={`/blog/${slug}`}>
            <i className="fa-solid fa-user"></i>
            {author}
          </Link>
        </div>
        <h3 className="blog-title">
          <Link to={`/blog/${slug}`}>{title}</Link>
        </h3>
        <p className="blog-text">{excerpt}</p>
        <Link to={`/blog/${slug}`} className="th-btn style4 th-icon">
          READ MORE
        </Link>
      </div>
    </div>
  )
}

export default BlogCard