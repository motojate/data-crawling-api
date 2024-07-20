import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class CrawlerService {
  async fetchData(url: string) {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.goto(url);
      const headlines = await page.evaluate(() => {
        const h1Elements = Array.from(document.querySelectorAll('h1'));
        return h1Elements.map((element) => element.textContent);
      });

      await browser.close();
      return headlines;
    } catch (error) {
      console.error(error);
    }
  }
}
