import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import './FoodList.css'
function Food() {
    const [ListOfFoods,setlistoffood] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/food').then((response) => {
      setlistoffood(response.data);
    })
  }, []);
    return (
    <div>
        {ListOfFoods.map((value, key) => {
        return (
            <div className='post'>
                <div className='Info'>
                    <div className='Name'> {value.Name} </div> 
                    <div className='Protein'>Protein: {value.Protein}</div>
                    <div className='Fat'>Fat: {value.Fat}</div>
                    <div className='Carb'>Carb: {value.Carb}</div>
                </div>
            </div>
        )
        })}
    </div>
  )
}

export default Food
