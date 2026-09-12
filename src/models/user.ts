import mongoose from "npm:mongoose";

export interface IUser {
  _id: mongoose.Types.ObjectId;
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
    this._id = data._id ?? new mongoose.Types.ObjectId();
    this.name = data.name!;
    this.email = data.email!;
    this.passwordHash = data.passwordHash!;
  }
}

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export const UserModel = mongoose.model("User", userSchema);