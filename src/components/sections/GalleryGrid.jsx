import { useState } from 'react'
import { Link } from 'react-router-dom'
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const galleryImages = [
  { id: 1, categories: 'cat2 cat4', src: 'assets/img/gallery/gallery_1_1.jpg' },
  { id: 2, categories: 'cat3 cat2', src: 'assets/img/gallery/gallery_1_2.jpg' },
  { id: 3, categories: 'cat3 cat4', src: 'assets/img/gallery/gallery_1_3.jpg' },
  { id: 4, categories: 'cat1 cat4', src: 'assets/img/gallery/gallery_1_4.jpg' },
  { id: 5, categories: 'cat4 cat2 cat1', src: 'assets/img/gallery/gallery_1_5.jpg' },
  { id: 6, categories: 'cat4 cat3 cat1', src: 'assets/img/gallery/gallery_1_6.jpg' },
  { id: 7, categories: 'cat3 cat4', src: 'assets/img/gallery/gallery_1_7.jpg' },
  { id: 8, categories: 'cat1 cat4', src: 'assets/img/gallery/gallery_1_8.jpg' },
  { id: 9, categories: 'cat4 cat2 cat1', src: 'assets/img/gallery/gallery_1_9.jpg' }
]

const GalleryGrid = () => {
  const [activeFilter, setActiveFilter] = useState('*')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const filteredImages = activeFilter === '*' 
    ? galleryImages 
    : galleryImages.filter(img => img.categories.includes(activeFilter.replace('.', '')))

  return (
    <div className="position-reletive overflow-hidden space">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8">
            <div className="title-area text-center">
              <h2 className="sec-title text-white">
                Explore Scuts Gallery
              </h2>
              <span className="title-img">
                <img alt="shape" src="assets/img/theme-img/title_shape.svg" />
              </span>
            </div>
            <div className="filter-menu indicator-active mb-60 filter-menu-active">
              <button 
                className={`tab-btn ${activeFilter === '*' ? 'active' : ''}`} 
                data-filter="*" 
                type="button"
                onClick={() => setActiveFilter('*')}
              >
                View All<span></span>
              </button>
              <button 
                className={`tab-btn ${activeFilter === '.cat1' ? 'active' : ''}`} 
                data-filter=".cat1" 
                type="button"
                onClick={() => setActiveFilter('.cat1')}
              >
                NAIL ART<span></span>
              </button>
              <button 
                className={`tab-btn ${activeFilter === '.cat2' ? 'active' : ''}`} 
                data-filter=".cat2" 
                type="button"
                onClick={() => setActiveFilter('.cat2')}
              >
                BROW & FACE THREADING<span></span>
              </button>
              <button 
                className={`tab-btn ${activeFilter === '.cat3' ? 'active' : ''}`} 
                data-filter=".cat3" 
                type="button"
                onClick={() => setActiveFilter('.cat3')}
              >
                PEDICURE<span></span>
              </button>
              <button 
                className={`tab-btn ${activeFilter === '.cat4' ? 'active' : ''}`} 
                data-filter=".cat4" 
                type="button"
                onClick={() => setActiveFilter('.cat4')}
              >
                MANICURE
              </button>
            </div>
          </div>
        </div>
        <div className="row gy-4 gallery-row">
          {filteredImages.map((img) => (
            <div key={img.id} className={`col-md-6 col-xl-4 col-xxl-auto filter-item ${img.categories}`}>
              <div className="gallery-card">
                <div className="box-img">
                  <img 
                    alt="" 
                    className="gallery_img" 
                    src={img.src} 
                  />
                  <a 
                    className="icon-btn th-popup-image" 
                    href="#!"
                    onClick={(e) => {
                      e.preventDefault();
                      setLightboxIndex(filteredImages.findIndex(image => image.id === img.id));
                      setLightboxOpen(true);
                    }}
                  >
                    <i className="fas fa-eye"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={filteredImages.map(img => ({ src: img.src }))}
        styles={{ container: { backgroundColor: "rgba(55, 55, 55, 0.85)" } }}
        controller={{ closeOnBackdropClick: true }}
      />
    </div>
  )
}

export default GalleryGrid