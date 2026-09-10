import express from "express";
import { verifyToken } from "../utils/jwt.ts";

export async function authMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    res.status(401).json({
      error: "Authorization header required",
    });
    return;
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    res.status(401).json({
      error: "Bearer token required",
    });
    return;
  }

  try {
    const userId = await verifyToken(token);

    req.userId = userId;

    next();
  } catch {
    res.status(401).json({
      error: "Invalid or expired token",
    });
  }
}