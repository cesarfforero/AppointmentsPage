import { env } from "./config/envs";
import { AppDataSource } from "./config/data-source";
import { logger } from "./utils/logger";

AppDataSource.initialize()
  .then(() => {
    logger.info("DB connected");
    const port = env.PORT;
    import("./server").then(({ app }) => {
      app.listen(port, () => logger.info(`API ready on http://localhost:${port}`));
    });
  })
  .catch((err) => {
    console.error("DB init error", err);
    process.exit(1);
  });
