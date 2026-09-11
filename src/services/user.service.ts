import { hashPassword, verifyPassword } from "../utils/password.ts";
import { User } from "../models/user.ts";
import { UserRepository } from "../repositories/user.repository.ts";
import throwlhosModule from "npm:throwlhos";

export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async create(name: string, email: string, password: string) {
    const passwordHash = await hashPassword(password);

    const existingUser = await this.repository.findByEmail(email);

    if (existingUser) {
      throw throwlhosModule.default.err_conflict(
        "Email already registered",
      );
    }
    
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

  async updateMe(id: string, name: string, email: string) {
    const user = await this.repository.findById(id);
    const existingUser = await this.repository.findByEmail(email);

    if (existingUser) {
      throw throwlhosModule.default.err_conflict(
        "Email already registered",
      );
    }

    if (!user) {
      throw throwlhosModule.default.err_notFound(
        "User not found",
      );
    }

    return await this.repository.updateMe(
      id,
      name,
      email,
    );
  }
}