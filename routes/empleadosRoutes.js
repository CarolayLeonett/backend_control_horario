import { Router } from "express";

import {
  getEmpleado,
  createEmpleado,
  getUnEmpleado,
  updateEmpleado,
  deleteEmpleado,
} from "../controllers/empleadosControllers.js";

const router = Router();

router.get("/empleado", getEmpleado);

router.get("/empleado/:id", getUnEmpleado);

router.post("/empleado", createEmpleado);

router.put("/empleado/:id", updateEmpleado);

router.delete("/empleado/:id", deleteEmpleado);

export default router;
