import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { DarkModeProvider } from './context/DarkModeContext.jsx'
import { LanguageProvider } from "./context/LanguageContext";


createRoot(document.getElementById('root')).render(
  <DarkModeProvider>
    <LanguageProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LanguageProvider>
  </DarkModeProvider>,
)
