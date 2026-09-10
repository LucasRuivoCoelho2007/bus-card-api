import express from "express";
import { AuthService } from "../services/auth.service.ts";

const authService = new AuthService();

export async function login(req: express.Request, res: express.Response) {
  const body = req.body;

  const result = await authService.login(
    body.email,
    body.password,
  );

  res.status(200).json(result);
}