import React, { Fragment, useEffect } from "react";
import { CgDatabase, CgMouse } from "react-icons/cg"; 
import "./Home.css";
import Product from "./Product.js";
import MetaData from "../layout/Metadata.js";
import {getProduct} from "../../actions/productActions"
import {useSelector, useDispatch} from "react-redux"

const product = {
  name: "Blue T-shirt",
  images: [{ url: "http://i.ibb.co/DRST11n/1.webp" }],
  price: 3000,
  id: "abc123",
};




const Home = () => {

  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getProduct())
  },[dispatch])

  const { loading, error, products } = useSelector((state) => state.products);
  return (
    <Fragment>
      <MetaData title="DBMS Manish and Porustotom"/>
        <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
                <button>
                Scroll <CgMouse />
                </button>
            </a>
        </div>

    <h2 className="homeHeading">Featured Products </h2>
      <div className="container" id="container">
            {products &&
              products.map((product) => (
                <Product product={product} />
              ))}
          </div>
        
    </Fragment>
  )
}

export default Home;
