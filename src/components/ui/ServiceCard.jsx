import { Link } from 'react-router-dom'

const ServiceCard = ({ id, title, description, icon, image, price, slug }) => {
  return (
    <div className="th-service service-block">
      <Link to={`/services/${slug}`} className="box-img">
        <img src={image} alt={title} />
      </Link>
      <h3 className="box-title">
        <Link to={`/services/${slug}`}>{title}</Link>
      </h3>
      <div className="box-content">
        <div className="service-social">
          <Link to={`/services/${slug}`} className="icon-btn">
            <img src="assets/img/icon/arrow-right2.svg" alt="" />
          </Link>
        </div>
        <div className="button-marquee">
          <div className="button">
            <Link to={`/services/${slug}`} className="text">VIEW DETAIL</Link>
            <span className="img">
              <img src="assets/img/icon/flower.svg" alt="" />
            </span>
            <Link to={`/services/${slug}`} className="text">VIEW DETAIL</Link>
            <span className="img">
              <img src="assets/img/icon/flower.svg" alt="" />
            </span>
            <Link to={`/services/${slug}`} className="text">VIEW DETAIL</Link>
            <span className="img">
              <img src="assets/img/icon/flower.svg" alt="" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard