const { createOrder, updateOrderStatus } = require("../controllers/orderController");

const express = require("express");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.post("/createOrder", auth, createOrder);
router.post("/updateStatus", updateOrderStatus);

module.exports = router ;