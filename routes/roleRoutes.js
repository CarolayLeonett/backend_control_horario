const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleControllers");

// Rutas para los roles
router.get("/", roleController.getRoles); // Obtener todos los roles
router.get("/:id", roleController.getRole); // Obtener un rol por ID
router.post("/", roleController.createRole); // Crear un nuevo rol
router.put("/:id", roleController.updateRole); // Actualizar un rol
router.delete("/:id", roleController.deleteRole); // Eliminar un rol

module.exports = router;
