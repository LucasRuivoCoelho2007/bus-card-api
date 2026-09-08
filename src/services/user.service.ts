import { User } from "../models/user.ts";
import { UserRepository } from "../repositories/user.repository.ts";

export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async create(name: string, email: string) {
    const user = new User({
      name,
      email,
    });

    return await this.repository.create(user);
  }
}