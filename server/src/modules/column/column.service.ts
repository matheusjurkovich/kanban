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

  async createColumn(data: ColumnDTO) {
    const task = await this.prisma.column.create({
      data,
    });
    return task;
  }
}
