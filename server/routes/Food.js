const express = require('express');
const router = express.Router();
const {Food} = require("../models")


router.get("/", async (req,res) => {
    const ListOfFood = await Food.findAll()
    res.json(ListOfFood)
});
router.post("/", async (req, res) => {
    const food = req.body;
    await Food.create(food);
    res.json(food)
});


router.get("/:id", async (req, res) => {
    const foodId = req.params.id;
    const food = await Food.findByPk(foodId);
    if (!food) {
        return res.status(404).json({ error: "Food not found" });
    }
    res.json(food);
});
module.exports = router;
