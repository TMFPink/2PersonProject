import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
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

    const getImageUrl =  (id) => {
        for (const format of supportedImageFormats) {
            const imageUrl = `/foodpicture/${id}.${format}`;
            // Check if the image exists
            return imageUrl;
        }
        return '/foodpicture/default.jpg'; // Return default if none of the formats exist
    };
  return (
    <div>
      <h2>Sorted Food - {type}</h2>
      {sortedFoods.map((value, key) => (
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

export default SortedFood;
