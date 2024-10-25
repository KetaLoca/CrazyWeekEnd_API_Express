import { Router } from "express";
import { UserController } from "../controllers/users.js";

export const usersRouter = Router()

usersRouter.get("/:id", UserController.getById)

usersRouter.post("/register", UserController.register)

usersRouter.post("/login", UserController.login)

usersRouter.patch("/:id", UserController.update)

usersRouter.delete("/:id", UserController.delete)