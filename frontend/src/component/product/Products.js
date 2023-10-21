import React, { Fragment, useEffect,useState } from 'react';
import "./Products.css";
import { useParams } from "react-router-dom"; // Use 'useParams' from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productActions";
import Loader from "../layout/loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';



const Products = ({match}) => {
  const dispatch = useDispatch();

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount
  } = useSelector((state) => state.products);

  const { keyword } = useParams(); // Use 'useParams' to access route parameters
 



  useEffect(() => {
    dispatch(getProduct(keyword));
  }, [dispatch, keyword]);

  

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className='productsHeading'>Products</h2>
          <div className="products">
          {products && products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
          
          </div>

        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
