import React, { useState } from 'react';
import './TDEERec.css';
function TDEERec() {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [activityLevel, setActivityLevel] = useState('1');
    const [recommendation, setRecommendation] = useState('');

    const calculateTDEE = () => {
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
        let recommendationText = "Your TDEE (Total Daily Energy Expenditure) is approximately " + tdee.toFixed(2) + " calories per day.\n";
        recommendationText += "For maintaining your current weight, you should aim to consume around " + tdee.toFixed(2) + " calories per day.\n";
        recommendationText += "Consider a balanced diet with a proper mix of carbohydrates, proteins, and fats.\n";
        recommendationText += "Here are some food suggestions:\n";
        recommendationText += "- Lean proteins like chicken breast, fish, tofu\n";
        recommendationText += "- Complex carbohydrates like brown rice, quinoa, sweet potatoes\n";
        recommendationText += "- Healthy fats like avocado, nuts, olive oil\n";
        recommendationText += "- Plenty of fruits and vegetables for vitamins and minerals\n";
    
        setRecommendation(recommendationText);
    }

    const handleCalculateClick = () => {
        calculateTDEE();
    };

    return (
        <div>
            <h2>TDEE Calculator</h2>

            <label htmlFor="height">Height (cm):</label>
            <input type="number" id="height" value={height} onChange={(e) => setHeight(e.target.value)} />

            <label htmlFor="weight">Weight (kg):</label>
            <input type="number" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} />

            <label htmlFor="age">Age:</label>
            <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} />

            <label>Gender:</label>
            <input type="radio" id="maleRadio" name="gender" value="male" checked={gender === 'male'} onChange={() => setGender('male')} />
            <label htmlFor="maleRadio">Male</label>
            <input type="radio" id="femaleRadio" name="gender" value="female" checked={gender === 'female'} onChange={() => setGender('female')} />
            <label htmlFor="femaleRadio">Female</label>

            <label htmlFor="activityLevel">Activity Level:</label>
            <select id="activityLevel" value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
                <option value="1">Sedentary (little or no exercise)</option>
                <option value="2">Lightly active (exercise 1-3 days/week)</option>
                <option value="3">Moderately active (exercise 3-5 days/week)</option>
                <option value="4">Very active (exercise 6-7 days/week)</option>
                <option value="5">Super active (twice/day)</option>
            </select>

            <button onClick={handleCalculateClick}>Calculate</button>

            <div>
                <h3>Recommendation:</h3>
                <p>{recommendation}</p>
            </div>
        </div>
    );
}

export default TDEERec;
