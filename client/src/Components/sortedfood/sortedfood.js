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

  return (
    <div>
      <h2>Sorted Food - {type}</h2>
      {sortedFoods.map((value, key) => (
        <div className='post' key={key}>
          <Link to={`/FoodDetail/${value.id}`} className='food-card-link'>
            <div className='Info'>
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
