const { createOrder } = require("../controllers/orderController");

const express = require("express");
const router = express.Router();

router.post("/createOrder", createOrder);

module.exports = router ;