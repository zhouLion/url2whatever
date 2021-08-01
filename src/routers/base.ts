import { Context } from "koa";
import { launch } from "puppeteer-core";

export class BaseContrller {
  constructor() {}

  public uuid() {
    return Math.random().toString(36).substring(7);
  }

  public queryStr(ctx: Context, key: string) {
    const value = ctx.query[key];
    return String(value);
  }

  public createBrowser(ctx: Context, options: any = {}) {
    return launch({
      executablePath: ctx.state.config.chromePath,
      ...options,
    });
  }
}
