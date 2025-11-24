import { useContext } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import "./NotFound.css";
import { LanguageContext } from "../../context/LanguageContext";
import { languages } from "../../languages.js";

const NotFound = () => {
  const { language } = useContext(LanguageContext);
  const t = languages[language || "English"];

  return (
    <div className="notfound-container">
      <div className="notfound-card">
        <FaExclamationTriangle className="notfound-icon" />
        <h1>404</h1>
        <h2>{t.notFound.title}</h2>
        <p>{t.notFound.message}</p>
        <button onClick={() => window.history.back()} className="notfound-btn">
          {t.notFound.goBack}
        </button>
      </div>
    </div>
  );
};

export default NotFound;
