import { Middleware } from 'koa';
import pino from 'pino';

const console = pino();

const cacheMap = new Map<string, any>();

const getCacheKey = (path: string, query = {}) => {
  let result = path;
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      result += `@${key}-${value}`;
    });
  }
  return result;
};

export function cacheBody(_options: { prefix?: string } = { prefix: '' }): Middleware {
  return async (ctx, next) => {
    const cacheKey = getCacheKey(ctx.request.path, ctx.request.query);

    const cacheValue = cacheMap.get(cacheKey);
    if (cacheValue) {
      console.info('CACHE KEY', cacheKey);
      console.info('CACHE 🎯', 'Hit content from cacheMap!!!! ');
      ctx.body = cacheValue;
    } else {
      await next();
      console.info('CACHE SAVE', cacheKey);
      cacheMap.set(cacheKey, ctx.body);
    }
  };
}
