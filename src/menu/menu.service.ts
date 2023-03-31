import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { Menu, Prisma } from '@prisma/client';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Menu[]> {
    return this.prisma.menu.findMany();
  }

  async findById(id: number): Promise<Menu | null> {
    const db: Menu | null = await this.prisma.menu.findUnique({
      where: { id },
    });
    return db;
  }

  async create(data: Prisma.MenuCreateInput): Promise<Menu> {
    return this.prisma.menu.create({ data });
  }

  async update(id: number, data: Prisma.MenuUpdateInput): Promise<Menu> {
    return this.prisma.menu.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Menu> {
    return this.prisma.menu.delete({
      where: { id },
    });
  }

  // 递归方法，获取所有子分类ID
  async getAllIds(ids: number[]): Promise<number[]> {
    const subCategories = await this.prisma.menu.findMany({
      where: { parentId: { in: ids } },
    });

    if (subCategories.length > 0) {
      const subCategoryIds = subCategories.map((category) => category.id);
      const allSubCategoryIds = await this.getAllIds(subCategoryIds);
      return [...subCategoryIds, ...allSubCategoryIds];
    } else {
      return [];
    }
  }

  // 获取一个分类及其所有子分类的ID
  async getAllIdsByCategoryId(id: number): Promise<number[]> {
    const categoryIds = await this.getAllIds([id]);
    categoryIds.push(id);
    return categoryIds;
  }
}
