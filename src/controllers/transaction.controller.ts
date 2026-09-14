import express from "express";
import { TransactionService } from "../services/transaction.service.ts";

export function createTransactionController( transactionService: TransactionService, ){

  async function getTransactions(req: express.Request, res: express.Response) {
    const userId = req.userId;

    const transactions = await transactionService.getTransactionsByUser(
      userId,
    );

    res.send_ok(transactions);
  }

  async function getTransactionsByCard(req: express.Request, res: express.Response) {
    const userId = req.userId;
    const cardId = req.params.cardId;

    const transactions = await transactionService.getTransactionsByCard(
      cardId,
      userId,
    );

    res.send_ok(transactions);
  }
  return { getTransactions, getTransactionsByCard};
}