"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const express_1 = require("express");
const usersRouter_1 = require("./usersRouter");
const appointmentsRouter_1 = require("./appointmentsRouter");
exports.appRouter = (0, express_1.Router)();
exports.appRouter.use("/users", usersRouter_1.usersRouter);
exports.appRouter.use("/appointments", appointmentsRouter_1.appointmentsRouter);
//# sourceMappingURL=routers.js.map