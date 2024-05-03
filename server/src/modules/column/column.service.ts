import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { ColumnDTO } from './column.dto';

@Injectable()
export class ColumnService {
  constructor(private prisma: PrismaService) {}

  async findAllColumns() {
    return await this.prisma.column.findMany({
      include: {
        tasks: true,
      },
    });
  }

  async getColumnById(id: string) {
    const columnExists = await this.prisma.column.findUnique({
      where: {
        id,
      },
    });

    if (!columnExists) {
      throw new Error('column not exixsts!');
    }

    return await this.prisma.column.findUnique({
      where: {
        id,
      },
    });
  }

  async createColumn(data: ColumnDTO) {
    const column = await this.prisma.column.create({
      data,
    });
    return column;
  }

  async updateColumn(id: string, data: ColumnDTO) {
    const columnExists = await this.prisma.column.findUnique({
      where: {
        id,
      },
    });

    if (!columnExists) {
      throw new Error('column not exixsts!');
    }
    return await this.prisma.column.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteColumn(id: string) {
    const columnExists = await this.prisma.column.findUnique({
      where: {
        id,
      },
    });

    if (!columnExists) {
      throw new Error('column not exixsts!');
    }

    return await this.prisma.column.delete({
      where: {
        id,
      },
    });
  }
}
