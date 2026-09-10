import { transactions } from "../config/database.ts";
import type { ITransaction } from "../models/transaction.ts";
import type { ClientSession } from "npm:mongodb";

export class TransactionRepository {
  async create(
    transaction: ITransaction,
    session: ClientSession,
  ): Promise<ITransaction> {
    await transactions.insertOne(transaction, { session });

    return transaction;
  }
}