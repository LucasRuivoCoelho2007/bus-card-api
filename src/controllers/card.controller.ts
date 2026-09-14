import express from "express";

import type { ICardService } from "../services/card.service.ts";

import requestCheckModule from "npm:request-check";
import { objectId } from "@zarco/isness";

export function createCardController(cardService: ICardService) {
  async function createCard(
    req: express.Request,
    res: express.Response,
  ) {
    const userId = req.userId;
    const body = req.body;

    const rc = requestCheckModule.default();

    rc.addRule("type", {
      validator: (value: unknown) =>
        value === "student" || value === "standard",
      message: "Card type must be 'student' or 'standard'",
    });

    const errors = rc.check({
      type: req.body.type,
    });

    if (errors) {
      res.send_badRequest("Invalid fields", errors);
      return;
    }

    const card = await cardService.create(
      userId,
      body.type,
    );

    res.send_created(card);
  }

  async function getCards(
    req: express.Request,
    res: express.Response,
  ) {
    const userId = req.userId;

    const cards = await cardService.getCards(userId);

    res.send_ok(cards);
  }

  async function getCardById(
    req: express.Request,
    res: express.Response,
  ) {
    const cardId = req.params.id;
    const userId = req.userId;

    if (!objectId(cardId)) {
      res.send_badRequest("Invalid card ID");
      return;
    }

    const card = await cardService.getCardById(
      cardId,
      userId,
    );

    res.send_ok(card);
  }

  async function updateCard(
    req: express.Request,
    res: express.Response,
  ) {
    const cardId = req.params.id;
    const userId = req.userId;
    const body = req.body;

    const rc = requestCheckModule.default();

    rc.addRule("type", {
      validator: (value: unknown) =>
        value === "student" || value === "standard",
      message: "Card type must be 'student' or 'standard'",
    });

    const errors = rc.check({
      type: body.type,
    });

    if (errors) {
      res.send_badRequest("Invalid fields", errors);
      return;
    }

    if (!objectId(cardId)) {
      res.send_badRequest("Invalid card ID");
      return;
    }

    const card = await cardService.updateCard(
      cardId,
      userId,
      body.type,
    );

    res.send_ok(card);
  }

  async function deleteCard(
    req: express.Request,
    res: express.Response,
  ) {
    const cardId = req.params.id;
    const userId = req.userId;

    if (!objectId(cardId)) {
      res.send_badRequest("Invalid card ID");
      return;
    }

    await cardService.deleteCard(
      cardId,
      userId,
    );

    res.send_noContent();
  }

  async function deposit(
    req: express.Request,
    res: express.Response,
  ) {
    const cardId = req.params.id;
    const userId = req.userId;
    const body = req.body;

    const rc = requestCheckModule.default();

    rc.addRule("amount", {
      validator: (value: unknown) =>
        typeof value === "number" && value > 0,
      message: "Amount must be greater than zero",
    });

    const errors = rc.check({
      amount: body.amount,
    });

    if (errors) {
      res.send_badRequest("Invalid fields", errors);
      return;
    }

    await cardService.deposit(
      cardId,
      userId,
      body.amount,
    );

    res.send_ok({
      message: "Deposit completed successfully",
    });
  }

  async function charge(
    req: express.Request,
    res: express.Response,
  ) {
    const cardId = req.params.id;
    const userId = req.userId;

    if (!objectId(cardId)) {
      res.send_badRequest("Invalid card ID");
      return;
    }

    await cardService.charge(
      cardId,
      userId,
    );

    res.send_ok({
      message: "Charge completed successfully",
    });
  }

  return {
    createCard,
    getCards,
    getCardById,
    updateCard,
    deleteCard,
    deposit,
    charge,
  };
}

