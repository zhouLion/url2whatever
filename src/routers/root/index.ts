import KoaRouter from 'koa-router';

export default function createRouter() {
  const router = new KoaRouter();
  router.get('/healthcheck', async (ctx) => {
    ctx.body = 'OK';
  });
  return router.routes();
}
