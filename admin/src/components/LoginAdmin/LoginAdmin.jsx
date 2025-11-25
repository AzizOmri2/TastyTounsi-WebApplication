import { useState } from 'react';
import './LoginAdmin.css';
import axios from "axios";
import { assets } from '../../assets/assets';
import { FaEnvelope, FaLock } from "react-icons/fa";

const LoginAdmin = ({ url }) => {

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(url+"/api/admin/login", data);

      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.token);
        localStorage.setItem("adminData", JSON.stringify(res.data.user));

        window.location.href = "/dashboard";
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="admin-login-wrapper">
        <div className="admin-login-card">

            <div className="admin-login-header">
                <img src={assets.logo_light} alt="Logo" className="admin-login-logo" />
                <h2>Administrator Access</h2>
                <p>Please sign in to continue</p>
            </div>

            {error && <p className="admin-login-error">{error}</p>}

            <form onSubmit={onLogin} className="admin-login-form">

                <div className="admin-input-group">
                    <label>Email</label>
                    <div className="input-wrapper">
                        <FaEnvelope className="input-icon" />
                        <input type="email" name="email" placeholder="example@admin.com" value={data.email} onChange={onChangeHandler} required/>
                    </div>
                </div>

                <div className="admin-input-group">
                    <label>Password</label>
                    <div className="input-wrapper">
                        <FaLock className="input-icon" />
                        <input type="password" name="password" placeholder="••••••••" value={data.password} onChange={onChangeHandler} required/>
                    </div>
                </div>

                <button type="submit" className="admin-login-btn">Login</button>
            </form>

            <p className="admin-login-footer">
                Developed By <a className="hover-name" href="https://mohamedazizomri.netlify.app" target="_blank" rel="noopener noreferrer">Mohamed Aziz Omri</a> <br></br>© {new Date().getFullYear()} Tasty Tounsi | Admin Panel — All rights reserved
            </p>
        </div>
    </div>
  );
};

export default LoginAdmin;