

const express = require("express");
const { pizzaAddingController, gettingPizzaController, deletingPizzaController } = require("../controllers/menuController");
const { isAdmin } = require("../middlewares/auth");

const router = express.Router();

router.post("/addingPizza", isAdmin, pizzaAddingController);
router.get("/allPizza", gettingPizzaController);
router.delete("/deletePizza", isAdmin, deletingPizzaController);

module.exports = router ;