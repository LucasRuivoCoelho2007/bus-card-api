import express from "express";
import { verifyToken } from "../utils/jwt.ts";
import throwlhosModule from "npm:throwlhos";

export async function authMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw throwlhosModule.default.err_unauthorized(
      "Authorization header required",
    );
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw throwlhosModule.default.err_unauthorized(
      "Bearer token required",
    );
  }

  try {
    const userId = await verifyToken(token);

    req.userId = userId;

    next();
  } catch {
    throw throwlhosModule.default.err_unauthorized(
      "Invalid or expired token",
    );
  }
}