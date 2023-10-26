import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  // Check if product and product.images exist before accessing the URL
  const imageUrl = product && product.images && product.images[0] && product.images[0].url;

  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "yellow",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product && product.ratings, // Check if product.ratings is defined
    size: "small",
    precision: 0.5,
  };

  return (
    <Link className='productCard' to={product ? `/product/${product._id}` : '#'}>
      {/* Use imageUrl if it's defined, or a placeholder image */}
      <img src={imageUrl || 'placeholder-image-url'} alt={product ? product.name : 'Product'} />
      <p>{product ? product.name : 'Product'}</p>
      <span>{`$ ${product ? product.price : 0}`}</span>

      <div>
        <ReactStars {...options} />
      </div>
      <div>
        <span>({product ? product.numOfReviews : 0} Reviews)</span>
      </div>
    </Link>
  );
}

export default ProductCard;
