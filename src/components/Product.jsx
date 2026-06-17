import { Link } from "react-router-dom";
import "./Product.css";

function Product({ id, name, description, img, saleprice, stock }) {
  const hasImage = !!img;
  return (
    <article className="product">
      <div className="product-image-wrap">
        {hasImage ? (
          <img className="img" src={img} alt={name} />
        ) : (
          <div className="img placeholder">No image</div>
        )}
      </div>
      <div className="product-content">
        <h2>{name}</h2>
        <p>{description}</p>
        {saleprice !== undefined && <p className="price">Sale Price: ${saleprice}</p>}
        {typeof stock !== 'undefined' && (
          <p className={`stock ${stock > 0 ? 'in' : 'out'}`}>{stock > 0 ? `In stock: ${stock}` : 'Out of stock'}</p>
        )}
        <Link className="buttoni" to={`/productdetails/${id}`}>View Details</Link>
      </div>
    </article>
  );
}

export default Product;