import dotenv from "dotenv";
import Koa from "koa";
import koaBody from "koa-body";
import koaServer from "koa-static";
import { koaSwagger } from "koa2-swagger-ui";
import pino from "pino";
import { AppConfig } from "./koa-shims";
import { errorHandler } from "./middlewares";

import rootRouter from "./routers/root";
import outputRouter from "./routers/output";

dotenv.config();

function ensureConfig(config: Partial<AppConfig>): Partial<AppConfig>  {
  return {
    port: config.port || 3000,
    chromePath: config.chromePath || process.env.PPTR_EXECUTABLE
  }
}

export function createApp(config: Partial<AppConfig>) {
  const app = new Koa();
  const logger = pino({
    level: "info",
  });

  const ensuredConfig = ensureConfig(config);

  app.use(koaBody());

  app.use(async (ctx, next) => {
    ctx.state.config = ensuredConfig;
    await next();
  });

  app.use(errorHandler(logger));

  app.use(rootRouter());

  app.use(outputRouter());

  app.use(koaServer('public'));

  app.use(
    koaSwagger({
      routePrefix: '/swagger',
      swaggerOptions: {
        url: '/swagger.yml'
      }
    })
  );

  app.listen(ensuredConfig.port, () => {
    console.log(`🚀 Server running on port localhost:${ensuredConfig.port}~ 😊`);
  });

  return app;
}
