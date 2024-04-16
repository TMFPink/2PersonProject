import React from 'react'
import Food from '../../Pages/FoodList/FoodList';
import Home from '../../Pages/homepage/homepage';
import CreateFood from '../../Pages/CreateFood/CreateFood';
import TDEE from '../../Pages/TDEERec/TDEERec';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './navbar.css'
import logo from '../../Asset/homepage/logo.png'

// function openmenu() { 
//   document.getElementsByClassName('menu').style.width = '200px';
// }
function navbar() {
  return (
    <div>
      <Router>
        <div className='navigation-bar'> 
          
          <div className='nav-containter'>
            <img src={logo} alt="logo" className='nav-logo'/>
            <div className='navbutt-container'>
              <Link to="/" className='navbutt' > HOME</Link>
              <Link to="/food" className='navbutt'>FOOD LIST</Link>
              <Link to="/tdee" className='navbutt'>CALCULATE TDEE</Link> 
              <Link to="/mealsplan" className='navbutt'>MEALS PLAN</Link>
              <Link to="/account" className='navbutt'>ACCOUNT</Link>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/food" exact Component={Food} />
          <Route path="/createfood" exact Component={CreateFood} />
          <Route path="/tdee" exact Component={TDEE} />
        </Routes>  
      </Router>
    </div>
  )
}

export default navbar
