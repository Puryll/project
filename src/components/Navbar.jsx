import React from "react";
import { Link } from "react-router-dom";
import '../components/Navbar.css';


function Navbar() {
  return (
    <nav className="navbar">

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Product">Product</Link></li>
        <li><Link to="/About">About</Link></li>
        <li><Link to="/Contact">Contact</Link></li>
      </ul>

      {/*<Link to="/LoginPage"><button className="login-button">Login</button></Link>*/}
        
    </nav>
  );
}

export default Navbar;