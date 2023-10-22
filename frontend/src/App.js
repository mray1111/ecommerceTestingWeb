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
import LoginSignUp from "./component/User/LoginSignUp";
import UserOptions from "./component/layout/Header/UserOptions";
import store from "./store";
import { loadUser } from './actions/userAction';
import { useSelector } from 'react-redux';



function App() {

  const {isAuthenticated, user}=useSelector((state)=>state.user);
  
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser())
  }, []);



  return (
      
     
  <BrowserRouter>
      <Header/>
         {isAuthenticated && <UserOptions user ={user}/>}
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails/>} />
          <Route path="/products" element={<Products/>}/>
          <Route path="/products/:keyword" element={<Products/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/login" element ={<LoginSignUp/>}></Route>
          <Route path="/me" element={<UserOptions user={user} />} />
       
        </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
