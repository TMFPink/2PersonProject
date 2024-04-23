// import React from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import './MealList.css'

// function Food() {

//   const [ListOfFoods, setListOfFoods] = useState([]);
//   const [sortedFoodByType, setSortedFoodByType] = useState({});

//   useEffect(() => {
//     axios.get('http://localhost:3001/food').then((response) => {
//       setListOfFoods(response.data);
//       sortFoodByType();
//     }).catch((error) => {
//       console.error('Error fetching all food items:', error);
//     });
//   }, []);

//   const sortFoodByType = () => {
//     const foodByType = {};
//     ListOfFoods.forEach((food) => {
//       const foodType = food.FoodType.TypeName;
//       if (!foodByType[foodType]) {
//         foodByType[foodType] = [];
//       }
//       foodByType[foodType].push(food);
//     });
//     setSortedFoodByType(foodByType);
//   };

//   const handleSortByType = (type) => {
//     axios.get(`http://localhost:3001/food/byType/${type}`).then((response) => {
//       setListOfFoods(response.data);
//       sortFoodByType();
//     }).catch((error) => {
//       console.error('Error fetching food by type:', error);
//     });
//   };

//   return (
//     <div>
//       <button onClick={() => handleSortByType('Appetizer')}>Sort by Appetizer</button>
//       <button onClick={() => handleSortByType('Side Dish')}>Sort by Side Dish</button>
//       <button onClick={() => handleSortByType('Soup')}>Sort by Soup</button>
//       <button onClick={() => handleSortByType('Salad')}>Sort by Salad</button>
//       <button onClick={() => handleSortByType('Main Course')}>Sort by Main Course</button>
//       <button onClick={() => handleSortByType('Dessert')}>Sort by Dessert</button>
//       <button onClick={() => handleSortByType('Beverage')}>Sort by Beverage</button>
//        {ListOfFoods.map((value, key) => {
//         return (
//           <div className='post' key={key}>
//             <Link to={`/FoodDetail/${value.id}`} className='food-card-link'>
//               <div className='Info'>
//                 <div className='Name'> {value.FoodName} </div>
//                 <div className='Protein'>Protein: {value.Protein}</div>
//                 <div className='Fat'>Fat: {value.Fat}</div>
//                 <div className='Carb'>Carb: {value.Carb}</div>
//               </div>
//             </Link>
//           </div>
//         );
//       })} 
//     </div>
//   );
// }

// export default Food;
import React from 'react';
import { Link } from 'react-router-dom';
import './MealList.css';

function Food() {
  return (
    <div>
      <Link to="/sorted-food/Appetizer">Sort by Appetizer</Link>
      <Link to="/sorted-food/Side Dish">Sort by Side Dish</Link>
      <Link to="/sorted-food/Soup">Sort by Soup</Link>
      <Link to="/sorted-food/Salad">Sort by Salad</Link>
      <Link to="/sorted-food/Main Course">Sort by Main Course</Link>
      <Link to="/sorted-food/Dessert">Sort by Dessert</Link>
      <Link to="/sorted-food/Beverage">Sort by Beverage</Link>
    </div>
  );
}

export default Food;
