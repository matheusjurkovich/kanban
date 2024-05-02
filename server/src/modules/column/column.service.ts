import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { ColumnDTO } from './column.dto';

@Injectable()
export class ColumnService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.column.findMany({
      include: {
        tasks: true,
      },
    });
  }

  async getColumn(id: string) {
    const column = await this.prisma.column.findUnique({
      where: {
        id,
      },
    });
    return column;
  }

  async createColumn(data: ColumnDTO) {
    const column = await this.prisma.column.create({
      data,
    });
    return column;
  }

  async updateColumn(id: string, data: ColumnDTO) {
    const column = await this.prisma.column.update({
      where: {
        id,
      },
      data,
    });
    return column;
  }
}
