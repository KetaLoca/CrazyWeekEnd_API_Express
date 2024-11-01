import { Router } from "express";
import { ReservasController } from "../controllers/reservas.js";
import { authenticateToken } from '../middlewares/auth.js'

export const reservasRouter = Router()

reservasRouter.get("/:id", authenticateToken, ReservasController.getById)

reservasRouter.get("/", authenticateToken, ReservasController.getAll)

reservasRouter.post("/", authenticateToken, ReservasController.create)

reservasRouter.delete("/:id", authenticateToken, ReservasController.delete)