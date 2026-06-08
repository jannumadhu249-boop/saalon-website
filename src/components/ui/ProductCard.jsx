import { Link } from 'react-router-dom'

const ProductCard = ({ name, price, salePrice, image, rating = 5, slug, category, onAddToCart }) => {
  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i key={i} className={`fas fa-star ${i <= rating ? 'text-theme' : ''}`}></i>
      )
    }
    return stars
  }

  const hasSale = salePrice && salePrice < price

  return (
    <div className="th-product product-grid style2">
      <div className="product-thumb">
        <div className="product-img">
          <Link to={`/shop/${slug}`}>
            <img src={image} alt={name} />
          </Link>
        </div>
        <div className="actions">
          <a href="#QuickView" className="icon-btn popup-content">
            <i className="fas fa-eye"></i>
          </a>
          <button className="icon-btn" onClick={() => onAddToCart && onAddToCart(name)}>
            <i className="fas fa-cart-plus"></i>
          </button>
          <Link to="/wishlist" className="icon-btn">
            <i className="fas fa-heart"></i>
          </Link>
        </div>
        {hasSale && (
          <div className="product-tag">
            <span className="category">SALE</span>
          </div>
        )}
      </div>
      <div className="product-content">
        <h3 className="box-title">
          <Link to={`/shop/${slug}`}>{name}</Link>
        </h3>
        <span className="price">
          ₹{price}
          {hasSale && <del>₹{salePrice}</del>}
        </span>
      </div>
    </div>
  )
}

export default ProductCard