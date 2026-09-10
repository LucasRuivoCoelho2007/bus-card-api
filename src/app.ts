import express from "express";
import morgan from "morgan";

import healthRouter from "./routes/health.routes.ts";
import userRouter from "./routes/user.routes.ts";
import cardRouter from "./routes/card.routes.ts";
import authRouter from "./routes/auth.routes.ts";
import transactionRouter from "./routes/transaction.routes.ts";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use(healthRouter);
app.use(userRouter);
app.use(authRouter);
app.use(cardRouter);
app.use(transactionRouter);

console.log("Server running on http://localhost:8000");

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});