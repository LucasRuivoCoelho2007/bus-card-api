import express from "express";

import {createUser,getMe, updateMe} from "../controllers/user.controller.ts";

import { authMiddleware } from "../middlewares/auth.middleware.ts";

const router = express.Router();

router.post("/users", createUser);

router.get(
  "/users/me",
  authMiddleware,
  getMe,
);

router.put(
  "/users/me",
  authMiddleware,
  updateMe,
);

export default router;