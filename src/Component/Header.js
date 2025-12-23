import { useState, useEffect } from "react";
import logo from '../assets/neospace2.png';
import "../Styles/Header.css";
import { FiShoppingBag } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdLightMode, MdDarkMode } from "react-icons/md";

function Header() {
  // State to track theme
  const [isDark, setIsDark] = useState(false);

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
        <Link to="/yourcart" className='header_icon_link'>
          <FiShoppingBag />
        </Link>
        <div className='light-dark_mode' onClick={toggleTheme} style={{cursor: "pointer"}}>
          {isDark ? <MdLightMode size={24} /> : <MdDarkMode size={24} />}
        </div>
      </div>
    </header>
  );
}

export default Header;
