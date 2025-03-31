import { Router } from "express";

import {
  getCargo,
  createCargo,
  getUnCargo,
  updateCargo,
  deleteCargo,
} from "../controllers/cargoControllers.js";

const router = Router();

router.get("/cargo", getCargo);

router.get("/cargo/:id", getUnCargo);

router.post("/cargo", createCargo);

router.put("/cargo/:id", updateCargo);

router.delete("/cargo/:id", deleteCargo);

export default router;
