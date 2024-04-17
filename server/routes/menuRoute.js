

const express = require("express");
const pizzaAddingController = require("../controllers/menuController");
const router = express.Router();

router.post("/addingPizza", pizzaAddingController);

module.exports = router ;