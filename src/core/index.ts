import { Browser, PDFOptions, ScreenshotOptions } from "puppeteer-core";

export function pdf(url: string, options: PDFOptions = {}) {
  return async (browser: Browser) => {
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "networkidle2",
    });
    const pdfBuffer = await page.pdf(options);

    browser.close();
    return pdfBuffer;
  }
}

export function screenshot(url: string, options: ScreenshotOptions = {}) {
  return async (browser: Browser) => {
    const page = await browser.newPage();
    await page.goto(url);
    const screenshotBufferOrBase64 = await page.screenshot(options);

    browser.close();

    return screenshotBufferOrBase64;
  }
}

export function ssr(url: string, options: any) {
  return async (browser: Browser) => {
    const page = await browser.newPage();

    await page.setRequestInterception(true);

    const whiteList = ["script", "document", "xhr", "fetch"];
    page.on("request", (req) => {
      if (whiteList.includes(req.resourceType())) {
        req.continue();
      } else {
        req.abort();
      }
    });

    await page.goto(url, {
      waitUntil: "networkidle0",
    });

    const content = await page.content();

    browser.close();

    return content;
  }
}

export function coverage(url: string, options: any = {}) {
  return async (browser: Browser) => {
    const page = await browser.newPage();
    await Promise.all([
      page.coverage.startCSSCoverage(),
      page.coverage.startJSCoverage(),
    ]);

    await page.goto(url);

    const [CSSCoverage, JSCoverage] = await Promise.all([
      page.coverage.stopCSSCoverage(),
      page.coverage.stopJSCoverage(),
    ]);

    browser.close();

    return [CSSCoverage, JSCoverage];
  }
}

// TODO
export function audio(url: string, options: any) {
  throw new Error("Not implemented");
}

// TODO
export function video(url: string, options: any) {
  throw new Error("Not implemented");
}

// TODO
export function word(url: string, options: any) {
  throw new Error("Not implemented");
}

// TODO
export function markdown(url: string, options: any) {
  throw new Error("Not implemented");
}

// TODO
export function html(url: string, options: any) {

}
