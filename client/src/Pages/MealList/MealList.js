import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MealList.css';

function Food() {

  const [listoffood, setListoffood] = useState([]);

  useEffect(() => {
   axios.get(`http://localhost:3001/food/`).then((response) => {
      setListoffood(response.data);
    })
  }, []);

  const supportedImageFormats = ['jpeg', 'jpg', 'png', 'webp'];
  const getImageUrl = (id) => {
    // Iterate over supported image formats and return the first one found
    for (const format of supportedImageFormats) {
      const imageUrl = `/foodpicture/${id}.${format}`;
      
      return imageUrl;
    }
    // Return a default image URL if no supported format is found
    return '/foodpicture/default.jpg';
  };
  return (
    <div>
      {/* <div className='sorted-food-filter'>
        <Link to="/sorted-food/Appetizer">Sort by Appetizer</Link>
        <Link to="/sorted-food/Side Dish">Sort by Side Dish</Link>
        <Link to="/sorted-food/Soup">Sort by Soup</Link>
        <Link to="/sorted-food/Salad">Sort by Salad</Link>
        <Link to="/sorted-food/Main Course">Sort by Main Course</Link>
        <Link to="/sorted-food/Dessert">Sort by Dessert</Link>
        <Link to="/sorted-food/Beverage">Sort by Beverage</Link>
      </div> */}
      
      {listoffood.map((value, key) => (
        <div className='post' key={key}>
          <Link to={`/FoodDetail/${value.id}`} className='food-card-link'>
            <div className='Info'>
              <img className='food-picture' src={getImageUrl(value.id)} alt="Food" />
              <div className='Name'> {value.FoodName} </div>
              <div className='Protein'>Protein: {value.Protein}</div>
              <div className='Fat'>Fat: {value.Fat}</div>
              <div className='Carb'>Carb: {value.Carb}</div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Food;
