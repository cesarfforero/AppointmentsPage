import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { httpLogger } from "./utils/logger";
import { appRouter } from "./routes/routers";
import { env } from "./config/envs";
import { errorHandler } from "./middlewares/error";

export const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(
    rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX,
    standardHeaders: true,
    legacyHeaders: false,
    })
);
app.use(httpLogger);

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use(appRouter);

app.use(errorHandler);
