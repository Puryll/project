import React from "react";
import { Link } from "react-router-dom";
import '../components/Navbar.css';
import logo from '../assets/logo.png';


function Navbar() {
  return (
    <div className="navbar-container">
      <nav className="navbar">
      <ul className="nav-links">
        <li className="li1"><Link to="/">Home</Link></li>
        <li className="li2"><Link to="/Product">Product</Link></li>
        <li className="li3"><Link to="/About">About</Link></li>
        <li className="li4"><Link to="/Contact">Contact</Link></li>
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