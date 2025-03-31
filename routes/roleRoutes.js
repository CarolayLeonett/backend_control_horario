import { Router } from "express";

import {
  getRol,
  createRol,
  getUnRol,
  updateRol,
  deleteRol,
} from "../controllers/roleControllers.js";

const router = Router();

router.get("/rol", getRol);

router.get("/rol/:id", getUnRol);

router.post("/rol", createRol);

router.put("/rol/:id", updateRol);

router.delete("/rol/:id", deleteRol);

export default router;
