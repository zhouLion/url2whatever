import { Middleware } from "koa";
import pino from "pino";

const console = pino();

export function logger(): Middleware {
  return async (ctx, next) => {
    const start = new Date();
    console.info('Request:', `${ctx.method} ${ctx.url} - starts at ${start.toJSON()}`);
    await next();
    const ms = new Date().getTime() - start.getTime();
    console.info('Response:', `${ctx.method} ${ctx.url} - ${ms}ms`);
  }
}
