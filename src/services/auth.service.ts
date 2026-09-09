import { verifyPassword } from "../utils/password.ts";
import { generateToken } from "../utils/jwt.ts";
import { UserRepository } from "../repositories/user.repository.ts";

export class AuthService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async login(email: string, password: string) {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const passwordIsValid = await verifyPassword(
      password,
      user.passwordHash,
    );

    if (!passwordIsValid) {
      throw new Error("Invalid email or password");
    }

    const token = await generateToken(user._id.toString());

    return { token };
  }
}