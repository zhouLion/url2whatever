import KoaRouter from 'koa-router';
import { createController } from './controller';
import { pdfSchema, screenshotSchema } from './validator';
import { validate, cacheBody, logger } from '../../middlewares';

export default function createRouter() {
  const router = new KoaRouter({
    prefix: '/output',
  });
  
  const controller = createController();

  router.get(
    '/pdf',
    validate({ request: { query: pdfSchema } }),
    logger(),
    cacheBody({ prefix: 'pdf' }),
    controller.pdf.bind(controller)
  );

  router.get(
    '/screenshot',
    validate({ request: { query: screenshotSchema } }),
    logger(),
    cacheBody({ prefix: 'screenshot' }),
    controller.screenshot.bind(controller)
  );

  router.get(
    '/ssr',
    logger(),
    cacheBody({ prefix: 'ssr' }),
    controller.ssr.bind(controller)
  );

  router.get('/audio', controller.audio.bind(controller));

  router.get('/video', controller.video.bind(controller));

  router.get('/word', controller.word.bind(controller));

  router.get('/markdown', controller.markdown.bind(controller));

  router.get('/coverage', controller.coverage.bind(controller));

  router.get('/html', controller.html.bind(controller));

  return router.routes();
}
