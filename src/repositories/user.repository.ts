import { UserModel } from "../models/user.ts";
import type { IUser } from "../models/user.ts";
import mongoose from "npm:mongoose";

export interface IUserRepository {
  create(user: IUser): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  updateMe(
    id: string,
    name: string,
    email: string,
  ): Promise<IUser | null>;
}

export class UserRepository implements IUserRepository {
  create(user: IUser) {
    return UserModel.create(user);
  }

  findByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  findById(id: string) {
    return UserModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
  }

  updateMe(
    id: string,
    name: string,
    email: string,
  ) {
    return UserModel.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(id),
      },
      {
        $set: {
          name,
          email,
        },
      },
      {
        new: true,
      },
    );
  }
}