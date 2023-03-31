import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { PrismaService } from '../common/services/prisma.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [NewsController],
  providers: [NewsService, PrismaService],
})
export class NewsModule {}
