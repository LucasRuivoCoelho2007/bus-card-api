import { ObjectId } from "npm:mongodb";
import type { ITransaction } from "./transaction.ts";

export interface ICard {
  _id: ObjectId;
  user_id: ObjectId;
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
    this._id = data._id ?? new ObjectId();
    this.user_id = data.user_id!;
    this.type = data.type!;
    this.balance = data.balance ?? 0;
    this.last_transactions = data.last_transactions ?? [];
  }
}   