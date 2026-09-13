import { verifyPassword } from "../utils/password.ts";
import { generateToken } from "../utils/jwt.ts";
import type { IUserRepository } from "../repositories/user.repository.ts";
import throwlhosModule from "npm:throwlhos";

export interface IAuthService {
  login(email: string, password: string): Promise<{ token: string }>;
}

export class AuthService implements IAuthService {
  private repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  async login(email: string, password: string) {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw throwlhosModule.default.err_unauthorized(
        "Invalid email or password",
      );
    }

    const passwordIsValid = await verifyPassword(
      password,
      user.passwordHash,
    );

    if (!passwordIsValid) {
      throw throwlhosModule.default.err_unauthorized(
        "Invalid email or password",
      );
    }

    const token = await generateToken(user._id.toString());

    return { token };
  }
}