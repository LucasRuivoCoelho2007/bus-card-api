import express from 'express';

import { CardService } from "../services/card.service.ts";
import { createCardController } from "../controllers/card.controller.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";


const cardService = new CardService();
const cardController = createCardController(cardService);
 
const router = express.Router();
router.post("/cards", authMiddleware, cardController.createCard);
router.get("/cards", authMiddleware, cardController.getCards);
router.get("/cards/:id", authMiddleware, cardController.getCardById);
router.put("/cards/:id", authMiddleware, cardController.updateCard);
router.delete("/cards/:id", authMiddleware, cardController.deleteCard);

//Transaction
router.post("/cards/:id/deposit", authMiddleware, cardController.deposit);
router.post("/cards/:id/charge", authMiddleware, cardController.charge);

export default router;