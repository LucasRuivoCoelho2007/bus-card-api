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

  res.status(201).json(card);
}

export async function getCards(
  req: express.Request,
  res: express.Response,
) {
  const userId = req.userId;

  const cards = await cardService.getCards(userId);

  res.status(200).json(cards);
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

  res.status(200).json(card);
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

  res.status(200).json(card);
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

  res.status(204).send();
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

  res.status(200).json({
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

  res.status(200).json({
    message: "Charge completed successfully",
  });
}