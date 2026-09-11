import { TransactionRepository } from "../repositories/transaction.repository.ts";
import throwlhosModule from "npm:throwlhos";

export class TransactionService {
  private repository: TransactionRepository;

  constructor() {
    this.repository = new TransactionRepository();
  }

  async getTransactionsByUser(userId: string) {
    const transactions = await this.repository.getTransactionsByUser(userId);
    if (!transactions || transactions.length === 0) {
      throw throwlhosModule.default.err_notFound("No transactions found for this user");
    }
    return transactions;
  }

  async getTransactionsByCard(cardId: string,userId: string) {
    const transactions = await this.repository.getTransactionsByCard(cardId, userId);
    if (!transactions || transactions.length === 0) {
      throw throwlhosModule.default.err_notFound("No transactions found for this card");
    }
    return transactions;
  }
}