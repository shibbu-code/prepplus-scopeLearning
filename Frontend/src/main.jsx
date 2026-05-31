import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import HeroSection from  './components/HeroSection/HeroSection.jsx'
import Features from './components/FeatureSection/Features.jsx'
import AboutUs from './components/AboutUs/AboutUs.jsx'
import App from './App.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import HomePage from './components/Pages/HomePage.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
