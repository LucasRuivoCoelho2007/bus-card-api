import type { Context, Next } from "jsr:@oak/oak";
import { verifyToken } from "../utils/jwt.ts";

export async function authMiddleware(
  ctx: Context,
  next: Next,
) {
  const authorization = ctx.request.headers.get("Authorization");

  if (!authorization) {
    ctx.response.status = 401;
    ctx.response.body = {
      error: "Authorization header required",
    };
    return;
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    ctx.response.status = 401;
    ctx.response.body = {
      error: "Bearer token required",
    };
    return;
  }

  try {
    const userId = await verifyToken(token);

    ctx.state.userId = userId;

    await next();
  } catch {
    ctx.response.status = 401;
    ctx.response.body = {
      error: "Invalid or expired token",
    };
  }
}