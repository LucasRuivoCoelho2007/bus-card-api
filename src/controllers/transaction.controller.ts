import type { Context } from "jsr:@oak/oak";
import { TransactionService } from "../services/transaction.service.ts";

const transactionService = new TransactionService();

export async function getTransactions(ctx: Context) {
  const userId = ctx.state.userId;

  const transactions = await transactionService.getTransactionsByUser(
    userId,
  );

  ctx.response.status = 200;
  ctx.response.body = transactions;
}

export async function getTransactionsByCard(ctx: Context) {
  const userId = ctx.state.userId;
  const cardId = ctx.params.cardId;

  const transactions = await transactionService.getTransactionsByCard(
    cardId,
    userId,
  );

  ctx.response.status = 200;
  ctx.response.body = transactions;
}