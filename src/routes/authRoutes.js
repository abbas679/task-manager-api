const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");
const {
  validateRegister,
  validateLogin,
  handleValidation,
} = require("../middleware/validators");

router.post("/register", validateRegister, handleValidation, registerUser);
router.post("/login", validateLogin, handleValidation, loginUser);

module.exports = router;
