import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  INestApplication,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'query' | 'error'>
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly logger: PinoLogger) {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
      errorFormat: 'colorless',
    });
    this.logger.setContext('PrismaService');
  }

  async onModuleInit(): Promise<void> {
    this.$on('query', (e) => {
      this.logger.info('Query: ' + e.query);
      this.logger.info('Params: ' + e.params);
      this.logger.info('Duration: ' + e.duration + 'ms');
    });
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
