import React, { useState } from 'react';
import tdeebackground from '../../Asset/tdee/tdee-background.jpg';
import './TDEERec.css';

function TDEERec() {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [activityLevel, setActivityLevel] = useState('1');
    const [recommendation, setRecommendation] = useState('');
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false); // State to track error notification visibility

    const calculateTDEE = () => {
        // Validate input values
        if (parseFloat(height) <= 0 || parseFloat(weight) <= 0 || parseInt(age) <= 0) {
            setError('Please enter valid values for height, weight, and age.');
            setShowError(true); // Show error notification
            return;
        }

        // Convert input values to appropriate data types
        const parsedHeight = parseFloat(height);
        const parsedWeight = parseFloat(weight);
        const parsedAge = parseInt(age);

        // Calculate BMR based on Mifflin-St Jeor Equation
        let bmr;
        if (gender === "male") {
            bmr = 10 * parsedWeight + 6.25 * parsedHeight - 5 * parsedAge + 5;
        } else if (gender === "female") {
            bmr = 10 * parsedWeight + 6.25 * parsedHeight - 5 * parsedAge - 161;
        }

        // Adjust BMR based on activity level to get TDEE
        let tdee;
        switch (parseInt(activityLevel)) {
            case 1:
                tdee = bmr * 1.2;
                break;
            case 2:
                tdee = bmr * 1.375;
                break;
            case 3:
                tdee = bmr * 1.55;
                break;
            case 4:
                tdee = bmr * 1.725;
                break;
            case 5:
                tdee = bmr * 1.9;
                break;
            default:
                setRecommendation("Invalid activity level input. Please select a valid activity level.");
                return;
        }

        // Recommendation
        let recommendationText;
        
        if (tdee < 1500) {
            recommendationText = "Your TDEE is between 1500 and 2000 calories per day. Aim to maintain a balanced diet with a mix of carbohydrates, proteins, and fats. Include plenty of fruits, vegetables, whole grains, lean proteins, and healthy fats in your meals.";
        } else {
            recommendationText = "Your TDEE is greater than or equal to 2000 calories per day. To maintain your current weight, you should aim to consume around this amount of calories per day. Make sure to include a variety of foods from all food groups in your diet to meet your nutritional needs.";
        }
        recommendationText = `Your TDEE (Total Daily Energy Expenditure) is approximately ${tdee.toFixed(2)} calories per day.\n` + recommendationText;
        setRecommendation(recommendationText);
        setError('');
    };

    const handleCalculateClick = () => {
        if (!height || !weight || !age) {
            setError('Please fill in all fields.');
            setShowError(true);
            return;
        }
        calculateTDEE();
    };

    const handleCloseError = () => {
        setError('');
        setShowError(false); 
    };

    return (
        <div className={`TDEE-container ${showError ? 'blurred' : ''}`}>
            <div className="container">
                <h2>TDEE Calculator</h2>
                <p>The Total Daily Energy Expenditure (TDEE) Calculator estimates how many calories you burn per day.</p>

                {showError && (
                    <div className="error-popup">
                        <p>{error}</p>
                        <button onClick={handleCloseError}>Close</button>
                    </div>
                )}

                <div className="input-group">
                    <label htmlFor="height">Height:</label>
                    <div className="input-with-placeholder">
                        <input type="number" id="height" value={height} onChange={(e) => setHeight(e.target.value)} />
                        <span className="placeholder">cm</span>
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="weight">Weight:</label>
                    <div className="input-with-placeholder">
                        <input type="number" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
                        <span className="placeholder">kg</span>
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="age">Age:</label>
                    <div className="input-with-placeholder">
                        <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
                        <span className="placeholder">years</span>
                    </div>
                </div>

                <div className="input-group">
                    <label>Gender:</label>
                    <div className="radio-group">
                        <input type="radio" id="maleRadio" name="gender" value="male" checked={gender === 'male'} onChange={() => setGender('male')} />
                        <label htmlFor="maleRadio" className="gender-label">Male</label>
                        <input type="radio" id="femaleRadio" name="gender" value="female" checked={gender === 'female'} onChange={() => setGender('female')} />
                        <label htmlFor="femaleRadio" className="gender-label">Female</label>
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="activityLevel">Activity Level:</label>
                    <select id="activityLevel" value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
                        <option value="1">Sedentary (little or no exercise)</option>
                        <option value="2">Lightly active (exercise 1-3 days/week)</option>
                        <option value="3">Moderately active (exercise 3-5 days/week)</option>
                        <option value="4">Very active (exercise 6-7 days/week)</option>
                        <option value="5">Super active (twice/day)</option>
                    </select>
                </div>

                <button onClick={handleCalculateClick}>Calculate</button>

                <div className="recommendation">
                    <h3>Recommendation:</h3>
                    <p>{recommendation}</p>
                </div>
            </div>
        </div>
    );
}

export default TDEERec;
