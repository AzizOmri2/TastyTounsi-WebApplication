import { useState, useEffect, useRef, useContext } from "react";
import "./Navbar.css";
import { assets } from '../../assets/assets';
import { FaBell, FaMoon, FaSun, FaUserCircle, FaGlobe } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { DarkModeContext } from "../../context/DarkModeContext";
import { LanguageContext } from "../../context/LanguageContext";
import { languages } from "../../languages.js";

const Navbar = () => {
  const { darkMode, toggleDark } = useContext(DarkModeContext);
  const { language } = useContext(LanguageContext);
  const t = languages[language || "English"];

  const [showProfile, setShowProfile] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  const adminData = JSON.parse(localStorage.getItem("adminData"));

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    localStorage.setItem("language", "English");
    localStorage.removeItem("darkMode");
    window.location.href = "/";
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotif(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      {/* Logo */}
      <NavLink to="/">
        <img src={darkMode ? assets.logo_dark : assets.logo_light} alt="Logo" className="navbar-logo"/>
      </NavLink>

      {/* Right Section */}
      <div className="navbar-right">

        {/* Notification */}
        <div ref={notifRef} className="nav-icon" onClick={() => setShowNotif(!showNotif)} title={t.showNotifications}>
          <FaBell />
          <span className="notif-dot"></span>
        </div>

        {showNotif && (
          <div className="notif-popup">
            <p>{t.noNewNotifications}</p>
          </div>
        )}

        {/* Dark/Light Mode */}
        <div className="nav-icon" onClick={toggleDark} title={darkMode ? t.switchToLight : t.switchToDark}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </div>

        {/* Profile Dropdown */}
        <div ref={profileRef} className="profile-container">
          <FaUserCircle className="profile-icon" onClick={() => setShowProfile(!showProfile)}/>
          <div className={`profile-dropdown ${showProfile ? "show" : ""}`}>
            <p className="profile-name">👤 {adminData?.name}</p>
            <NavLink to="/settings">
              <p>{t.settings}</p>
            </NavLink>
            <p className="logout" onClick={handleLogout}>{t.logout}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
