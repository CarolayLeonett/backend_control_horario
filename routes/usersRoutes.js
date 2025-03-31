import { Router } from "express";

import {
  getUsers,
  getUnUsers,
  updateUsers,
  deleteUsers,
} from "../controllers/usersControllers.js";

const router = Router();

router.get("/users", getUsers);

router.get("/users/:id", getUnUsers);

router.put("/users/:id", updateUsers);

router.delete("/users/:id", deleteUsers);

export default router;
