//authRoutes.js
const express = require("express");
const router = express.Router();
const { loginUser, registerUser } = require("../controllers/authController");

// Ruta para login
router.post("/login", loginUser);

// Ruta para registro de usuario
router.post("/register", registerUser);

module.exports = router;
