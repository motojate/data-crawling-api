import { Test, TestingModule } from '@nestjs/testing';
import { CrawlerService } from './crawler.service';

describe('CrawlerService', () => {
  let service: CrawlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrawlerService],
    }).compile();

    service = module.get<CrawlerService>(CrawlerService);
  });

  it('네이버의 데이터를 가지고 옵니다.', async () => {
    const url = 'https://www.naver.com';
    const data = await service.fetchData(url);
    console.log(data);
  });
});
