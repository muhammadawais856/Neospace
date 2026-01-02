import { useState, useEffect } from "react";
import logo from '../assets/neospace2.png';
import "../Styles/Header.css";
import { FiShoppingBag } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { getCartItemsCount } from "../utils/cartUtils";

function Header() {
  // State to track theme
  const [isDark, setIsDark] = useState(false);
  // State to track cart items count
  const [cartCount, setCartCount] = useState(0);

  // On load, get saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      setIsDark(false);
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  // Function to update cart count
  const updateCartCount = () => {
    const count = getCartItemsCount();
    setCartCount(count);
  };

  // Get initial cart count and listen for cart changes
  useEffect(() => {
    // Get initial count
    updateCartCount();

    // Listen for storage changes (when cart is updated in other tabs/components)
    const handleStorageChange = (e) => {
      if (e.key === 'neospace_cart' || !e.key) {
        updateCartCount();
      }
    };

    // Listen for custom cart update events
    const handleCartUpdate = () => {
      updateCartCount();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleCartUpdate);

    // Check cart periodically for same-tab updates
    const interval = setInterval(updateCartCount, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
      clearInterval(interval);
    };
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <header className='header'>
      <div className='headerimg'>
        <img src={logo} className='logo' alt="NeoSpace logo"/>
      </div>
      <div className='header_icons'>
        <Link to="/" className='header_icon_link'>
          <FaHome />
        </Link>
        <Link to="/profile" className='header_icon_link'>
          <BsPersonCircle />
        </Link>
        <Link to="/yourcart" className='header_icon_link cart_icon_wrapper'>
          <FiShoppingBag />
          {cartCount > 0 && (
            <span className="cart_badge">{cartCount > 99 ? '99+' : cartCount}</span>
          )}
        </Link>
        <div className='light-dark_mode' onClick={toggleTheme} style={{cursor: "pointer"}}>
          {isDark ? <MdLightMode /> : <MdDarkMode />}
        </div>
      </div>
    </header>
  );
}

export default Header;
