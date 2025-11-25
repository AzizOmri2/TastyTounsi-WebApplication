import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import BackToTop from './components/BackToTop/BackToTop'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import NotFound from './components/NotFound/NotFound'
import { ToastContainer } from 'react-toastify'
import PrivateRoute from './components/PrivateRoute'


if (import.meta.env.MODE === "production") {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}


const App = () => {

  const [showLogin,setShowLogin] = useState(false);

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path='/' element={<Home/>}/>

          <Route path='/cart' element={
            <PrivateRoute>
              <Cart/>
            </PrivateRoute>
          }/>

          <Route path='/order' element={
            <PrivateRoute>
              <PlaceOrder/>
            </PrivateRoute>
          }/>

          <Route path='/verify' element={
            <PrivateRoute>
              <Verify/>
            </PrivateRoute>
          }/>

          <Route path='/myorders' element={
            <PrivateRoute>
              <MyOrders/>
            </PrivateRoute>
          }/>

          {/* Catch-all route for non-existing pages */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BackToTop />
      </div>
      <Footer/>
    </>
  )
}

export default App
