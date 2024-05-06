import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../../Pages/MealList/MealList.css';
import proteinIcon from '../../Asset/meallist/protein.png';
import carbIcon from '../../Asset/meallist/carb.png';
import fatIcon from '../../Asset/meallist/fat.png';
import caloriesIcon from '../../Asset/meallist/calories.png';
import { useNavigate } from 'react-router-dom';
function SortedFood() {
  const { type } = useParams();
  const [sortedFoods, setSortedFoods] = useState([]);
  const [listoffood, setListoffood] = useState([]);
  const [foodingredient, setfoodingredient] = useState([]);
  const [filteredFood, setFilteredFood] = useState({
    MeatAndProtein: false,
    Vegetables: false,
    Fruits: false,
    DairyAndCheese: false,
    GrainAndCarbs: false,
    SaucesOilCondiments: false,
    HerbAndSpices: false,
    Miscellaneous: false,
});
  
  useEffect(() => {
    axios.get(`http://localhost:3001/food/byType/${type}`).then((response) => {
      setSortedFoods(response.data);
      console.log("Sorted Food Data:", response.data);
    }).catch((error) => {
      console.error('Error fetching sorted food items:', error);
    });
  }, [type]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const foodResponse = await axios.get('http://localhost:3001/food');
        setListoffood(foodResponse.data);
        console.log("Food Data:", foodResponse.data);
        
        const ingredientResponse = await axios.get('http://localhost:3001/foodingre');
        setfoodingredient(ingredientResponse.data);
        console.log("Ingredient Data:", ingredientResponse.data);
      } catch (error) {
        console.error('Error fetching food and ingredient data:', error);
      }
    }
    fetchData();
  }, []);


  const linkFoodWithIngredients = () => {
    const linkedFood = sortedFoods.map(food => {
      const ingredients = foodingredient.filter(ingredient => ingredient.FoodID === food.id);
      return { ...food, ingredients };
    });
    return linkedFood;
  };
  const getFilteredFood = () => {
    let linkedFood = linkFoodWithIngredients();
    if (filteredFood.MeatAndProtein) {
      linkedFood = linkedFood.filter(food => food.ingredients.some(ingredient =>
        ['Beef', 'Chicken', 'Shrimp', 'Salmon Fillets', 'Seafood Mix (shrimp, mussels, squid)'].includes(ingredient.Ingredient)
      ));
    }
    if(filteredFood.Vegetables){
      linkedFood = linkedFood.filter(food => food.ingredients.some(ingredient =>
        ['Bell Peppers', 'Tomatoes', 'Onions', 'Spinach', 'Zucchini', 'Portobello Mushrooms', 'Roasted Vegetables (e.g., bell peppers, zucchini, eggplant)', 'Lettuce', 'Cucumbers', 'Jalapeno', 'Asparagus Spears', 'Artichoke Hearts', 'Cabbage', 'Carrots', 'Celery'].includes(ingredient.Ingredient)
      ));
    }
    if (filteredFood.Fruits) {
    linkedFood = linkedFood.filter(food => food.ingredients.some(ingredient =>
      ['Avocado', 'Apple slices', 'Apples', 'Strawberries', 'Blueberries', 'Raspberries', 'Bananas'].includes(ingredient.Ingredient)
    ));
    }
    if (filteredFood.DairyAndCheese) {
      linkedFood = linkedFood.filter(food => food.ingredients.some(ingredient =>
        ['Cheese', 'Fresh Mozzarella Cheese', 'Parmesan Cheese', 'Ricotta Cheese', 'Whipped Cream', 'Greek Yogurt', 'Butter', 'Heavy Cream'].includes(ingredient.Ingredient)
      ));
    }
    if (filteredFood.GrainAndCarbs) {
      linkedFood = linkedFood.filter(food => food.ingredients.some(ingredient =>
        ['Pasta', 'Rice', 'Tortillas', 'Bread', 'Burger Bun', 'Oats', 'Waffles', 'Pancakes', 'Toast', 'Angel Food Cake'].includes(ingredient.Ingredient)
      ));
    }
    if (filteredFood.SaucesOilCondiments) {
      linkedFood = linkedFood.filter(food => food.ingredients.some(ingredient =>
        ['Soy Sauce', 'Oyster Sauce', 'Taco Seasoning', 'Balsamic Vinegar', 'Olive Oil', 'Lemon Juice', 'Cinnamon', 'Sugar', 'Salt', 'Pepper', 'Mustard', 'Mayonnaise', 'Jam or Jelly', 'Honey', 'Maple Syrup', 'Alfredo Sauce', 'Agave Syrup'].includes(ingredient.Ingredient)
      ));
    }
    if (filteredFood.HerbAndSpices) {
      linkedFood = linkedFood.filter(food => food.ingredients.some(ingredient =>
        ['Basil leaves', 'Thyme', 'Parsley', 'Cilantro', 'Garlic', 'Cinnamon', 'Herbs'].includes(ingredient.Ingredient)
      ));
    }
    if (filteredFood.Miscellaneous) {
      linkedFood = linkedFood.filter(food => food.ingredients.some(ingredient =>
        ['Pine Nuts', 'Pineapple', 'Pickles', 'Ice cream', 'Chocolate Sauce', 'Chocolate', 'Coconut', 'Peanut Butter', 'Almond Butter', 'Chocolate Chips', 'Raisins', 'Seeds', 'Nuts', 'Flaxseed', 'Chia Seeds', 'Protein Powder'].includes(ingredient.Ingredient)
      ));
    }
    return linkedFood;
  };

  const toggleFilter = (filter) => {
    setFilteredFood(prevFilters => ({
        ...prevFilters,
        [filter]: !prevFilters[filter] // Toggle the state of the filter
    }));
  }; 

  const supportedImageFormats = ['jpeg', 'jpg', 'png', 'webp'];

  const getImageUrl = (id) => {
    for (const format of supportedImageFormats) {
      const imageUrl = `/foodpicture/${id}.${format}`;
      // Check if the image exists
      return imageUrl;
    }
    return '/foodpicture/default.jpg'; // Return default if none of the formats exist
  };
  // State for search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  // Function to handle search
  const handleSearch = (query) => {
      const filteredResults = listoffood.filter((food) =>
          food.FoodName.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
  };
  const navigation = useNavigate();
  return (
    <div className="meal-list-container">
      <div className="SearchBox">
        <input
            type="text"
            className="SearchContainer"
            placeholder="Tìm kiếm"
            value={searchQuery}
            onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch(e.target.value);
            }}/>
        
        
        {/* Search results dropdown */}
        {searchQuery && (
            <div className="SearchResults">
                {searchResults.map((result) => (
                    <div
                        key={result.ID}
                        className="SearchResultItem"
                        onClick={() => {
                            navigation(`/FoodDetail/${result.id}`);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        <img src={getImageUrl(result.id)} alt="book" className="BookThumbnail" />
                        <div className="BookTitle_Search">{result.FoodName}</div>
                    </div>
                ))}
            </div>
        )}
        <div className="filterlist">
            <div className='filtercontent'>
                <span className={filteredFood.MeatAndProtein ? 'filter-button active' : 'filter-button'} onClick={() => toggleFilter('MeatAndProtein')}>MeatAndProtein</span>
                <span className={filteredFood.Vegetables ? 'filter-button active' : 'filter-button'} onClick={() => toggleFilter('Vegetables')}>Vegetables</span>
                <span className={filteredFood.Fruits ? 'filter-button active' : 'filter-button'} onClick={() => toggleFilter('Fruits')}>Fruits</span>
                <span className={filteredFood.DairyAndCheese ? 'filter-button active' : 'filter-button'} onClick={() => toggleFilter('DairyAndCheese')}>DairyAndCheese</span>
                <span className={filteredFood.GrainAndCarbs ? 'filter-button active' : 'filter-button'} onClick={() => toggleFilter('GrainAndCarbs')}>GrainsAndCarbs</span>
                <span className={filteredFood.SaucesOilCondiments ? 'filter-button active' : 'filter-button'} onClick={() => toggleFilter('SaucesOilCondiments')}>SaucesOilCondiments</span>
                <span className={filteredFood.HerbAndSpices ? 'filter-button active' : 'filter-button'} onClick={() => toggleFilter('HerbAndSpices')}>HerbsAndSpices</span>
                <span className={filteredFood.Miscellaneous ? 'filter-button active' : 'filter-button'} onClick={() => toggleFilter('Miscellaneous')}>Miscellaneous</span>
        
            </div>
        </div>
    </div>
      <h2 className="section-title">{type}</h2>
      <div className="card-container">
        {getFilteredFood().map((value, key) => (
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
