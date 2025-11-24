import React, { useContext } from 'react';
import './Privacy.css';
import { FaUserShield } from 'react-icons/fa';
import { languages } from "../../languages.js";
import { LanguageContext } from '../../context/LanguageContext';

const Privacy = () => {
  const { language } = useContext(LanguageContext); // get current language from context
  const t = languages[language || "English"];       // fallback to English

  return (
    <div className="admin-page">
      <div className="admin-card">
        <h2>{t.privacy.title}</h2>
        <div className="admin-content">
          <div className="admin-content-icon">
            <FaUserShield />
          </div>
          <p>{t.privacy.intro}</p>
          <ul>
            {t.privacy.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
          <p>{t.privacy.footer}</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
