import { ObjectId } from "npm:mongodb";

export interface ITransaction {
  _id: ObjectId;
  card_id: ObjectId;
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
    this._id = data._id ?? new ObjectId();
    this.card_id = data.card_id!;
    this.amount = data.amount!;
    this.date = data.date ?? new Date();
    this.status = data.status ?? "pending";
  }
}   