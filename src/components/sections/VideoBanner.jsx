import { Link } from 'react-router-dom'

const VideoBanner = () => {
  return (
    <div className="video-area">
      <div className="video-thumb-img">
        <img className="video-trigger-thumb" src="assets/img/normal/video-1.png" alt="video" />
        <Link 
          to="https://www.youtube.com/watch?v=Q6uuoqlgGBI"
          className="video-play-btn popup-video"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-sharp fa-solid fa-play"></i>
        </Link>
      </div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="title-area video-title-area">
              <span className="shape mb-40 d-block">
                <img src="assets/img/icon/shape-1.svg" alt="" />
              </span>
              <h2 className="sec-title text-white">
                We Don't Just Facial, Create <span className="text-theme">Impression</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoBanner