import React, { Fragment, useEffect } from "react";
import {CgMouse } from "react-icons/cg"; 
import "./Home.css";
import Product from "./ProductCard";
import MetaData from "../layout/Metadata.js";
import {clearErrors, getProduct} from "../../actions/productActions"
import {useSelector, useDispatch} from "react-redux";
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";

import {VscAccount}  from "react-icons/vsc"
import {BsFillCartPlusFill} from  "react-icons/bs"
import {ImSearch} from "react-icons/im"

const product = {
  name: "Blue T-shirt",
  images: [{ url: "http://i.ibb.co/DRST11n/1.webp" }],
  price: 3000,
  id: "abc123",
};


// ... (other imports and components)

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="DBMS Manish and Purushottam" />
          <div className="banner">
            <p>Welcome to  IKOM-Ecommerce</p>
            <div className="flex-container">
        <a href="http://localhost:3000/account">
          <VscAccount className="Larger_acc" />
        </a>
        <a href="http://localhost:3000/cart">
          <BsFillCartPlusFill className="Larger" />
        </a>
        <a href="http://localhost:3000/Search">
          <ImSearch className="Larger" />
        </a>
</div>

          <h1>Unbox Joy, Discover Style</h1>
            {/* <h2>Namaste BHARAT</h2> */}

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products </h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => <Product product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
