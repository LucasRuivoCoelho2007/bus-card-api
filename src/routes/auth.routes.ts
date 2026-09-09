import { Router } from "jsr:@oak/oak";
import { login } from "../controllers/auth.controller.ts";

const router = new Router();

router.post("/auth/login", login);

export default router;