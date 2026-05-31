import React from 'react'
import Home from './Home'

import HomePage from './components/Pages/HomePage';
import ProfilePage from './components/Pages/ProfilePage';
import SolvePage from './components/Pages/SolvePage';
import DsaproblemPage from './components/Pages/DsaproblemPage';
import PracticePage from './components/Pages/PracticePage';
import AptiTopic from './components/Pages/AptiTopic';
import Aptimodules from './components/Pages/Aptimodules';
import { Routes, Route,BrowserRouter } from "react-router-dom";
import Login from './components/authPages/LoginFrom'
import SignUp from './components/authPages/SignUpFrom'
const App = () => {
  const baseurl = "http://localhost:3000";
    return (
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path='/aptimodules' element={<Aptimodules/>}/>
      <Route path='/aptimodules/:name' element={<AptiTopic/>}/>
      <Route path= '/aptimodules/:name/practice' element={<PracticePage/>}/>
      <Route path='/problem-set' element = {<DsaproblemPage/>}> </Route>
      <Route path='/problem-set/:name' element={<SolvePage/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>
    </Routes>
  </BrowserRouter>
    
  );
    
  
}

export default App