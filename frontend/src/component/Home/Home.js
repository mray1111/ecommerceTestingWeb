import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg"; 
import "./Home.css";

const Home = () => {
  return (
    <Fragment>
        <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
                <button>
                Scroll <CgMouse />
                </button>
            </a>
        </div>
    </Fragment>
  )
}

export default Home;
