import { Router } from "jsr:@oak/oak";

import {
  getTransactions,
  getTransactionsByCard,
} from "../controllers/transaction.controller.ts";

import { authMiddleware } from "../middlewares/auth.middleware.ts";

const router = new Router();

router.get("/transactions", authMiddleware, getTransactions);

router.get("/transactions/card/:cardId", authMiddleware, getTransactionsByCard);

export default router;