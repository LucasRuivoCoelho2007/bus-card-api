import { transactions } from "../config/database.ts";
import type { ITransaction } from "../models/transaction.ts";
import { ObjectId } from "npm:mongodb";
import type { ClientSession } from "npm:mongodb";

export class TransactionRepository {
  async create(
    transaction: ITransaction,
    session: ClientSession,
  ): Promise<ITransaction> {
    await transactions.insertOne(transaction, { session });
    return transaction;
  }

  async getTransactionsByUser(userId: string) {
    const userTransactions = await transactions.aggregate([
      {
        $lookup: {
          from: "cards",
          localField: "card_id",
          foreignField: "_id",
          as: "card",
        },
      },
      {
        $unwind: "$card",
      },
      {
        $match: {
          "card.user_id": new ObjectId(userId),
        },
      },
    ]).toArray();

    return userTransactions;
  }

  async getTransactionsByCard(
    cardId: string,
    userId: string,
  ) {
    const cardTransactions = await transactions.aggregate([
      {
        $lookup: {
          from: "cards",
          localField: "card_id",
          foreignField: "_id",
          as: "card",
        },
      },
      {
        $unwind: "$card",
      },
      {
        $match: {
          card_id: new ObjectId(cardId),
          "card.user_id": new ObjectId(userId),
        },
      },
    ]).toArray();

    return cardTransactions;
  }
}