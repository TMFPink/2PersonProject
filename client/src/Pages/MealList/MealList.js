import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MealList.css';
import proteinIcon from '../../Asset/meallist/protein.png';
import carbIcon from '../../Asset/meallist/carb.png';
import fatIcon from '../../Asset/meallist/fat.png';
import caloriesIcon from '../../Asset/meallist/calories.png';

function Food() {
  const [listoffood, setListoffood] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/food/`).then((response) => {
      setListoffood(response.data);
    });
  }, []);

  const supportedImageFormats = ['jpeg', 'jpg', 'png', 'webp'];
  const getImageUrl = (id) => {
    for (const format of supportedImageFormats) {
      const imageUrl = `/foodpicture/${id}.${format}`;
      return imageUrl;
    }
    return '/foodpicture/default.jpg';
  };

  return (
    <div className="meal-list-container">
      <h2 className="section-title">Meal List</h2>
      <div className="card-container">
        {listoffood.map((value, key) => (
          <div className="food-card" key={key}>
            <Link to={`/FoodDetail/${value.id}`} className="food-card-link">
              <div className="food-image-container">
                <img className="food-image" src={getImageUrl(value.id)} alt="Food" />
              </div>
              <div className="food-details">
                <div className="food-name">{value.FoodName}</div>
                <div className="nutrition-info">
                  <div className="info-item">
                    <img className="nutrition-icon" src={caloriesIcon} alt="Calories" />
                    Calories: {value.Calories}
                  </div>
                  <div className="info-item">
                    <img className="nutrition-icon" src={proteinIcon} alt="Protein" />
                    Protein: {value.Protein}
                  </div>
                  <div className="info-item">
                    <img className="nutrition-icon" src={carbIcon} alt="Carb" />
                    Carb: {value.Carb}
                  </div>
                  <div className="info-item">
                    <img className="nutrition-icon" src={fatIcon} alt="Fat" />
                    Fat: {value.Fat}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <footer className="footer-section">
        <div className="footer-content">
          <ul>
            <li><Link to="/blog">Blog</Link></li>
            <li><div style={{color:'#FFFFFF'}}> Terms of Service </div></li>
            <li><div style={{color:'#FFFFFF'}}> Privacy Policy </div></li>
            <li><a href="mailto:food4g@gmail.com">Contact Us</a></li>
          </ul>
          <p style={{color:'#FFFFFF'}}>&copy; 2024 Fitness Journey. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Food;
