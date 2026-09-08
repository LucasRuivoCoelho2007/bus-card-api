import { Application } from "jsr:@oak/oak";
import userRouter from "./routes/user.routes.ts";

const app = new Application();

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

console.log("Servidor rodando em http://localhost:8000");

await app.listen({ port: 8000 });


