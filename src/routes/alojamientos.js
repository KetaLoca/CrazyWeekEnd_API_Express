import { Router } from "express";
import { AlojamientosController } from "../controllers/alojamientos.js";
import { authenticateToken } from '../middlewares/auth.js'

export const alojamientosRouter = Router()

alojamientosRouter.get("/", AlojamientosController.getAlojamientos)

alojamientosRouter.get("/:id", AlojamientosController.getAlojamientoById)

alojamientosRouter.post("/", authenticateToken, AlojamientosController.create)

alojamientosRouter.delete("/:id", authenticateToken, AlojamientosController.delete)