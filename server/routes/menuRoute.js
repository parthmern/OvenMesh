

const express = require("express");
const { pizzaAddingController, gettingPizzaController } = require("../controllers/menuController");

const router = express.Router();

router.post("/addingPizza", pizzaAddingController);
router.get("/allPizza", gettingPizzaController);

module.exports = router ;