import { assertEquals } from "@std/assert";
import express from "express";

import { createCardController } from "../src/controllers/card.controller.ts";
import type { ICardService } from "../src/services/card.service.ts";

Deno.test("POST /cards - deve criar um cartão", async () => {
  const card = {
    _id: "card-id",
    user_id: "user-id",
    type: "student",
    balance: 0,
  };

  const cardService: ICardService = {
    create: () => Promise.resolve(card),
    getCards: () => Promise.resolve([]),
    getCardById: () => Promise.resolve(card),
    updateCard: () => Promise.resolve(card),
    deleteCard: () => Promise.resolve(),
    deposit: () => Promise.resolve(),
    charge: () => Promise.resolve(),
  };

  const cardController = createCardController(cardService);

  const req = {
    userId: "user-id",
    body: {
      type: "student",
    },
  } as express.Request;

  let response: unknown;

  const res = {
    send_created: (...args: unknown[]) => {
      response = args;
    },
  } as unknown as express.Response;

  await cardController.createCard(req, res);

  assertEquals(response, [card]);
});


Deno.test("GET /cards - deve retornar os cartões do usuário", async () => {
  const cards = [
    {
      _id: "card-1",
      user_id: "user-id",
      type: "student",
      balance: 20,
    },
    {
      _id: "card-2",
      user_id: "user-id",
      type: "standard",
      balance: 50,
    },
  ];

  const cardService: ICardService = {
    create: () => Promise.resolve(cards[0]),
    getCards: () => Promise.resolve(cards),
    getCardById: () => Promise.resolve(cards[0]),
    updateCard: () => Promise.resolve(cards[0]),
    deleteCard: () => Promise.resolve(),
    deposit: () => Promise.resolve(),
    charge: () => Promise.resolve(),
  };

  const cardController = createCardController(cardService);

  const req = {
    userId: "user-id",
  } as express.Request;

  let response: unknown;

  const res = {
    send_ok: (...args: unknown[]) => {
      response = args;
    },
  } as unknown as express.Response;

  await cardController.getCards(req, res);

  assertEquals(response, [cards]);
});


Deno.test("GET /cards/:id - deve retornar o cartão", async () => {
  const card = {
    _id: "card-id",
    user_id: "user-id",
    type: "student",
    balance: 20,
  };

  const cardService: ICardService = {
    create: () => Promise.resolve(card),
    getCards: () => Promise.resolve([card]),
    getCardById: () => Promise.resolve(card),
    updateCard: () => Promise.resolve(card),
    deleteCard: () => Promise.resolve(),
    deposit: () => Promise.resolve(),
    charge: () => Promise.resolve(),
  };

  const cardController = createCardController(cardService);

  const req = {
    userId: "user-id",
    params: {
      id: "507f1f77bcf86cd799439011",
    },
  } as express.Request;

  let response: unknown;

  const res = {
    send_ok: (...args: unknown[]) => {
      response = args;
    },
  } as unknown as express.Response;

  await cardController.getCardById(req, res);

  assertEquals(response, [card]);
});

Deno.test("GET /cards/:id - deve rejeitar ID inválido", async () => {
  const cardService: ICardService = {
    create: () => Promise.resolve(null),
    getCards: () => Promise.resolve([]),
    getCardById: () => Promise.resolve(null),
    updateCard: () => Promise.resolve(null),
    deleteCard: () => Promise.resolve(),
    deposit: () => Promise.resolve(),
    charge: () => Promise.resolve(),
  };

  const cardController = createCardController(cardService);

  const req = {
    userId: "user-id",
    params: {
      id: "id-invalido",
    },
  } as express.Request;

  let response: unknown;

  const res = {
    send_badRequest: (...args: unknown[]) => {
      response = args;
    },
  } as unknown as express.Response;

  await cardController.getCardById(req, res);

  assertEquals(response, ["Invalid card ID"]);
});

Deno.test("PUT /cards/:id - deve atualizar o cartão", async () => {
  const card = {
    _id: "card-id",
    user_id: "user-id",
    type: "standard",
    balance: 20,
  };

  const cardService: ICardService = {
    create: () => Promise.resolve(card),
    getCards: () => Promise.resolve([card]),
    getCardById: () => Promise.resolve(card),
    updateCard: () => Promise.resolve(card),
    deleteCard: () => Promise.resolve(),
    deposit: () => Promise.resolve(),
    charge: () => Promise.resolve(),
  };

  const cardController = createCardController(cardService);

  const req = {
    userId: "user-id",
    params: {
      id: "507f1f77bcf86cd799439011",
    },
    body: {
      type: "standard",
    },
  } as express.Request;

  let response: unknown;

  const res = {
    send_ok: (...args: unknown[]) => {
      response = args;
    },
  } as unknown as express.Response;

  await cardController.updateCard(req, res);

  assertEquals(response, [card]);
});


Deno.test("PUT /cards/:id - deve rejeitar tipo inválido", async () => {
  const cardService: ICardService = {
    create: () => Promise.resolve(null),
    getCards: () => Promise.resolve([]),
    getCardById: () => Promise.resolve(null),
    updateCard: () => Promise.resolve(null),
    deleteCard: () => Promise.resolve(),
    deposit: () => Promise.resolve(),
    charge: () => Promise.resolve(),
  };

  const cardController = createCardController(cardService);

  const req = {
    userId: "user-id",
    params: {
      id: "507f1f77bcf86cd799439011",
    },
    body: {
      type: "premium",
    },
  } as express.Request;

    let response: unknown[] = [];

    const res = {
    send_badRequest: (...args: unknown[]) => {
        response = args;
    },
    } as unknown as express.Response;

    await cardController.updateCard(req, res);

    assertEquals(response[0], "Invalid fields");
});


Deno.test("PUT /cards/:id - deve rejeitar ID inválido", async () => {
  const cardService: ICardService = {
    create: () => Promise.resolve(null),
    getCards: () => Promise.resolve([]),
    getCardById: () => Promise.resolve(null),
    updateCard: () => Promise.resolve(null),
    deleteCard: () => Promise.resolve(),
    deposit: () => Promise.resolve(),
    charge: () => Promise.resolve(),
  };

  const cardController = createCardController(cardService);

  const req = {
    userId: "user-id",
    params: {
      id: "id-invalido",
    },
    body: {
      type: "student",
    },
  } as express.Request;

  let response: unknown[] = [];

  const res = {
    send_badRequest: (...args: unknown[]) => {
      response = args;
    },
  } as unknown as express.Response;

  await cardController.updateCard(req, res);

  assertEquals(response, ["Invalid card ID"]);
});

Deno.test("DELETE /cards/:id - deve excluir o cartão", async () => {
  const cardService: ICardService = {
    create: () => Promise.resolve(null),
    getCards: () => Promise.resolve([]),
    getCardById: () => Promise.resolve(null),
    updateCard: () => Promise.resolve(null),
    deleteCard: () => Promise.resolve(),
    deposit: () => Promise.resolve(),
    charge: () => Promise.resolve(),
  };

  const cardController = createCardController(cardService);

  const req = {
    userId: "user-id",
    params: {
      id: "507f1f77bcf86cd799439011",
    },
  } as express.Request;

  let response = false;

  const res = {
    send_noContent: () => {
      response = true;
    },
  } as unknown as express.Response;

  await cardController.deleteCard(req, res);

  assertEquals(response, true);
});


Deno.test("DELETE /cards/:id - deve rejeitar ID inválido", async () => {
  const cardService: ICardService = {
    create: () => Promise.resolve(null),
    getCards: () => Promise.resolve([]),
    getCardById: () => Promise.resolve(null),
    updateCard: () => Promise.resolve(null),
    deleteCard: () => Promise.resolve(),
    deposit: () => Promise.resolve(),
    charge: () => Promise.resolve(),
  };

  const cardController = createCardController(cardService);

  const req = {
    userId: "user-id",
    params: {
      id: "id-invalido",
    },
  } as express.Request;

  let response: unknown[] = [];

  const res = {
    send_badRequest: (...args: unknown[]) => {
      response = args;
    },
  } as unknown as express.Response;

  await cardController.deleteCard(req, res);

  assertEquals(response, ["Invalid card ID"]);
});

Deno.test("POST /cards/:id/deposit - deve realizar depósito", async () => {
  const cardService: ICardService = {
    create: () => Promise.resolve(null),
    getCards: () => Promise.resolve([]),
    getCardById: () => Promise.resolve(null),
    updateCard: () => Promise.resolve(null),
    deleteCard: () => Promise.resolve(),
    deposit: () => Promise.resolve(),
    charge: () => Promise.resolve(),
  };

  const cardController = createCardController(cardService);

  const req = {
    userId: "user-id",
    params: {
      id: "507f1f77bcf86cd799439011",
    },
    body: {
      amount: 20,
    },
  } as express.Request;

  let response: unknown[] = [];

  const res = {
    send_ok: (...args: unknown[]) => {
      response = args;
    },
  } as unknown as express.Response;

  await cardController.deposit(req, res);

  assertEquals(response, [
    {
      message: "Deposit completed successfully",
    },
  ]);
});

Deno.test("POST /cards/:id/deposit - deve rejeitar valor inválido", async () => {
  const cardService: ICardService = {
    create: () => Promise.resolve(null),
    getCards: () => Promise.resolve([]),
    getCardById: () => Promise.resolve(null),
    updateCard: () => Promise.resolve(null),
    deleteCard: () => Promise.resolve(),
    deposit: () => Promise.resolve(),
    charge: () => Promise.resolve(),
  };

  const cardController = createCardController(cardService);

  const req = {
    userId: "user-id",
    params: {
      id: "507f1f77bcf86cd799439011",
    },
    body: {
      amount: 0,
    },
  } as express.Request;

  let response: unknown[] = [];

  const res = {
    send_badRequest: (...args: unknown[]) => {
      response = args;
    },
  } as unknown as express.Response;

  await cardController.deposit(req, res);

  assertEquals(response[0], "Invalid fields");
});


Deno.test("POST /cards/:id/charge - deve realizar cobrança", async () => {
  const cardService: ICardService = {
    create: () => Promise.resolve(null),
    getCards: () => Promise.resolve([]),
    getCardById: () => Promise.resolve(null),
    updateCard: () => Promise.resolve(null),
    deleteCard: () => Promise.resolve(),
    deposit: () => Promise.resolve(),
    charge: () => Promise.resolve(),
  };

  const cardController = createCardController(cardService);

  const req = {
    userId: "user-id",
    params: {
      id: "507f1f77bcf86cd799439011",
    },
  } as express.Request;

  let response: unknown[] = [];

  const res = {
    send_ok: (...args: unknown[]) => {
      response = args;
    },
  } as unknown as express.Response;

  await cardController.charge(req, res);

  assertEquals(response, [
    {
      message: "Charge completed successfully",
    },
  ]);
});


Deno.test("POST /cards/:id/charge - deve rejeitar ID inválido", async () => {
  const cardService: ICardService = {
    create: () => Promise.resolve(null),
    getCards: () => Promise.resolve([]),
    getCardById: () => Promise.resolve(null),
    updateCard: () => Promise.resolve(null),
    deleteCard: () => Promise.resolve(),
    deposit: () => Promise.resolve(),
    charge: () => Promise.resolve(),
  };

  const cardController = createCardController(cardService);

  const req = {
    userId: "user-id",
    params: {
      id: "id-invalido",
    },
  } as express.Request;

  let response: unknown[] = [];

  const res = {
    send_badRequest: (...args: unknown[]) => {
      response = args;
    },
  } as unknown as express.Response;

  await cardController.charge(req, res);

  assertEquals(response[0], "Invalid card ID");
});

