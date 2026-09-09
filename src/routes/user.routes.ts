import { Router } from "jsr:@oak/oak";

import {createUser,getMe, updateMe} from "../controllers/user.controller.ts";

import { authMiddleware } from "../middlewares/auth.middleware.ts";

const router = new Router();

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