const express = require("express");
const { getAllLiveOrders } = require("../controllers/adminController");

const router = express.Router();


router.get("/getAllLiveOrders", getAllLiveOrders);

module.exports = router ;