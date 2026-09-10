import { cards } from "../config/database.ts";
import type { ICard } from "../models/card.ts";
import { ObjectId } from "npm:mongodb";
import type { ClientSession } from "npm:mongodb";

export class CardRepository {
  async create(card: ICard): Promise<ICard> {
    await cards.insertOne(card);

    return card;
  }

  async getCards(userId: string) {
    const userCards = await cards.find({
      user_id: new ObjectId(userId),
    }).toArray();

    return userCards;
  }

  async getCardById(cardId: string, userId: string) {
    const card = await cards.findOne({
      _id: new ObjectId(cardId),
      user_id: new ObjectId(userId),
    });

    return card;
  }

  async updateCard(cardId: string, userId: string, updatedCard: Partial<ICard>) {
    await cards.updateOne({
      _id: new ObjectId(cardId),
      user_id: new ObjectId(userId),
    }, { $set: updatedCard });
  }

  async deleteCard(cardId: string, userId: string) {
    await cards.deleteOne({
      _id: new ObjectId(cardId),
      user_id: new ObjectId(userId),
    });
  }

  async deposit(cardId: string, userId: string, amount: number, session: ClientSession) {
    await cards.updateOne(
      {
        _id: new ObjectId(cardId),
        user_id: new ObjectId(userId),
      },
      {
        $inc: {
          balance: amount,
        },
      },
      {
        session,
      },
    );
  }
}