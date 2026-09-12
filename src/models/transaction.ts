import mongoose from "npm:mongoose";

export interface ITransaction {
  _id: mongoose.Types.ObjectId;
  card_id: mongoose.Types.ObjectId;
  amount: number;
  date: Date;
  status: string;
}

export class Transaction implements ITransaction {
  _id: ITransaction["_id"];
  card_id: ITransaction["card_id"];
  amount: ITransaction["amount"];
  date: ITransaction["date"];
  status: ITransaction["status"];

  constructor(data: Partial<ITransaction>) {
    this._id = data._id ?? new mongoose.Types.ObjectId();
    this.card_id = data.card_id!;
    this.amount = data.amount!;
    this.date = data.date ?? new Date();
    this.status = data.status ?? "pending";
  }
}

const transactionSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    card_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      default: "pending",
    },
  },
  {
    versionKey: false,
  },
);

export const TransactionModel = mongoose.model(
  "Transaction",
  transactionSchema,
);