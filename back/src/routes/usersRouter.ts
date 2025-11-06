import { Router } from "express";
import { getUserByIdCtrl, getUsersCtrl, loginCtrl, registerCtrl } from "../controllers/userController";
import { validate } from "../middlewares/validate";
import { loginSchema, registerSchema } from "../schemas/userSchemas";

export const usersRouter = Router();

usersRouter.get("/", getUsersCtrl);
usersRouter.get("/:id", getUserByIdCtrl);
usersRouter.post("/register", validate(registerSchema), registerCtrl);
usersRouter.post("/login", validate(loginSchema), loginCtrl);
