import express from 'express';

import { createCard, getCards, getCardById, updateCard, deleteCard, deposit, charge } from "../controllers/card.controller.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";
 
const router = express.Router();
router.post("/cards", authMiddleware, createCard);
router.get("/cards", authMiddleware, getCards);
router.get("/cards/:id", authMiddleware, getCardById);
router.put("/cards/:id", authMiddleware, updateCard);
router.delete("/cards/:id", authMiddleware, deleteCard);

//Transaction
router.post("/cards/:id/deposit", authMiddleware, deposit);
router.post("/cards/:id/charge", authMiddleware, charge);

export default router;