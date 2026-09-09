import { hashPassword, verifyPassword } from "../utils/password.ts";
import { User } from "../models/user.ts";
import { UserRepository } from "../repositories/user.repository.ts";

export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async create(
    name: string,
    email: string,
    password: string,
  ) {
    const passwordHash = await hashPassword(password);

    const user = new User({
      name,
      email,
      passwordHash,
    });

    return await this.repository.create(user);
  }
  async findById(id: string) {
    return await this.repository.findById(id);
  }
}