import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { PrismaService } from '../common/services/prisma.service';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [MenuController],
  providers: [MenuService, PrismaService],
  exports: [MenuService],
})
export class MenuModule {}
