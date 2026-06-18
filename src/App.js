import './App.css';
import './Navbar.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import ViewProduct from './pages/ViewProduct';
import Login from './pages/Login.jsx';
import Secret from './pages/Secret';
import Cart from './pages/Cart.jsx'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/product" element={<Product />} />
      <Route path="/productdetails/:id" element={<ViewProduct />} />
      <Route path="/login" element={<Login />} />
      <Route path="/secret" element={<Secret />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
    </>
  );
};

export default App;
