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

export async function getMe(ctx: Context) {
  const userId = ctx.state.userId;

  const user = await userService.findById(userId);

  if (!user) {
    ctx.response.status = 404;
    ctx.response.body = {
      error: "User not found",
    };
    return;
  }

  ctx.response.status = 200;
  ctx.response.body = {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
}

export async function updateMe(ctx: Context) {
  const userId = ctx.state.userId;

  const body = await ctx.request.body.json();

  const user = await userService.updateMe(
    userId,
    body.name,
    body.email,
  );

  ctx.response.status = 200;
  ctx.response.body = {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
}