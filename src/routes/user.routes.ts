import express from "express";

import { UserRepository } from "../repositories/user.repository.ts";
import { UserService } from "../services/user.service.ts";
import { createUserController } from "../controllers/user.controller.ts";

import { authMiddleware } from "../middlewares/auth.middleware.ts";

const router = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = createUserController(userService);

router.post("/users", userController.createUser);

router.get(
  "/users/me",
  authMiddleware,
  userController.getMe,
);

router.put(
  "/users/me",
  authMiddleware,
  userController.updateMe,
);

export default router;