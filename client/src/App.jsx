import React from 'react'
import {Routes, Route} from 'react-router-dom'
import { useState } from "react";
import './styles/App.css'
import './styles/main.css'
import Header from './components/Header'
import Footer from './components/Footer'
import SlideInMenu from './components/SlideInMenu'
import LandingPage from './pages/LandingPage'  
import ChooseYourCake from './pages/ChooseYourCake' 
import FormWrapper from './components/formWrapper'
import ScrollToTop from './components/ScrollToTop'
import BuildMyCake from './pages/BuildMyCake'
import ShoppingCar from './pages/ShoppingCar'


function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
 return(
  <>
  <ScrollToTop />
  <Header />
  <SlideInMenu setIsCartOpen={setIsCartOpen} />
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path='/choose' element={<ChooseYourCake />} />
    <Route path ='/contact' element={<FormWrapper />} />
    <Route path='/login' element={<FormWrapper />}/>
    <Route path='/signeup' element={<FormWrapper />}/>
    <Route path='/buildYourOwn' element={<BuildMyCake />}/>
    <Route path='/shoppingCar' element={<ShoppingCar />}/>
  </Routes>
  <Footer />

  </>
 )
  
}

export default App
