const { signupController } = require("../controllers/userController");


const express = require("express");
const router = express.Router();

router.post("/signup", signupController);

module.exports = router ;