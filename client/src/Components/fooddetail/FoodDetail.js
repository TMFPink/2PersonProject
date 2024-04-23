import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './FoodDetail.css';
function FoodDetail() {
  let { id } = useParams();
  const [food, setFood] = useState([]);
  const [foodDetail, setFoodDetail] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/food/${id}`).then((response) => {
      setFood(response.data);
    });
    axios.get(`http://localhost:3001/fooddetail/${id}`).then((response) => {
      setFoodDetail(response.data);
    });
  }, [id]);

  if (!foodDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{food.FoodName}</h2>
      <p>Calories: {food.Calories}</p>
      <p>Protein: {food.Protein}</p>
      <p>Fat: {food.Fat}</p>
      <p>Carb: {food.Carb}</p>
      <p>Instruction: {food.Instruction}</p>
      <h3>Ingredients:</h3>
      <ul>
        {foodDetail.map((value, index) => 
          <li key={index}>
            <span>{value.Ingredient}: {value.IngreAmount}</span>
          </li>
        )}
      </ul>
    </div>
  );
}

export default FoodDetail;
