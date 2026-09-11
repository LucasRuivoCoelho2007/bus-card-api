import express from "express";
import { CardService } from "../services/card.service.ts";

const cardService = new CardService();

export async function createCard(
  req: express.Request,
  res: express.Response,
) {
  const userId = req.userId;
  const body = req.body;

  const card = await cardService.create(
    userId,
    body.type,
  );

  res.send_created(card);
}

export async function getCards(
  req: express.Request,
  res: express.Response,
) {
  const userId = req.userId;

  const cards = await cardService.getCards(userId);

  res.send_ok(cards);
}

export async function getCardById(
  req: express.Request,
  res: express.Response,
) {
  const cardId = req.params.id;
  const userId = req.userId;

  const card = await cardService.getCardById(
    cardId,
    userId,
  );

  res.send_ok(card);
}

export async function updateCard(
  req: express.Request,
  res: express.Response,
) {
  const cardId = req.params.id;
  const userId = req.userId;
  const body = req.body;

  const card = await cardService.updateCard(
    cardId,
    userId,
    body.type,
  );

  res.send_ok(card);
}

export async function deleteCard(
  req: express.Request,
  res: express.Response,
) {
  const cardId = req.params.id;
  const userId = req.userId;

  await cardService.deleteCard(
    cardId,
    userId,
  );

  res.send_noContent();
}

export async function deposit(
  req: express.Request,
  res: express.Response,
) {
  const cardId = req.params.id;
  const userId = req.userId;
  const body = req.body;

  await cardService.deposit(
    cardId,
    userId,
    body.amount,
  );

  res.send_ok({
    message: "Deposit completed successfully",
  });
}

export async function charge(
  req: express.Request,
  res: express.Response,
) {
  const cardId = req.params.id;
  const userId = req.userId;

  await cardService.charge(
    cardId,
    userId,
  );

  res.send_ok({
    message: "Charge completed successfully",
  });
}