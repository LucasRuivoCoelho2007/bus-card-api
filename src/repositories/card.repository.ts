import type { ClientSession } from "npm:mongoose";
import { CardModel } from "../models/card.ts";
import type { ICard } from "../models/card.ts";
import mongoose from "npm:mongoose";

export class CardRepository {
  create(card: ICard) {
    return CardModel.create(card);
  }

  getCards(userId: string) {
    return CardModel.find({
      user_id: new mongoose.Types.ObjectId(userId),
    });
  }

  getCardById(cardId: string, userId: string) {
    return CardModel.findOne({
      _id: new mongoose.Types.ObjectId(cardId),
      user_id: new mongoose.Types.ObjectId(userId),
    });
  }

  updateCard(
    cardId: string,
    userId: string,
    updatedCard: Partial<ICard>,
  ) {
    return CardModel.updateOne(
      {
        _id: new mongoose.Types.ObjectId(cardId),
        user_id: new mongoose.Types.ObjectId(userId),
      },
      {
        $set: updatedCard,
      },
    );
  }

  deleteCard(cardId: string, userId: string) {
    return CardModel.deleteOne({
      _id: new mongoose.Types.ObjectId(cardId),
      user_id: new mongoose.Types.ObjectId(userId),
    });
  }

  deposit(
    cardId: string,
    userId: string,
    amount: number,
    session: ClientSession,
  ) {
    return CardModel.updateOne(
      {
        _id: new mongoose.Types.ObjectId(cardId),
        user_id: new mongoose.Types.ObjectId(userId),
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

  charge(
    cardId: string,
    userId: string,
    amount: number,
    session: ClientSession,
  ) {
    return CardModel.updateOne(
      {
        _id: new mongoose.Types.ObjectId(cardId),
        user_id: new mongoose.Types.ObjectId(userId),
      },
      {
        $inc: {
          balance: -amount,
        },
      },
      {
        session,
      },
    );
  }
}