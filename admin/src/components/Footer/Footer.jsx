import { useContext } from "react";
import "./Footer.css";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { languages } from "../../languages.js";
import { LanguageContext } from "../../context/LanguageContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { language } = useContext(LanguageContext);
  const t = languages[language || "English"];

  return (
    <footer className="admin-footer">
      <div className="footer-left">
        <p>
          <AiOutlineCopyrightCircle /> {currentYear} {t.footer.brand} | {t.footer.adminPanel} — {t.footer.allRights} | 
          Developed By <a className="hover-name" href="https://mohamedazizomri.netlify.app" target="_blank" rel="noopener noreferrer">Mohamed Aziz Omri</a>
        </p>
      </div>
      <div className="footer-right">
        <ul>
          <li><NavLink to="/support">{t.footer.support}</NavLink></li>
          <li><NavLink to="/terms">{t.footer.terms}</NavLink></li>
          <li><NavLink to="/privacy">{t.footer.privacy}</NavLink></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
