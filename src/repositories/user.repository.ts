import { users } from "../config/database.ts";
import type { IUser } from "../models/user.ts";

export class UserRepository {
  async create(user: IUser): Promise<IUser> {
    await users.insertOne(user);

    return user;
  }
}