import type { Context } from "jsr:@oak/oak";

import { CardService } from "../services/card.service.ts";

const cardService = new CardService();

export async function createCard(ctx: Context) {
  const userId = ctx.state.userId;
  const body = await ctx.request.body.json();
  
  const card = await cardService.create(
    userId,
    body.type,
  );

  ctx.response.status = 201;
  ctx.response.body = card;
}

export async function getCards(ctx: Context) {
  const userId = ctx.state.userId;
  const cards = await cardService.getCards(userId);

  ctx.response.body = cards;
}

export async function getCardById(ctx: Context) {
  const cardId = ctx.params.id;
  const userId = ctx.state.userId;

  const card = await cardService.getCardById(cardId, userId);
  ctx.response.body = card;
}

export async function updateCard(ctx: Context) {
  const cardId = ctx.params.id;
  const userId = ctx.state.userId;
  const body = await ctx.request.body.json();

  const card = await cardService.updateCard(
    cardId,
    userId,
    body.type,
  ); 
   ctx.response.body = card;
}

export async function deleteCard(ctx: Context) {
  const cardId = ctx.params.id;
  const userId = ctx.state.userId;
  await cardService.deleteCard(cardId, userId);
  ctx.response.status = 204;
}

export async function deposit(ctx: Context) {
  const cardId = ctx.params.id;
  const userId = ctx.state.userId;

  const body = await ctx.request.body.json();
  const amount = body.amount;

  await cardService.deposit(
    cardId,
    userId,
    amount,
  );

  ctx.response.status = 200;
  ctx.response.body = {
    message: "Deposit completed successfully",
  };
}