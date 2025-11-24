import { useState, useEffect, useContext } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { FaBoxOpen } from "react-icons/fa";
import { LanguageContext } from "../../context/LanguageContext";
import { languages } from "../../languages.js";

const Orders = ({ url }) => {
  const { language } = useContext(LanguageContext);
  const t = languages[language || "English"].orders;

  const [orders, setOrders] = useState([]);

  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error(t.errorFetchingOrders);
      }
    } catch (err) {
      toast.error(t.errorFetchingOrders);
      console.error(err);
    }
  };

  // Update order status
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (err) {
      toast.error(t.errorUpdatingStatus);
      console.error(err);
    }
  };

  // Status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Food Processing":
        return "#FFA500"; // orange
      case "Out For Delivery":
        return "#3498DB"; // blue
      case "Delivered":
        return "#2ECC71"; // green
      default:
        return "#ccc";
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [url]);

  return (
    <div className="orders-page">
      <div className="orders-card">
        <h2>{t.ordersOverview}</h2>

        {Array.isArray(orders) && orders.length > 0 ? (
          <div className="orders-grid">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                {/* Header */}
                <div className="order-card-header">
                  <div className="order-card-header-icon">
                    <FaBoxOpen size={40} />
                  </div>
                  <div className="order-card-header-info">
                    <h3>
                      {order.address.firstName} {order.address.lastName}
                    </h3>
                    <p className="order-date">
                      {new Date(order.date).toLocaleString()}
                    </p>
                  </div>
                  <span className="order-status-badge" style={{ backgroundColor: getStatusColor(order.status) }}>
                    {t.status[order.status]}
                  </span>
                </div>

                {/* Body */}
                <div className="order-card-body">
                  <div className="order-items-list">
                    <strong>{t.items}:</strong>
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={item._id || index}>
                          {item.name} x{item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="order-contact">
                    <p>
                      <strong>{t.address}:</strong> {order.address.street},{" "}
                      {order.address.city}, {order.address.state},{" "}
                      {order.address.country}, {order.address.zipcode}
                    </p>
                    <p>
                      <strong>{t.phone}:</strong> {order.address.phone}
                    </p>
                    <p>
                      <strong>{t.email}:</strong> {order.address.email}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="order-card-footer">
                  <div className="order-summary">
                    <span>
                      {t.totalItems}: <strong>{order.items.length}</strong>
                    </span>
                    <span>
                      {t.amount}: <strong>{order.amount} TND</strong>
                    </span>
                  </div>
                  <select value={order.status} onChange={(e) => statusHandler(e, order._id)}>
                    <option value="Food Processing">{t.status["Food Processing"]}</option>
                    <option value="Out For Delivery">{t.status["Out For Delivery"]}</option>
                    <option value="Delivered">{t.status["Delivered"]}</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-orders">
            <FaBoxOpen size={60} />
            <p>{t.noOrders}</p>
            <small>{t.ordersPlaceholder}</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
