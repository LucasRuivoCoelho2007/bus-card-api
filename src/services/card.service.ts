import { client } from "../config/database.ts";
import { ObjectId } from "npm:mongodb";
import { Card } from "../models/card.ts";
import { CardRepository } from "../repositories/card.repository.ts";
import { TransactionRepository } from "../repositories/transaction.repository.ts";
import { Transaction } from "../models/transaction.ts";


export class CardService {
  private repository: CardRepository;

  private transactionRepository: TransactionRepository;

  constructor() {
    this.repository = new CardRepository();
    this.transactionRepository = new TransactionRepository();
  }

  async create(
    userId: string,
    type: string,
  ) {
    const card = new Card({
      user_id: new ObjectId(userId),
      type,
    });

    return await this.repository.create(card);
  }

  async getCards(userId: string) {
    const cards = await this.repository.getCards(userId);
    return cards;
  }

  async getCardById(cardId: string, userId: string) {
    const card = await this.repository.getCardById(cardId, userId);
    return card;
  }

  async updateCard(cardId: string, userId: string, type: string) {
    const card = await this.repository.getCardById(cardId, userId);

    if (!card) {
      throw new Error("Card not found");
    }

    await this.repository.updateCard(cardId, userId, { type });
    return {
      ...card,
      type,
    };
  }

  async deleteCard(cardId: string, userId: string) {
    const card = await this.repository.getCardById(cardId, userId);

    if (!card) {
      throw new Error("Card not found");
    }

    await this.repository.deleteCard(cardId, userId);
  }


  //Transaction
  async deposit(cardId: string, userId: string, amount: number) {
    if (amount <= 0) {
      throw new Error("Amount must be greater than zero");
    }

    const card = await this.repository.getCardById(cardId, userId);

    if (!card) {
      throw new Error("Card not found");
    }

    const session = client.startSession();

    try {
      session.startTransaction();

      // 1. aumentar saldo
      await this.repository.deposit(
        cardId,
        userId,
        amount,
        session,
      );

      // 2. registrar transaction
      const transaction = new Transaction({
        card_id: new ObjectId(cardId),
        amount,
        date: new Date(),
        status: "completed",
      });

      await this.transactionRepository.create(
        transaction,
        session,
      );

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  //Transaction
  async charge(cardId: string, userId: string) {
    const BUS_FARE = 5;

    const card = await this.repository.getCardById(
      cardId,
      userId,
    );

    if (!card) {
      throw new Error("Card not found");
    }

    if (card.balance < BUS_FARE) {
      throw new Error("Insufficient balance");
    }

    const session = client.startSession();

    try {
      session.startTransaction();

      // 1. diminuir o saldo
      await this.repository.charge(
        cardId,
        userId,
        BUS_FARE,
        session,
      );

      // 2. criar a transaction
      const transaction = new Transaction({
        card_id: new ObjectId(cardId),
        amount: -BUS_FARE,
        date: new Date(),
        status: "completed",
      });

      await this.transactionRepository.create(
        transaction,
        session,
      );

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }
}