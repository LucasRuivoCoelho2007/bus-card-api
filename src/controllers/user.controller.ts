import express from "express";
import { UserService } from "../services/user.service.ts";

const userService = new UserService();

export async function createUser(
  req: express.Request,
  res: express.Response,
) {
  const body = req.body;

  const user = await userService.create(
    body.name,
    body.email,
    body.password,
  );

  res.send_created({
    _id: user._id,
    name: user.name,
    email: user.email,
  });

}

export async function getMe(
  req: express.Request,
  res: express.Response,
) {
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

export async function updateMe(
  req: express.Request,
  res: express.Response,
) {
  const userId = req.userId;

  const body = req.body;

  const user = await userService.updateMe(
    userId,
    body.name,
    body.email,
  );

  res.send_ok({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
}