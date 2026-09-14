import express from "express";

import { TransactionService } from "../services/transaction.service.ts";
import { createTransactionController } from "../controllers/transaction.controller.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";

const transactionService = new TransactionService();

const transactionController = createTransactionController(transactionService);

const router = express.Router();

router.get(
  "/transactions",
  authMiddleware,
  transactionController.getTransactions,
);

router.get(
  "/transactions/card/:cardId",
  authMiddleware,
  transactionController.getTransactionsByCard,
);

export default router;