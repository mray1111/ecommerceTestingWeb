import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";
import { SocialIcon } from 'react-social-icons'

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p> Android and iOS </p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2023 &copy; Purushottam and Manish</p>
      </div>

      <div className="rightFooter">
        <h4>Connect with us </h4>
        <a href="https://www.linkedin.com/in/manish-ray-55899b252/" target="_blank">LinkedIn</a>
        <a href="http://instagram.com/rathaur_purushottam" target="_blank">Instagram</a>
        <a href="https://www.facebook.com/purushottampriyam.rathaur" target="_blank">Facebook</a>

      </div>
    </footer>
  );
};

export default Footer;
