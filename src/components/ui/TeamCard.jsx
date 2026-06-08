import { Link } from 'react-router-dom'

const TeamCard = ({ name, role, image, social, slug }) => {
  return (
    <div className="th-team team-card">
      <div className="box-img">
        <img src={image} alt={name} />
      </div>
      <div className="box-content">
        <div className="team-social">
          <Link to={`/team/${slug}`} className="icon-btn">
            <img src="assets/img/icon/arrow-right2.svg" alt="" />
          </Link>
        </div>
        <div className="button-marquee">
          <div className="button">
            <Link to={`/team/${slug}`} className="text">VIEW DETAIL</Link>
            <span className="img">
              <img src="assets/img/icon/flower.svg" alt="" />
            </span>
            <Link to={`/team/${slug}`} className="text">VIEW DETAIL</Link>
            <span className="img">
              <img src="assets/img/icon/flower.svg" alt="" />
            </span>
            <Link to={`/team/${slug}`} className="text">VIEW DETAIL</Link>
            <span className="img">
              <img src="assets/img/icon/flower.svg" alt="" />
            </span>
          </div>
        </div>
        <div>
          <h3 className="box-title">
            <Link to={`/team/${slug}`}>{name}</Link>
          </h3>
          <span className="team-desig">{role}</span>
        </div>
      </div>
    </div>
  )
}

export default TeamCard