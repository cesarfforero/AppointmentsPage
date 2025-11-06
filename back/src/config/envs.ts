import "dotenv/config";

const num = (v: string | undefined, d: number) => Number(v ?? d);
const bool = (v: string | undefined, d: boolean) => (v ?? `${d}`) === "true";

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: num(process.env.PORT, 3000),

  DB_HOST: process.env.DB_HOST ?? "127.0.0.1",
  DB_PORT: num(process.env.DB_PORT, 5432),
  DB_USERNAME: process.env.DB_USERNAME ?? "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD ?? "postgres",
  DB_DATABASE: process.env.DB_DATABASE ?? "pm3",

  DB_SYNCHRONIZE: bool(process.env.DB_SYNCHRONIZE, false),
  DB_DROP: bool(process.env.DB_DROP, false),

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET ?? "change_me",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET ?? "change_me",
  JWT_ACCESS_TTL: process.env.JWT_ACCESS_TTL ?? "15m",
  JWT_REFRESH_TTL: process.env.JWT_REFRESH_TTL ?? "7d",

  RATE_LIMIT_WINDOW_MS: num(process.env.RATE_LIMIT_WINDOW_MS, 60_000),
  RATE_LIMIT_MAX: num(process.env.RATE_LIMIT_MAX, 100),
} as const;
