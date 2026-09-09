import { users } from "../config/database.ts";
import type { IUser } from "../models/user.ts";
import { ObjectId } from "npm:mongodb";

export class UserRepository {
  async create(user: IUser): Promise<IUser> {
    await users.insertOne(user);

    return user;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await users.findOne({ email });
  }

  async findById(id: string): Promise<IUser | null> {
    return await users.findOne({
      _id: new ObjectId(id),
    });
  }

  async updateMe(
    id: string,
    name: string,
    email: string,
  ): Promise<IUser | null> {
    return await users.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          email,
        },
      },
      {
        returnDocument: "after",
      },
    );
  }
}