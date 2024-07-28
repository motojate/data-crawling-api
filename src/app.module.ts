import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrawlerModule } from './crawler/crawler.module';
import { CacheModule } from '@nestjs/cache-manager';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [CacheModule.register(), CrawlerModule, QuestionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
