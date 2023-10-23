import './App.css';
import React, { useEffect, useState } from 'react';
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
import Profile from "./component/User/Profile.js"
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from "./component/User/UpdateProfile"
import UpdatePassword from "./component/User/UpdatePassword"
import ForgotPassword from "./component/User/ForgotPassword.js"
import ResetPassword from "./component/User/ResetPassword.js"
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping"
import ConfirmOrder from './component/Cart/ConfirmOrder';
import Payment from "./component/Cart/Payment"
import axios from "axios";
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import OrderSuccess from "./component/Cart/OrderSuccess"

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState(''); // Corrected the declaration

  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/stripeapikey');
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();
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
          <Route path="/account" element ={<Profile/>}></Route>
          <Route path="/me/update" element ={<UpdateProfile/>}></Route>
          <Route path="/password/update" element ={<UpdatePassword/>}></Route>
          <Route path="/password/forgot" element ={<ForgotPassword/>}></Route>
          <Route path="/password/reset/:token" element ={<ResetPassword/>}></Route>
          <Route path="/cart" element ={<Cart/>}></Route>
          <Route path="/shipping" element ={<Shipping/>}></Route>
          <Route path="/order/confirm" element ={<ConfirmOrder/>}></Route>
          <Route path="/process/payment" element={
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Payment />
            </Elements>
          }
        />
          
          <Route path="success" element ={<OrderSuccess/>}></Route>
          
        </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
