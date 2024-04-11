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

module.exports = router;
