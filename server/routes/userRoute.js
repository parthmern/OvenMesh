const { signupController, loginController } = require("../controllers/userController");


const express = require("express");
const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);

module.exports = router ;