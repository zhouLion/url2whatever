import * as Koa from "koa";
import { PDFOptions, ScreenshotOptions } from "puppeteer-core";

export interface AppConfig {
  port: number,
  chromePath: string,
  jsonLimit: string,
  pdf: PDFOptions,
  screenshot: ScreenshotOptions,
}

declare module "koa" {
  interface DefaultState extends Koa.DefaultStateExtends {
    config: Partial<AppConfig>,
  }
}
