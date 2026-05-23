import { Link } from "react-router-dom";
import "./Product.css";

function Product({ id, name, description, img, saleprice }) {
  return (
    <article className="product">
      <div className="product-image-wrap">
        <img className="img" src={img} alt={name} />
      </div>
      <div className="product-content">
        <h2>{name}</h2>
        <p>{description}</p>
        {saleprice && <p className="price">Sale Price: ${saleprice}</p>}
        <Link className="buttoni" to={`/productdetails/${id}`}>View Details</Link>
      </div>
    </article>
  );
}

export default Product;