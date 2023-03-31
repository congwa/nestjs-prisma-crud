import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { News, Prisma } from '@prisma/client';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<News[]> {
    return this.prisma.news.findMany();
  }

  async findOne(id: number): Promise<News | null> {
    return this.prisma.news.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.NewsCreateInput): Promise<News> {
    return this.prisma.news.create({ data });
  }

  async update(id: number, data: Prisma.NewsUpdateInput): Promise<News> {
    return this.prisma.news.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.news.delete({
      where: { id },
    });
  }

  async findByMenuId(menuId: number): Promise<News[]> {
    return this.prisma.news.findMany({
      where: { menuId },
    });
  }

  async findUsePageByMenuId(
    menuId: number,
    options: { page: number; pageSize: number },
  ): Promise<News[]> {
    const { page, pageSize } = options;
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    return this.prisma.news.findMany({
      where: { menuId },
      skip,
      take,
    });
  }
}
