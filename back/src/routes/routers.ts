import { Router } from "express";
import { usersRouter } from "./usersRouter";
import { appointmentsRouter } from "./appointmentsRouter";

export const appRouter = Router();
appRouter.use("/users", usersRouter);
appRouter.use("/appointments", appointmentsRouter);
