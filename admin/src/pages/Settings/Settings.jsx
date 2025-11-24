import { useState, useEffect, useContext } from "react";
import "./Settings.css";
import { FaUser, FaLock, FaSave, FaMoon, FaSun, FaBell, FaGlobe, FaShieldAlt, FaCheckCircle, FaExclamationCircle, FaTimesCircle } from "react-icons/fa";
import { DarkModeContext } from "../../context/DarkModeContext";
import axios from "axios";
import { LanguageContext } from "../../context/LanguageContext";
import { languages } from "../../languages.js";

const Settings = ({url}) => {
  const { darkMode, toggleDark } = useContext(DarkModeContext);

  const [modal, setModal] = useState({ show: false, message: "" });
  const showModal = (message, type = "success") => setModal({ show: true, message, type });
  const hideModal = () => setModal({ show: false, message: "" });

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    passwordOld: "",
    passwordNew: "",
    passwordConfirm: "",
    language: "English",
    notifications: true,
    twoFA: false,
    lastLogin: "",
  });

  const { language, changeLanguage } = useContext(LanguageContext);
  const t = languages[language];

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("adminData")) || {};
    setProfile(prev => ({
      ...prev,
      name: savedProfile.name || "",
      email: savedProfile.email || "",
      lastLogin: new Date().toLocaleString()
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile({ ...profile, [name]: type === "checkbox" ? checked : value });

    // If the field is language, update the global context too
    if (name === "language") {
      changeLanguage(value);
    }
  };

  const handleSave = async () => {
    if (profile.passwordNew && profile.passwordNew !== profile.passwordConfirm) {
      showModal(t.passwordsMismatch, "warning");
      return;
    }

    const savedProfile = JSON.parse(localStorage.getItem("adminData")) || {};
    const token = localStorage.getItem("token");

    const body = {
      name: profile.name,
      email: profile.email,
      password: profile.passwordNew || undefined,
      passwordOld: profile.passwordOld || undefined
    };

    try {
      const response = await axios.put(
        `${url}/api/admin/update/${savedProfile.id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data.success) {
        localStorage.setItem(
          "adminData",
          JSON.stringify({
            ...savedProfile,
            name: response.data.user.name,
            email: response.data.user.email
          })
        );

        showModal(t.profileUpdated, "success");

        setProfile(prev => ({
          ...prev,
          passwordOld: "",
          passwordNew: "",
          passwordConfirm: ""
        }));
      } else {
        showModal(response.data.message || t.errorUpdate, "error");
      }
    } catch (error) {
      console.error(error);
      showModal(t.oldPasswordIncorrect, "warning");
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-card">

        {/* Profile Section */}
        <h2 className="settings-title"><FaUser /> {t.profile}</h2>
        <div className="settings-item">
          <label>{t.name}</label>
          <input type="text" name="name" value={profile.name} onChange={handleChange} placeholder={t.enterName}/>
        </div>
        <div className="settings-item">
          <label>{t.email}</label>
          <input type="email" name="email" value={profile.email} onChange={handleChange} placeholder={t.enterEmail}/>
        </div>

        {/* Password Section */}
        <h2 className="settings-title"><FaLock /> {t.changePassword}</h2>
        <div className="settings-item">
          <label>{t.oldPassword}</label>
          <input type="password" name="passwordOld" value={profile.passwordOld} onChange={handleChange} placeholder={t.enterOldPassword}/>
        </div>
        <div className="settings-item">
          <label>{t.newPassword}</label>
          <input type="password" name="passwordNew" value={profile.passwordNew} onChange={handleChange} placeholder={t.enterNewPassword}/>
        </div>
        <div className="settings-item">
          <label>{t.confirmPassword}</label>
          <input type="password" name="passwordConfirm" value={profile.passwordConfirm} onChange={handleChange} placeholder={t.confirmNewPassword}/>
        </div>

        {/* Notifications & 2FA */}
        <h2 className="settings-title"><FaBell /> {t.enableNotifications}</h2>
        <div className="settings-item toggle-container">
          <span>{t.enableNotifications}</span>
          <input type="checkbox" name="notifications" checked={profile.notifications} onChange={handleChange}/>
        </div>
        <div className="settings-item toggle-container">
          <span>{t.twoFA}</span>
          <input type="checkbox" name="twoFA" checked={profile.twoFA} onChange={handleChange}/>
        </div>

        {/* Language & Region */}
        <h2 className="settings-title"><FaGlobe /> {t.language}</h2>
        <div className="settings-item">
          <label>{t.language}</label>
          <select name="language" value={language} onChange={handleChange}>
            <option value="English">English</option>
            <option value="French">French</option>
            <option value="Arabic">Arabic</option>
          </select>
        </div>

        {/* Dark Mode */}
        <h2 className="settings-title"><FaMoon /> {t.darkMode}</h2>
        <div className="settings-item toggle-container">
          <span>{t.darkMode}</span>
          <button className="toggle-btn" onClick={toggleDark}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* Activity / Last Login */}
        <h2 className="settings-title"><FaShieldAlt /> {t.activity}</h2>
        <div className="settings-item">
          <label>{t.lastLogin}</label>
          <input type="text" value={profile.lastLogin} readOnly />
        </div>

        {/* Save Changes */}
        <button className="save-btn" onClick={handleSave}><FaSave /> {t.saveChanges}</button>

      </div>

      {/* Modal */}
      {modal.show && (
        <div className="modal-overlay">
          <div className={`modal-content ${modal.type}`}>
            <div className="modal-icon">
              {modal.type === "success" && <FaCheckCircle />}
              {modal.type === "error" && <FaTimesCircle />}
              {modal.type === "warning" && <FaExclamationCircle />}
            </div>
            <p>{modal.message}</p>
            <button onClick={hideModal}>OK</button>
          </div>
        </div>
      )}
    </div>
    
  );
};

export default Settings;
