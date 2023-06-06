import React from 'react'
import "./Homepage.css";
import Navigation from '../Navbar/Navigation';
import Home from '../Home/Home';
import Information from '../Information/Information';
import Features from '../Features/Features';
import Footer from '../Footer/Footer';
function Homepage() {
  return (
    <div>
        <Navigation/>
        <Home/>
        <Information/>
        <Features/>
        <Footer/>
    </div>
  )
}

export default Homepage