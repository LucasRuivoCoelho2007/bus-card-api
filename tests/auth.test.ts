import { assertEquals } from "@std/assert";
import express from "express";

import { createAuthController } from "../src/controllers/auth.controller.ts";

Deno.test("POST /auth/login - deve fazer login com sucesso", async () => {
  const authService = {
    login: () => Promise.resolve({ token: "fake-token" }),
  };

  const authController = createAuthController(authService);

  const req = {
    body: {
      email: "lucas@email.com",
      password: "123456",
    },
  } as express.Request;

  let response: unknown;

  const res = {
    send_ok: (...args: unknown[]) => {
      response = args;
    },
  } as unknown as express.Response;

  await authController.login(req, res);

  assertEquals(response, [{ token: "fake-token" }]);
});


Deno.test("POST /auth/login - deve rejeitar credenciais inválidas", async () => {
  const authService = {
    login: () => {
      throw new Error("Invalid email or password");
    },
  };

  const authController = createAuthController(authService);

  const req = {
    body: {
      email: "lucas@email.com",
      password: "senha-errada",
    },
  } as express.Request;

  const res = {} as express.Response;

  let error: unknown;

  try {
    await authController.login(req, res);
  } catch (err) {
    error = err;
  }

  assertEquals(
    (error as Error).message,
    "Invalid email or password",
  );
});

