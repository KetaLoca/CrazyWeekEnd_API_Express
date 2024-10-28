import { Router } from "express";
import { UserController } from "../controllers/users.js";
import { authenticateToken } from '../middlewares/auth.js'

export const usersRouter = Router()

usersRouter.get("/:id", authenticateToken, UserController.getById)

usersRouter.post("/register", UserController.register)

usersRouter.post("/login", UserController.login)

usersRouter.post("/logout", UserController.logout)

usersRouter.patch("/:id", authenticateToken, UserController.update)

usersRouter.delete("/:id", authenticateToken, UserController.delete)