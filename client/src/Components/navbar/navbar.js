import React, { useState, useEffect } from 'react';
import Food from '../../Pages/FoodList/FoodList';
import Home from '../../Pages/HomePage/HomePage';
import CreateFood from '../../Pages/CreateFood/CreateFood';
import TDEE from '../../Pages/TDEERec/TDEERec';
import FoodDetail from '../../Components/fooddetail/FoodDetail';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './navbar.css'
import logo from '../../Asset/homepage/logo.png'


// function openmenu() { 
//   document.getElementsByClassName('menu').style.width = '200px';
// }
function Navbar() { 
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    const scrollStep = -window.scrollY / (800 / 15); 
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <Router>
        <div className='navigation-bar'> 
          <div className='nav-container'>
            <img src={logo} alt="logo" className='nav-logo'/>
            <div className='navbutt-container'>
              <Link to="/" className='navbutt'> HOME</Link>
              <Link to="/tdee" className='navbutt'>CALCULATE TDEE</Link> 
              <Link to="/food" className='navbutt'>FOOD LIST</Link>
              <Link to="/blog" className='navbutt'>BLOG</Link>
              <Link to="/account" className='navbutt'>ACCOUNT</Link>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/food" exact Component={Food} />
          <Route path="/createfood" exact Component={CreateFood} />
          <Route path="/tdee" exact Component={TDEE} />
          <Route path="/fooddetail/:id" exact Component={FoodDetail} />
        </Routes>  
      </Router>
      <div className={`scroll-to-top ${isVisible ? 'show' : ''}`} onClick={scrollToTop}>
        <span>&#8679;</span>
      </div>
    </div>
  );
}

export default Navbar;
