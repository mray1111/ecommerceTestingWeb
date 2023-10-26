import React from 'react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <img
        src="https://4.bp.blogspot.com/-duNxRbBtUPw/W4fy-UjXSqI/AAAAAAAABNA/6bBQ9cVTIcQldf9Q7Dl3Ja46BoU_kSrzgCLcBGAs/s1600/error-404-page-not-found%2Bcropped.jpg" // Replace with the URL of your meme image
        alt="Funny Meme"
        className="meme-image"
      />
    </div>
  );
};

export default NotFound;
