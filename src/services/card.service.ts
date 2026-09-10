import { ObjectId } from "npm:mongodb";
import { Card } from "../models/card.ts";
import { CardRepository } from "../repositories/card.repository.ts";

export class CardService {
  private repository: CardRepository;

  constructor() {
    this.repository = new CardRepository();
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
}