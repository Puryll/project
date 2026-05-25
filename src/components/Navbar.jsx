import React from "react";
import { Link } from "react-router-dom";
import '../components/Navbar.css';
import logo from '../assets/logo.png';


function Navbar() {
  return (
    <div className="navbar-container">
      <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Product">Product</Link></li>
        <li><Link to="/About">About</Link></li>
        <li><Link to="/Contact">Contact</Link></li>
      </ul>

        {/*<Link to="/LoginPage"><button className="login-button">Login</button></Link>*/}
          
      </nav>
      <div className="logo-container">
      <h1>Hekuraria Driloni AD </h1>
      <img className="logo" src={logo} alt="Logo" />
      </div>
    </div>
  );
}

export default Navbar;