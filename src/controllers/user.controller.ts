import express from "express";
import { UserService } from "../services/user.service.ts";
import requestCheckModule from "npm:request-check";
import isness from "@zarco/isness";
import { email, name } from "@zarco/isness";


export function createUserController(userService: UserService) {

  async function createUser(req: express.Request, res: express.Response) {
    const body = req.body;

    const rc = requestCheckModule.default();

    rc.addRule("name", {
      validator: (value: unknown) => typeof value === "string" && name(value),
      message: "Invalid name",
    });

    rc.addRule("email", {
      validator: (value: unknown) =>
        typeof value === "string" && isness.email(value),
      message: "Invalid email",
    });

    rc.addRule("password", {
      validator: (value: unknown) =>
        typeof value === "string" && value.length >= 6,
      message: "Password must have at least 6 characters",
    });

    const errors = rc.check(
      { name: body.name },
      { email: body.email },
      { password: body.password },
    );

    if (errors) {
      res.send_badRequest("Invalid fields", errors);
      return;
    }

    const user = await userService.create(
      body.name,
      body.email,
      body.password,
    );

    res.send_created("User created successfully", {
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  }
  async function getMe(req: express.Request, res: express.Response) {
    const userId = req.userId;

    const user = await userService.findById(userId);

    if (!user) {
      res.send_notFound("User not found");
      return;
    }

    res.send_ok({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  }


  async function updateMe(req: express.Request, res: express.Response) {
    const userId = req.userId;
    const body = req.body;

    const rc = requestCheckModule.default();


    rc.addRule("name", {
      validator: (value: unknown) => typeof value === "string" && name(value),
      message: "Invalid name",
    });

    rc.addRule("email", {
      validator: (value: unknown) =>
        typeof value === "string" && isness.email(value),
      message: "Invalid email",
    });

    const errors = rc.check(
      { name: body.name },
      { email: body.email },
    );

    if (errors) {
      res.send_badRequest("Invalid fields", errors);
      return;
    }

    const user = await userService.updateMe(
      userId,
      body.name,
      body.email,
    );
    
    if (!user) {
      res.send_notFound("User not found");
      return;
    }

    res.send_ok("User updated successfully", {
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  }
    return {
    createUser,
    getMe,
    updateMe,
  };

}