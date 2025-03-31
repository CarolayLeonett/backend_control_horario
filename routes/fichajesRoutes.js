import { Router } from "express";

import {
  getFichaje,
  createFichaje,
  getUnFichaje,
  updateFichaje,
  deleteFichaje,
} from "../controllers/fichajesControllers.js";

const router = Router();

router.get("/fichaje", getFichaje);

router.get("/fichaje/:id", getUnFichaje);

router.post("/fichaje", createFichaje);

router.put("/fichaje/:id", updateFichaje);

router.delete("/fichaje/:id", deleteFichaje);

export default router;
