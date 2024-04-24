import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../../Pages/MealList/MealList.css';
import proteinIcon from '../../Asset/meallist/protein.png';
import carbIcon from '../../Asset/meallist/carb.png';
import fatIcon from '../../Asset/meallist/fat.png';
import caloriesIcon from '../../Asset/meallist/calories.png';

function SortedFood() {
  const { type } = useParams();
  const [sortedFoods, setSortedFoods] = useState([]);
  
  useEffect(() => {
    axios.get(`http://localhost:3001/food/byType/${type}`).then((response) => {
      setSortedFoods(response.data);
    }).catch((error) => {
      console.error('Error fetching sorted food items:', error);
    });
  }, [type]);

  const supportedImageFormats = ['jpeg', 'jpg', 'png', 'webp'];

  const getImageUrl = (id) => {
    for (const format of supportedImageFormats) {
      const imageUrl = `/foodpicture/${id}.${format}`;
      // Check if the image exists
      return imageUrl;
    }
    return '/foodpicture/default.jpg'; // Return default if none of the formats exist
  };

  return (
    <div className="meal-list-container">
      <h2 className="section-title">{type}</h2>
      <div className="card-container">
        {sortedFoods.map((value, key) => (
          <div className='food-card' key={key}>
            <Link to={`/FoodDetail/${value.id}`} className='food-card-link'>
              <div className='food-image-container'>
                <img className='food-image' src={getImageUrl(value.id)} alt="Food" />
              </div>
              <div className='food-details'>
                <div className='food-name'>{value.FoodName}</div>
                <div className='nutrition-info'>
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

export default SortedFood;
