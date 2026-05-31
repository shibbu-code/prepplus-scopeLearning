import React from 'react'
import Navbar from '../Navbar/Navbar'
import HeroSection from '../HeroSection/HeroSection'
import AboutUs from '../AboutUs/AboutUs'
import Features from '../FeatureSection/Features'
import './HomPage.css'
const HomePage = () => {
  return (
    <>
    
    <HeroSection/>
    <section id='features'>
<Features/>
    </section>
   <section id='about'>
<AboutUs/>
    </section>
    </>
  )
}

export default HomePage