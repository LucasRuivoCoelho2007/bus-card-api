import mongoose from "npm:mongoose";
import type { ITransaction } from "./transaction.ts";

export interface ICard {
  _id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  type: string;
  balance: number;
  last_transactions: ITransaction[];
}

export class Card implements ICard {
  _id: ICard["_id"];
  user_id: ICard["user_id"];
  type: ICard["type"];
  balance: ICard["balance"];
  last_transactions: ICard["last_transactions"];

  constructor(data: Partial<ICard>) {
    this._id = data._id ?? new mongoose.Types.ObjectId();
    this.user_id = data.user_id!;
    this.type = data.type!;
    this.balance = data.balance ?? 0;
    this.last_transactions = data.last_transactions ?? [];
  }
}

const cardSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    balance: {
      type: Number,
      default: 0,
    },

    last_transactions: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Transaction",
        },
      ],
      default: [],
    },
  },
  {
    versionKey: false,
  },
);

export const CardModel = mongoose.model("Card", cardSchema);