import mongoose from "npm:mongoose";

import { assertEquals } from "@std/assert";
import express from "express";
import type { IUser } from "../src/models/user.ts";
import type { IUserRepository } from "../src/repositories/user.repository.ts";

import { UserService } from "../src/services/user.service.ts";
import { createUserController } from "../src/controllers/user.controller.ts";


Deno.test("POST /users - deve criar usuário", async () => {
    const userRepository: IUserRepository = {
        findByEmail: () => Promise.resolve(null),
        create: (user: IUser) => Promise.resolve(user),
        findById: () => Promise.resolve(null),
        updateMe: () => Promise.resolve(null),
    };
    const userService = new UserService(userRepository);
    const userController = createUserController(userService);
    const req = {
        body: {
            name: "Lucas",
            email: "lucas@email.com",
            password: "123456",
        },
    } as express.Request;

    const res = {
        send_created: (...args: unknown[]) => {
            return args;
        },
    } as unknown as express.Response;

  await userController.createUser(req, res);

  assertEquals(true, true);
});

Deno.test("POST /users - deve rejeitar senha inválida", async () => {
  const userRepository: IUserRepository = {
    findByEmail: () => Promise.resolve(null),
    create: (user: IUser) => Promise.resolve(user),
    findById: () => Promise.resolve(null),
    updateMe: () => Promise.resolve(null),
  };

  const userService = new UserService(userRepository);
  const userController = createUserController(userService);

  const req = {
    body: {
      name: "Lucas",
      email: "lucas@email.com",
      password: "123",
    },
  } as express.Request;

  let response: unknown;

  const res = {
    send_badRequest: (...args: unknown[]) => {
      response = args;
    },
  } as unknown as express.Response;

  await userController.createUser(req, res);

  assertEquals(response, [
    "Invalid fields",
    [
      {
        field: "password",
        message: "Password must have at least 6 characters",
      },
    ],
  ]);
});

Deno.test("GET /users/me - deve retornar usuário", async () => {
  const user: IUser = {
    _id: new mongoose.Types.ObjectId(),
    name: "Lucas",
    email: "lucas@email.com",
    passwordHash: "hash",
  };

  const userRepository: IUserRepository = {
    findByEmail: () => Promise.resolve(null),
    create: (user: IUser) => Promise.resolve(user),
    findById: () => Promise.resolve(user),
    updateMe: () => Promise.resolve(null),
  };

  const userService = new UserService(userRepository);
  const userController = createUserController(userService);

  const req = {
    userId: user._id.toString(),
  } as express.Request;

  let response: unknown;

  const res = {
    send_ok: (...args: unknown[]) => {
      response = args;
    },
  } as unknown as express.Response;

  await userController.getMe(req, res);

  assertEquals(response, [
    {
      _id: user._id,
      name: "Lucas",
      email: "lucas@email.com",
    },
  ]);
});

Deno.test("GET /users/me - deve retornar 404 se usuário não existir", async () => {
  const userRepository: IUserRepository = {
    findByEmail: () => Promise.resolve(null),
    create: (user: IUser) => Promise.resolve(user),
    findById: () => Promise.resolve(null),
    updateMe: () => Promise.resolve(null),
  };

  const userService = new UserService(userRepository);
  const userController = createUserController(userService);

  const req = {
    userId: new mongoose.Types.ObjectId().toString(),
  } as express.Request;

  let response: unknown;

  const res = {
    send_notFound: (...args: unknown[]) => {
      response = args;
    },
  } as unknown as express.Response;

  await userController.getMe(req, res);

  assertEquals(response, ["User not found"]);
});

Deno.test("PUT /users/me - deve atualizar usuário", async () => {
  const userId = new mongoose.Types.ObjectId();

  const user: IUser = {
    _id: userId,
    name: "Lucas",
    email: "lucas@email.com",
    passwordHash: "hash",
  };

  const updatedUser: IUser = {
    ...user,
    name: "Lucas Silva",
    email: "lucassilva@email.com",
  };

  const userRepository: IUserRepository = {
    findByEmail: () => Promise.resolve(null),
    create: (user: IUser) => Promise.resolve(user),
    findById: () => Promise.resolve(user),
    updateMe: () => Promise.resolve(updatedUser),
  };

  const userService = new UserService(userRepository);
  const userController = createUserController(userService);

  const req = {
    userId: userId.toString(),
    body: {
      name: "Lucas Silva",
      email: "lucassilva@email.com",
    },
  } as express.Request;

  let response: unknown;

  const res = {
    send_ok: (...args: unknown[]) => {
      response = args;
    },
  } as unknown as express.Response;

  await userController.updateMe(req, res);

  assertEquals(response, [
    "User updated successfully",
    {
      _id: userId,
      name: "Lucas Silva",
      email: "lucassilva@email.com",
    },
  ]);
});

Deno.test("PUT /users/me - deve rejeitar nome inválido", async () => {
  const userRepository: IUserRepository = {
    findByEmail: () => Promise.resolve(null),
    create: (user: IUser) => Promise.resolve(user),
    findById: () => Promise.resolve(null),
    updateMe: () => Promise.resolve(null),
  };

  const userService = new UserService(userRepository);
  const userController = createUserController(userService);

  const req = {
    userId: new mongoose.Types.ObjectId().toString(),
    body: {
      name: "L",
      email: "lucas@email.com",
    },
  } as express.Request;

  let response: unknown;

  const res = {
    send_badRequest: (...args: unknown[]) => {
      response = args;
    },
  } as unknown as express.Response;

  await userController.updateMe(req, res);

  assertEquals(response, [
    "Invalid fields",
    [
      {
        field: "name",
        message: "Invalid name",
      },
    ],
  ]);
});

Deno.test("PUT /users/me - deve retornar 404 se usuário não existir", async () => {
  const userRepository: IUserRepository = {
    findByEmail: () => Promise.resolve(null),
    create: (user: IUser) => Promise.resolve(user),
    findById: () => Promise.resolve(null),
    updateMe: () => Promise.resolve(null),
  };

  const userService = new UserService(userRepository);
  const userController = createUserController(userService);

  const req = {
    userId: new mongoose.Types.ObjectId().toString(),
    body: {
      name: "Lucas Silva",
      email: "lucassilva@email.com",
    },
  } as express.Request;

  const res = {} as express.Response;

  let error: unknown;

  try {
    await userController.updateMe(req, res);
  } catch (err) {
    error = err;
  }

  assertEquals(error, {
    code: 404,
    status: "NOT_FOUND",
    message: "User not found",
  });
});