import './App.css';
import React, { useEffect } from 'react';
import Header from "./component/layout/Header/Header.js"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebFont from 'webfontloader';
import Footer from "../src/component/layout/Footer/Footer.js"
import Home from "./component/Home/Home.js"

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
        </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
