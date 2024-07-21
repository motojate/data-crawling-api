import { Controller, Get, Query } from '@nestjs/common';
import { CrawlerService } from './crawler.service';

@Controller('crawler')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}
  @Get()
  async crawler(@Query('url') url: string) {
    const result = await this.crawlerService.fetchData(url);
    console.log(result);
    return result;
  }
}
