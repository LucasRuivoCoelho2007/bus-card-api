import { Router } from "jsr:@oak/oak";

import {createUser,getMe} from "../controllers/user.controller.ts";

import { authMiddleware } from "../middlewares/auth.middleware.ts";

const router = new Router();

router.post("/users", createUser);

router.get(
  "/users/me",
  authMiddleware,
  getMe,
);

export default router;