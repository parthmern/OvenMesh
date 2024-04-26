const express = require("express");
const { getAllLiveOrders } = require("../controllers/adminController");
const { isAdmin } = require("../middlewares/auth");

const router = express.Router();


router.post("/getAllLiveOrders",isAdmin, getAllLiveOrders);

module.exports = router ;