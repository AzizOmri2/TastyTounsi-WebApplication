import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import Add from './pages/Add/Add'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard/Dashboard'
import Footer from './components/Footer/Footer'
import Users from './pages/Users/Users'
import Support from './pages/Support/Support'
import Terms from './pages/Terms/Terms'
import Privacy from './pages/Privacy/Privacy'
import LoginAdmin from './components/LoginAdmin/LoginAdmin'
import ProtectedAdminRoute from './components/ProtectedAdminRoute'
import HandleUnknownRoute from './components/HandleUnknownRoute'
import NotFound from './components/NotFound/NotFound'
import PublicRoute from './components/PublicRoute'
import Settings from './pages/Settings/Settings'


if (import.meta.env.MODE === "production") {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}

const App = () => {

  const url = import.meta.env.VITE_BACKEND_URL;
  const location = useLocation();

  // Hide sidebar + navbar on login page
  const hideLayout = location.pathname === "/admin/login" || location.pathname === "/";

  return (
    <div>
      <ToastContainer/>
      {/* Show navbar only when logged in */}
      {!hideLayout && <Navbar />}
      {!hideLayout && <hr />}

      <div className="app-content">
        {/* Show sidebar only when logged in */}
        {!hideLayout && <Sidebar url={url} />}
        
        <Routes>
          <Route path="/" element={
            <PublicRoute>
              <LoginAdmin url={url}/>
            </PublicRoute>
          }/>

          <Route path="/dashboard" element={
            <ProtectedAdminRoute>
              <Dashboard url={url}/>
            </ProtectedAdminRoute>
          }/>

          <Route path="/support" element={
            <ProtectedAdminRoute>
              <Support url={url}/>
            </ProtectedAdminRoute>
          }/>

          <Route path="/terms" element={
            <ProtectedAdminRoute>
              <Terms url={url}/>
            </ProtectedAdminRoute>
          }/>

          <Route path="/privacy" element={
            <ProtectedAdminRoute>
              <Privacy url={url}/>
            </ProtectedAdminRoute>
          }/>

          <Route path="/settings" element={
            <ProtectedAdminRoute>
              <Settings url={url}></Settings>
            </ProtectedAdminRoute>
          }/>

          <Route path="/users" element={
            <ProtectedAdminRoute>
              <Users url={url}/>
            </ProtectedAdminRoute>
          }/>

          <Route path="/add" element={
            <ProtectedAdminRoute>
              <Add url={url}/>
            </ProtectedAdminRoute>
          }/>

          <Route path="/list" element={
            <ProtectedAdminRoute>
              <List url={url}/>
            </ProtectedAdminRoute>
          }/>

          <Route path="/orders" element={
            <ProtectedAdminRoute>
              <Orders url={url}/>
            </ProtectedAdminRoute>
          }/>

          {/* 404 page route */}
          <Route path="/404-not-found" element={
            <NotFound />
          }/>

          {/* Catch-all for unknown routes */}
          <Route path="*" element={
            <HandleUnknownRoute />
          }/>

        </Routes>
      </div>
      {/* Show footer only when logged in */}
      {!hideLayout && <Footer />}
    </div>
  )
}

export default App
