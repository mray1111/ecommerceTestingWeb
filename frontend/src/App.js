import './App.css';
import React, { useEffect } from 'react';
import Header from "./component/layout/Header/Header.js"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebFont from 'webfontloader';
import Footer from "../src/component/layout/Footer/Footer.js"
import Home from "./component/Home/Home.js"
import ProductDetails from "./component/product/productDetails.js"
import Products from "./component/product/Products"
import Search from "./component/product/Search.js"
import LoginSignUp from "./component/User/LoginSignUp"
function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
      
     
  <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/product/:id" element={<ProductDetails/>} />

          <Route path="/products" element={<Products/>}/>
          <Route path="/products/:keyword" element={<Products/>}/>
          <Route path="/search" element={<Search/>}/>

          <Route path="/login" element ={<LoginSignUp/>}></Route>
        </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
