import { pdf, ssr, coverage, screenshot } from "../../core";
import { Context, Next } from "koa";
import { BaseContrller } from "../base";

export class OutputController extends BaseContrller {
  constructor() {
    super();
  }
  
  public async pdf(ctx: Context) {
    const url = this.queryStr(ctx, "url");
    const browser = await this.createBrowser(ctx);
    const pdfMaker = pdf(url, {
      printBackground: true,
    });
    const buffer = await pdfMaker(browser);
    ctx.response.attachment(`${url}.pdf`);
    ctx.body = buffer;
  }

  public async screenshot(ctx: Context) {
    const url = this.queryStr(ctx, "url");
    const browser = await this.createBrowser(ctx);
    const screenshotMaker = screenshot(url);
    const buffer = await screenshotMaker(browser);
    ctx.response.attachment(`${url}.png`);
    ctx.body = buffer;
  }
  
  public async ssr(ctx: Context) {
    const url = this.queryStr(ctx, "url");
    const browser = await this.createBrowser(ctx, {
      headless: true,
    });
    const ssrMaker = ssr(url, {});
    const body = await ssrMaker(browser);
    ctx.body = body;
  }

  public async audio(ctx: Context) {
    ctx.body = "audio";
    new SpeechSynthesisUtterance()
  }

  public async video(ctx: Context) {
    ctx.body = "video";
  }

  public async word(ctx: Context) {
    ctx.body = "word";
  }

  public async markdown(ctx: Context) {
    ctx.body = "markdown";
  }

  public async coverage(ctx: Context) {
    const browser = await this.createBrowser(ctx);
    const url = this.queryStr(ctx, "url");
    ctx.body = await coverage(url)(browser);
  }

  public async html(ctx: Context) {
    ctx.body = "html";
  }

}

export function createController() {
  return new OutputController();
}
