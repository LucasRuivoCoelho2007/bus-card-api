import { UserModel } from "../models/user.ts";
import type { IUser } from "../models/user.ts";
import mongoose from "npm:mongoose";

export class UserRepository {
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