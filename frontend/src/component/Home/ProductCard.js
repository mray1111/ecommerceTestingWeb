import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link } from "react-router-dom";



const ProductCard = ({ product }) => {

  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "yellow",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    size:"small",
    precision:0.5,
   
  };

  return (
    <Link className='productCard' to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <span>{`$ ${product.price}`}</span>

      <div>
      <ReactStars {...options} />
    </div>
    <div>
      <span>({product.numOfReviews} Reviews)</span>
    </div>
          
    </Link>
  );
}

export default ProductCard;