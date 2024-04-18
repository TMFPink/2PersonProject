import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './FoodList.css';

function Food() {
  const [ListOfFoods, setlistoffood] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/food').then((response) => {
      setlistoffood(response.data);
    });
  }, []);

  return (
    <div>
      {ListOfFoods.map((value, key) => {
        return (
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
        );
      })}
    </div>
  );
}

export default Food;
