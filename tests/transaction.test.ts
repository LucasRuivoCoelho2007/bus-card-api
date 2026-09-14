import express from "express";
import { assertEquals } from "@std/assert";
import {
  createTransactionController,
} from "../src/controllers/transaction.controller.ts";

Deno.test("GET /transactions - deve retornar transações", async () => {
  const transactions = [
    {
      _id: "transaction-1",
      card_id: "card-1",
      amount: 10,
      status: "completed",
    },
  ];

  const transactionService = {
    getTransactionsByUser: () => Promise.resolve(transactions),
    getTransactionsByCard: () => Promise.resolve([]),
  };

  const transactionController = createTransactionController(
    transactionService as any,
  );

  const req = {
    userId: "user-id",
  } as express.Request;

  let response: unknown[] = [];

  const res = {
    send_ok: (...args: unknown[]) => {
      response = args;
    },
  } as unknown as express.Response;

  await transactionController.getTransactions(req, res);

  assertEquals(response, [transactions]);
});

Deno.test(
  "GET /transactions - deve propagar erro do service",
  async () => {
    const transactionService = {
      getTransactionsByUser: () =>
        Promise.reject(new Error("Error fetching transactions")),
      getTransactionsByCard: () => Promise.resolve([]),
    };

    const transactionController = createTransactionController(
      transactionService as any,
    );

    const req = {
      userId: "user-id",
    } as express.Request;

    const res = {} as express.Response;

    try {
      await transactionController.getTransactions(req, res);
    } catch (error) {
      assertEquals(
        (error as Error).message,
        "Error fetching transactions",
      );
    }
  },
);


Deno.test(
  "GET /transactions/card/:cardId - deve retornar transações do cartão",
  async () => {
    const transactions = [
      {
        _id: "transaction-1",
        card_id: "card-1",
        amount: 10,
        status: "completed",
      },
    ];

    const transactionService = {
      getTransactionsByUser: () => Promise.resolve([]),
      getTransactionsByCard: () => Promise.resolve(transactions),
    };

    const transactionController = createTransactionController(
      transactionService as any,
    );

    const req = {
      userId: "user-id",
      params: {
        cardId: "card-id",
      },
    } as express.Request;

    let response: unknown[] = [];

    const res = {
      send_ok: (...args: unknown[]) => {
        response = args;
      },
    } as unknown as express.Response;

    await transactionController.getTransactionsByCard(req, res);

    assertEquals(response, [transactions]);
  },
);

Deno.test(
  "GET /transactions/card/:cardId - deve propagar erro do service",
  async () => {
    const transactionService = {
      getTransactionsByUser: () => Promise.resolve([]),
      getTransactionsByCard: () =>
        Promise.reject(new Error("Card not found")),
    };

    const transactionController = createTransactionController(
      transactionService as any,
    );

    const req = {
      userId: "user-id",
      params: {
        cardId: "card-id",
      },
    } as express.Request;

    const res = {} as express.Response;

    try {
      await transactionController.getTransactionsByCard(req, res);
    } catch (error) {
      assertEquals(
        (error as Error).message,
        "Card not found",
      );
    }
  },
);