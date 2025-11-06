"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const validate_1 = require("../middlewares/validate");
const userSchemas_1 = require("../schemas/userSchemas");
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter.get("/", userController_1.getUsersCtrl);
exports.usersRouter.get("/:id", userController_1.getUserByIdCtrl);
exports.usersRouter.post("/register", (0, validate_1.validate)(userSchemas_1.registerSchema), userController_1.registerCtrl);
exports.usersRouter.post("/login", (0, validate_1.validate)(userSchemas_1.loginSchema), userController_1.loginCtrl);
//# sourceMappingURL=usersRouter.js.map