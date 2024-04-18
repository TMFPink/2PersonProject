const express = require('express');
const app = express();
const cors = require("cors")


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

