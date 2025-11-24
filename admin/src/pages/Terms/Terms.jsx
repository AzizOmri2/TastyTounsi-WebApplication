import { useContext } from 'react';
import './Terms.css';
import { FaFileContract } from 'react-icons/fa';
import { languages } from "../../languages.js";
import { LanguageContext } from '../../context/LanguageContext';

const Terms = () => {
  const { language } = useContext(LanguageContext); // get current language from context
  const t = languages[language || "English"];

  return (
    <div className="admin-page">
      <div className="admin-card">
        <h2>{t.terms.title}</h2>
        <div className="admin-content">
          <div className="admin-content-icon">
            <FaFileContract />
          </div>
          <p>{t.terms.intro}</p>
          <ul>
            {t.terms.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
          <p>{t.terms.footer}</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
