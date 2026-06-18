import { Link } from "react-router-dom";
import "./Product.css";
import cart from "../cart";

function Product({ id, name, description, img, saleprice, stock }) {
const hasImage = img && img.length > 0;
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
        <button
          className="buttoni"
          onClick={() =>
            cart.addToCart({
              id,
              name,
              price: saleprice,
              img,
            })
          }
        >
          Add to Cart
        </button>
        <Link className="buttoni" to={`/productdetails/${id}`}>View Details</Link>
      </div>
    </article>
  );
}

export default Product;