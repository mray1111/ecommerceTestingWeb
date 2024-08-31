import React, { useState } from 'react';
import './Navbar.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const showSidebar = () => {
    setSidebarVisible(true);
  };

  const hideSidebar = () => {
    setSidebarVisible(false);
  };

  return (
    <nav>
      <ul className="sidebar" style={{ display: isSidebarVisible ? 'flex' : 'none' }}>
        <li onClick={hideSidebar}>
          <Link to="#">
            <svg xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26">
              <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
            </svg>
          </Link>
        </li>
        <li><Link  to="/">Home</Link></li>
        <li><Link   to="/products">Products</Link></li>
        <li><Link  to="/login">Login</Link></li>
        <li><Link  to="/search">Search</Link></li>
        <li><Link  to="/cart">My Cart</Link></li>
      </ul>
      <ul>
        <li><Link className='nav-menu'  to="/"></Link></li>
        <li><Link className='nav-menu'  to="/">Home</Link></li>
        <li><Link className='nav-menu'  to="/products">Products</Link></li>
        <li><Link className='nav-menu'  to="/login">Login</Link></li>
        <li><Link className='nav-menu'  to="/search">Search</Link></li>
        <li><Link className='nav-menu'  to="/cart">My Cart</Link></li>
        <li className="menu-button" onClick={showSidebar}>
          <Link to="#">
            <svg xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26">
              <path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" />
            </svg>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
