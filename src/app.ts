import { Application } from "jsr:@oak/oak";

import userRouter from "./routes/user.routes.ts";
import authRouter from "./routes/auth.routes.ts";
import healthRouter from "./routes/health.routes.ts";


const app = new Application();

app.use(healthRouter.routes());
app.use(healthRouter.allowedMethods());

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.use(authRouter.routes());
app.use(authRouter.allowedMethods());

console.log("Server running on http://localhost:8000");

await app.listen({ port: 8000 });