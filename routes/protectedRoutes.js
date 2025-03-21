const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");

router.get("/home", authenticateToken, (req, res) => {
  console.log("Acceso autorizado a la ruta '/home'"); // Log cuando se autoriza el acceso
  res.json({ message: "Acceso a Home" });
});

module.exports = router;
