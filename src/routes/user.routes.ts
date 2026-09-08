import { Router } from "jsr:@oak/oak";
import { createUser } from "../controllers/user.controller.ts";

const router = new Router();

router.post("/users", createUser);

export default router;