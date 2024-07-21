import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as puppeteer from 'puppeteer';

@Injectable()
export class CrawlerService {
  private readonly cacheKey = 'key'; // TODO 키 값 설정 필요.
  private cacheSize = 0;
  private readonly cacheLimit = 100;
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

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
