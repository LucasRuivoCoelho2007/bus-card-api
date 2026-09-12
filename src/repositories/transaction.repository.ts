import type { ClientSession } from "npm:mongoose";
import { TransactionModel } from "../models/transaction.ts";
import type { ITransaction } from "../models/transaction.ts";
import mongoose from "npm:mongoose";

export class TransactionRepository {
  create(
    transaction: ITransaction,
    session: ClientSession,
  ) {
    return TransactionModel.create(
      [transaction],
      { session },
    ).then(([createdTransaction]) => createdTransaction);
  }

  getTransactionsByUser(userId: string) {
    return TransactionModel.aggregate([
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
          "card.user_id": new mongoose.Types.ObjectId(userId),
        },
      },
    ]);
  }

  getTransactionsByCard(
    cardId: string,
    userId: string,
  ) {
    return TransactionModel.aggregate([
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
          card_id: new mongoose.Types.ObjectId(cardId),
          "card.user_id": new mongoose.Types.ObjectId(userId),
        },
      },
    ]);
  }
}