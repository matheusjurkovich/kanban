import { Injectable } from '@nestjs/common';
import { TaskDTO } from './task.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.task.findMany();
  }

  async getTask(id: string) {
    const taskExists = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!taskExists) {
      throw new Error('Task not exixsts!');
    }

    return taskExists;
  }

  async createTask(data: TaskDTO) {
    if (!data.columnId) {
      throw new Error('columnId is required');
    }

    const task = await this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        column: {
          connect: {
            id: data.columnId,
          },
        },
      },
    });

    return task;
  }

  async updateTask(id: string, data: TaskDTO) {
    const taskExists = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!taskExists) {
      throw new Error('Task not exixsts!');
    }

    return await this.prisma.task.update({
      data,
      where: {
        id,
      },
    });
  }

  async deleteTask(id: string) {
    const taskExists = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!taskExists) {
      throw new Error('Task not exixsts!');
    }

    return await this.prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
