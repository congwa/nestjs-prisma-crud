import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from '../common/services/prisma.service';
import { MenuService } from '../menu/menu.service';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [ProductController],
  providers: [ProductService, PrismaService, MenuService],
})
export class ProductModule {}
