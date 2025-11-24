import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { AiOutlineShoppingCart, AiOutlineDollarCircle, AiOutlineUser, AiOutlineClockCircle } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import CountUp from "react-countup";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { LanguageContext } from "../../context/LanguageContext";
import { languages } from "../../languages.js";
import { useContext } from "react";
import { FaBoxOpen } from "react-icons/fa";


const Dashboard = ({ url }) => {
  const { language } = useContext(LanguageContext);
  const t = languages[language || "English"].dashboard;

  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    revenue: 0,
    totalUsers: 0,
    pendingOrders: 0,
    recentOrders: [],
  });

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${url}/api/dashboard/data`);
      if (response.data.success) {
        setDashboardData({
          totalOrders: response.data.data.totalOrders,
          revenue: response.data.data.revenue,
          totalUsers: response.data.data.totalUsers,
          pendingOrders: response.data.data.pendingOrders,
          recentOrders: response.data.data.recentOrders,
        });
      } else {
        toast.error(t.errorFetching || "Error fetching data");
      }
    } catch (err) {
      toast.error(t.errorFetching || "Error fetching data");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [url]);

  const cards = [
    {
      title: t.totalOrders,
      value: dashboardData.totalOrders,
      icon: <AiOutlineShoppingCart size={28} />,
      gradient: "card-gradient-1",
    },
    {
      title: t.revenue,
      value: dashboardData.revenue,
      icon: <AiOutlineDollarCircle size={28} />,
      gradient: "card-gradient-2",
      prefix: t.currency + " ",
    },
    {
      title: t.users,
      value: dashboardData.totalUsers,
      icon: <AiOutlineUser size={28} />,
      gradient: "card-gradient-3",
    },
    {
      title: t.pendingOrders,
      value: dashboardData.pendingOrders,
      icon: <AiOutlineClockCircle size={28} />,
      gradient: "card-gradient-4",
    },
  ];

  const translateStatus = (status) => {
    const lower = status.toLowerCase();

    if (lower === "delivered") return t.statusDelivered;
    if (lower === "food processing") return t.statusProcessing;
    if (lower === "out for delivery") return t.statusOut;

    return status;
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "status-delivered";
      case "food processing":
        return "status-processing";
      case "out for delivery":
        return "status-out";
      default:
        return "status-pending";
    }
  };

  const pieData = [
    {
      name: t.statusDelivered,
      value: dashboardData.recentOrders.filter(
        (order) => order.status.toLowerCase() === "delivered"
      ).length,
    },
    {
      name: t.statusProcessing,
      value: dashboardData.recentOrders.filter(
        (order) => order.status.toLowerCase() === "food processing"
      ).length,
    },
    {
      name: t.statusOut,
      value: dashboardData.recentOrders.filter(
        (order) => order.status.toLowerCase() === "out for delivery"
      ).length,
    },
  ];

  const COLORS = ["#4CAF50", "#FFA500", "#2196F3", "#FF3B3B"];

  return (
    <div className="dashboard-page">
      <h2>{t.title}</h2>

      {/* Overview Cards */}
      <div className="dashboard-cards">
        {cards.map((card, index) => (
          <div key={index} className={`dashboard-card ${card.gradient}`}>
            <div className="card-icon">{card.icon}</div>
            <div className="card-info">
              <p className="card-title">{card.title}</p>
              <h3 className="card-value">
                <CountUp end={card.value} duration={1.5} separator="," prefix={card.prefix || ""}/>
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-wrapper">
          <h3>{t.recentOrdersRevenue}</h3>
          {dashboardData.recentOrders.length === 0 ? (
            <div className="empty-list">
              <FaBoxOpen size={50} />
              <p>{t.noOrderData}</p>
              <small>{t.addOrders || ""}</small>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData.recentOrders}>
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="user" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={3} activeDot={{ r: 8 }}/>
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="chart-wrapper">
          <h3>{t.orderStatusDistribution}</h3>
          {dashboardData.recentOrders.length === 0 ? (
            <div className="empty-list">
              <FaBoxOpen size={50} />
              <p>{t.noOrderData}</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="recent-activity">
        <h3>{t.recentOrders}</h3>
        {dashboardData.recentOrders.length === 0 ? (
          <div className="empty-list">
            <FaBoxOpen size={50} />
            <p>{t.noRecentOrders}</p>
            <small>{t.addOrders || ""}</small>
          </div>
        ) : (
          <ul className="recent-orders-list">
            {dashboardData.recentOrders.map((order, index) => (
              <li key={order.id} className="recent-order-item">
                <span>{t.order} #{index + 1}</span>
                <span className={`status-badge ${getStatusClass(order.status)}`}>
                  {translateStatus(order.status)}
                </span>
                <span>{order.user}</span>
                <span>
                  {order.amount} <strong>{t.currency}</strong>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;