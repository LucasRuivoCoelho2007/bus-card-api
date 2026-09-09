import type { Context } from "jsr:@oak/oak";
import { UserService } from "../services/user.service.ts";

const userService = new UserService();

export async function createUser(ctx: Context) {
  const body = await ctx.request.body.json();

  const user = await userService.create(
    body.name,
    body.email,
    body.password
  );

  ctx.response.status = 201;
  ctx.response.body = {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
}