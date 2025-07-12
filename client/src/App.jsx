import React from 'react'
import {Routes, Route} from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { useState } from "react";
import './styles/App.css'
import './styles/main.css'
import Header from './components/Header'
import Footer from './components/Footer'
import SlideInMenu from './components/SlideInMenu'
import LandingPage from './pages/LandingPage'  
import ChooseYourCake from './pages/ChooseYourCake' 
import FormPage from './pages/FormPage'
import ScrollToTop from './components/ScrollToTop'
import ShoppingCar from './pages/ShoppingCar'
import Profile from './pages/Profile'



function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
 return(
  <>
    <Outlet />
    <ScrollToTop />
    <Header />
    <SlideInMenu setIsCartOpen={setIsCartOpen} />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path='/choose' element={<ChooseYourCake />} />
      <Route path ='/contact' element={<FormPage />} />
      <Route path='/login' element={<FormPage />}/>
      <Route path='/signup' element={<FormPage />}/>
      <Route path='/shoppingCar' element={<ShoppingCar />}/>
      <Route path='/profile' element={<Profile />} />
      <Route path='/checkout' element={<FormPage />} />
  </Routes>
  <Footer />
  </>
 )  
}

export default App
