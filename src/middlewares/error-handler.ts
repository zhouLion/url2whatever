import { Context, Next } from 'koa';
import { IMiddleware } from 'koa-router';
import { Logger } from 'pino';
import { AppError } from '../errors';

const httpCodes = {
  10000: 500,
  20000: 404,
  30000: 400,
  30001: 400,
  30002: 401,
  30003: 403,
} as { [key: string]: number };

export function errorHandler(logger: Logger): IMiddleware {
  return async (ctx: Context, next: Next) => {
    try {
      await next();
    } catch (err) {
      logger.error('Error Handler:', err);

      if (err instanceof AppError) {
        ctx.body = err.toModel();
        if (err && err.code && Object.keys(httpCodes).includes((err.code as number).toString())) {
          ctx.status = httpCodes[(err.code).toString()];
        } else {
          ctx.status = 500;
        }
      } else {
        ctx.body = new AppError(10000, 'Internal Error Server').toModel();
        ctx.status = 500;
      }
    }
  };
}
