import express from "express";
import { TransactionService } from "../services/transaction.service.ts";

const transactionService = new TransactionService();

export async function getTransactions(req: express.Request, res: express.Response) {
  const userId = req.userId;

  const transactions = await transactionService.getTransactionsByUser(
    userId,
  );

  res.send_ok(transactions);
}

export async function getTransactionsByCard(req: express.Request, res: express.Response) {
  const userId = req.userId;
  const cardId = req.params.cardId;

  const transactions = await transactionService.getTransactionsByCard(
    cardId,
    userId,
  );

  res.send_ok(transactions);
}