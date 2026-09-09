import { ObjectId } from "npm:mongodb";

export interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
  passwordHash: string;
}

export class User implements IUser {
  _id: IUser["_id"];
  name: IUser["name"];
  email: IUser["email"];
  passwordHash: IUser["passwordHash"];

  constructor(data: Partial<IUser>) {
    this._id = data._id ?? new ObjectId();
    this.name = data.name!;
    this.email = data.email!;
    this.passwordHash = data.passwordHash!;
  }
}   