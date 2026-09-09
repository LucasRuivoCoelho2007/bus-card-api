import { Router } from "jsr:@oak/oak";

const router = new Router();

router.get("/health", (ctx) => {
  ctx.response.status = 200;
  ctx.response.body = {
    status: "ok",
  };
});

export default router;