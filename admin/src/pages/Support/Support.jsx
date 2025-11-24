import { useContext } from 'react';
import './Support.css';
import { FaHeadset } from 'react-icons/fa';
import { languages } from '../../languages.js';
import { LanguageContext } from '../../context/LanguageContext';

const Support = () => {
  const { language } = useContext(LanguageContext);
  const t = languages[language || "English"];

  return (
    <div className="admin-page">
      <div className="admin-card">
        <h2>{t.support.title}</h2>
        <div className="admin-content">
          <div className="admin-content-icon">
            <FaHeadset />
          </div>
          <p>
            {t.support.contact} <a href={`mailto:${t.support.email}`}>{t.support.email}</a> {t.support.orCall} {t.support.phone}.
          </p>
          <p>{t.support.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Support;
