const { createOrder, updateOrderStatus } = require("../controllers/orderController");

const express = require("express");
const router = express.Router();

router.post("/createOrder", createOrder);
router.post("/updateStatus", updateOrderStatus);

module.exports = router ;