import { Router } from "express";
import { ReservasController } from "../controllers/reservas";

export const reservasRouter = Router()

reservasRouter.get("/:email", ReservasController.getByEmail)

reservasRouter.post("/", ReservasController.create)

reservasRouter.delete(":id", ReservasController.delete)