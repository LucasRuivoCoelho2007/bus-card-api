import express from "express";

import { UserRepository } from "../repositories/user.repository.ts";
import { AuthService } from "../services/auth.service.ts";
import { createAuthController } from "../controllers/auth.controller.ts";

const router = express.Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = createAuthController(authService);

router.post("/auth/login", authController.login);

export default router;