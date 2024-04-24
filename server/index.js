const express = require('express');
const app = express();
const cors = require("cors")
const path = require('path');
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Add a route to serve images from /foodpictures
app.use('/foodpicture', express.static(path.join(__dirname, 'public', 'foodpicture')));

app.use(express.json())
app.use(cors())
const db = require("./models");



//Router
const userRouter = require('./routes/user');
app.use("/User", userRouter);

const foodDetailRouter = require('./routes/FoodDetail');
app.use("/FoodDetail", foodDetailRouter);

const foodRouter = require('./routes/Food');
app.use("/Food", foodRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
    console.log('Hello') 
})

})

