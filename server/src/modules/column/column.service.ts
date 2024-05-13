import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ColumnDTO } from './column.dto';

@Injectable()
export class ColumnService {
  constructor(private prisma: PrismaClient) {}

  async findAllColumns() {
    return await this.prisma.column.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        tasks: {
          orderBy: {
            createdAt: 'desc',
          },
        },
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
      throw new NotFoundException('Column not found');
    }

    return await this.prisma.column.findUnique({
      where: {
        id,
      },
      include: {
        tasks: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }

  async createColumn(data: ColumnDTO) {
    const column = await this.prisma.column.create({
      data: {
        title: data.title,
        Board: {
          connect: {
            id: data.boardId,
          },
        },
      },
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
      throw new NotFoundException('Column not found');
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
      throw new NotFoundException('Column not found');
    }

    return await this.prisma.column.delete({
      where: {
        id,
      },
    });
  }
}
