import {Router} from "jsr:@oak/oak";

import { createCard, getCards, getCardById, updateCard, deleteCard, deposit } from "../controllers/card.controller.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";
 
const router = new Router();

router.post("/cards", authMiddleware, createCard);
router.get("/cards", authMiddleware, getCards);
router.get("/cards/:id", authMiddleware, getCardById);
router.put("/cards/:id", authMiddleware, updateCard);
router.delete("/cards/:id", authMiddleware, deleteCard);

//Transaction
router.post("/cards/:id/deposit", authMiddleware, deposit);

export default router;