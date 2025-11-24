import { useState, useEffect, useContext } from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { AiOutlinePlus, AiOutlineUnorderedList, AiOutlineHome } from "react-icons/ai";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import axios from "axios";
import { LanguageContext } from "../../context/LanguageContext";
import { languages } from "../../languages.js";

const Sidebar = ({ url }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [foodCount, setFoodCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  const { language } = useContext(LanguageContext);
  const t = languages[language || "English"].sidebar;

  useEffect(() => {
    // Fetch number of users
    const fetchUsersCount = async () => {
      try {
        const res = await axios.get(`${url}/api/user/list`);
        if (res.data.success) setUserCount(res.data.data.length);
      } catch (err) {
        console.error("Error fetching user count", err);
      }
    };

    // Fetch number of foods
    const fetchFoodCount = async () => {
      try {
        const res = await axios.get(`${url}/api/food/list`);
        if (res.data.success) setFoodCount(res.data.data.length);
      } catch (err) {
        console.error("Error fetching food count", err);
      }
    };

    // Fetch number of orders
    const fetchOrderCount = async () => {
      try {
        const res = await axios.get(`${url}/api/order/list`);
        if (res.data.success) setOrderCount(res.data.data.length);
      } catch (err) {
        console.error("Error fetching order count", err);
      }
    };

    fetchFoodCount();
    fetchOrderCount();
    fetchUsersCount();
  }, [url]);

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Collapse Button */}
      <div className="sidebar-header">
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <FiMenu size={20} /> : <FiX size={20} />}
        </button>
      </div>

      {/* Sidebar Options */}
      <div className="sidebar-options">
        <NavLink to="/dashboard" className="sidebar-option" title={t.dashboard}>
          <AiOutlineHome className="sidebar-icon" size={22} />
          <p>{t.dashboard}</p>
        </NavLink>

        <NavLink to="/users" className="sidebar-option" title={t.users}>
          <FaUsers className="sidebar-icon" size={22} />
          <p>{t.users}</p>
          <span className="badge">{userCount}</span>
        </NavLink>

        <NavLink to="/add" className="sidebar-option" title={t.newFood}>
          <AiOutlinePlus className="sidebar-icon" size={22} />
          <p>{t.newFood}</p>
        </NavLink>

        <NavLink to="/list" className="sidebar-option" title={t.foods}>
          <AiOutlineUnorderedList className="sidebar-icon" size={22} />
          <p>{t.foods}</p>
          <span className="badge">{foodCount}</span>
        </NavLink>

        <NavLink to="/orders" className="sidebar-option" title={t.orders}>
          <MdOutlineLocalGroceryStore className="sidebar-icon" size={22} />
          <p>{t.orders}</p>
          <span className="badge">{orderCount}</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
