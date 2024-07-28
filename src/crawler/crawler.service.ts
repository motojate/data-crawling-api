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

      await page.goto(
        'https://newbt.kr/%EC%8B%9C%ED%97%98/%EC%A0%95%EB%B3%B4%EC%B2%98%EB%A6%AC%EA%B8%B0%EC%82%AC%20%EC%8B%A4%EA%B8%B0/%EB%9E%9C%EB%8D%A4',
      );

      // TODO - 실제 데이터에 맞게 수정.
      const headlines = await page.evaluate(() => {
        console.log('document', document);
        const h1Elements = Array.from(
          document.querySelectorAll('#q56459 > h5'),
        );
        return h1Elements.map((element) => element.textContent);
      });

      await browser.close();
      // const cachedData = await this.cacheManager.get<string[]>(this.cacheKey);

      // await this.cacheManager.set(this.cacheKey, [...cachedData, ...headlines]);
      return headlines;
    } catch (error) {
      console.error(error);
    }
  }

  isCacheFull() {
    return this.cacheSize >= this.cacheLimit;
  }
}
