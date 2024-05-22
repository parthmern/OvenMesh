

const express = require("express");
const { pizzaAddingController, gettingPizzaController, deletingPizzaController } = require("../controllers/menuController");
const { isAdmin } = require("../middlewares/auth");

const router = express.Router();

router.post("/addingPizza", pizzaAddingController);
router.get("/allPizza", gettingPizzaController);
router.delete("/deletePizza", deletingPizzaController);

module.exports = router ;