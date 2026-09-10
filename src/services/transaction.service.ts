import { TransactionRepository } from "../repositories/transaction.repository.ts";

export class TransactionService {
  private repository: TransactionRepository;

  constructor() {
    this.repository = new TransactionRepository();
  }

  async getTransactionsByUser(userId: string) {
    return await this.repository.getTransactionsByUser(userId);
  }

  async getTransactionsByCard(
    cardId: string,
    userId: string,
  ) {
    return await this.repository.getTransactionsByCard(
      cardId,
      userId,
    );
  }
}