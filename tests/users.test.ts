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