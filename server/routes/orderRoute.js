const { createOrder, updateOrderStatus, getAllOrders, getOrderDetail } = require("../controllers/orderController");

const express = require("express");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.post("/createOrder", auth, createOrder);
router.post("/updateStatus", updateOrderStatus);
router.get("/getAllOrder", auth, getAllOrders);
router.post("/getOrderDetail", getOrderDetail);

module.exports = router ;