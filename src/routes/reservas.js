import { Router } from "express";
import { ReservasController } from "../controllers/reservas.js";

export const reservasRouter = Router()

reservasRouter.get("/:id", ReservasController.getById)

reservasRouter.get("/:email", ReservasController.getByEmail)

reservasRouter.post("/", ReservasController.create)

reservasRouter.delete(":id", ReservasController.delete)