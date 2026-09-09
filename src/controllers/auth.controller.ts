import type { Context } from "jsr:@oak/oak";

import { AuthService } from "../services/auth.service.ts";

const authService = new AuthService();

export async function login(ctx: Context) {
  const body = await ctx.request.body.json();

  const user = await authService.login(
    body.email,
    body.password,
  );

  const result = await authService.login(
    body.email,
    body.password,
);  

    ctx.response.status = 200;
    ctx.response.body = result;
}