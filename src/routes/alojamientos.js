import { Router } from "express";
import { AlojamientosController } from "../controllers/alojamientos.js";

export const alojamientosRouter = Router()

alojamientosRouter.get("/", AlojamientosController.getAlojamientos)

alojamientosRouter.get("/:id", AlojamientosController.getAlojamientoById)

alojamientosRouter.post("/", AlojamientosController.create)

alojamientosRouter.delete("/:id", AlojamientosController.delete)