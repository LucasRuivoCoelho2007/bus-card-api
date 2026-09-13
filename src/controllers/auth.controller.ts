import express from "express";
import type { IAuthService } from "../services/auth.service.ts";

export function createAuthController(authService: IAuthService) {

  async function login(req: express.Request, res: express.Response) {
    const body = req.body;

    const result = await authService.login(
      body.email,
      body.password,
    );

    res.send_ok(result);
  }

  return {login}
}