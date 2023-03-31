import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Company } from '@prisma/client';
import { UpdateCompaniesRequest } from './models';

@Injectable()
export class CompaniesService {
  private prisma = new PrismaClient();
  async getAllCompanies(): Promise<Company[]> {
    return this.prisma.company.findMany();
  }

  async getCompanyById(id: number): Promise<Company> {
    let db = await this.prisma.company.findUnique({ where: { id } });
    if (db === null) {
      throw NotFoundException;
    }
    return db;
  }
  async createCompany(data: UpdateCompaniesRequest): Promise<Company> {
    return this.prisma.company.create({ data });
  }
  async updateCompany(
    id: number,
    data: UpdateCompaniesRequest,
  ): Promise<Company> {
    return this.prisma.company.update({ where: { id }, data });
  }
  async deleteCompany(id: number): Promise<Company> {
    return this.prisma.company.delete({ where: { id } });
  }
}
