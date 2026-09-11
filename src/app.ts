import express from "npm:express";
import morgan from "npm:morgan";
import responserModule from "npm:responser";
import throwlhosModule from "npm:throwlhos";

import healthRouter from "./routes/health.routes.ts";
import userRouter from "./routes/user.routes.ts";
import cardRouter from "./routes/card.routes.ts";
import authRouter from "./routes/auth.routes.ts";
import transactionRouter from "./routes/transaction.routes.ts";
import { errorMiddleware } from "./middlewares/error.middleware.ts";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(responserModule.default);
app.use(throwlhosModule.default.middleware);

app.use(healthRouter);
app.use(userRouter);
app.use(authRouter);
app.use(cardRouter);
app.use(transactionRouter);

app.use((req, res) => {
  res.send_notFound("Route not found");
});

app.use(errorMiddleware);

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});