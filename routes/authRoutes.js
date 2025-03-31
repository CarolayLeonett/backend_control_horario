import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController.js";

const router = Router();

// Ruta para login
router.post("/login", loginUser);

// Ruta para registro de usuario
router.post("/register", registerUser);

export default router;
