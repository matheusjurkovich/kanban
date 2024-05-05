import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { BoardDTO } from './board.dto';

@Injectable()
export class BoardService {
  constructor(private prisma: PrismaService) {}

  async findAllBoards() {
    return await this.prisma.board.findMany({
      include: {
        columns: true,
      },
    });
  }

  async getBoardById(id: string) {
    const boardExists = await this.prisma.board.findUnique({
      where: {
        id,
      },
    });

    if (!boardExists) {
      throw new Error('column not exixsts!');
    }

    return await this.prisma.board.findUnique({
      where: {
        id,
      },
    });
  }

  async createBoard(data: BoardDTO) {
    const board = await this.prisma.board.create({
      data,
    });
    return board;
  }

  async updateBoard(id: string, data: BoardDTO) {
    const boardExists = await this.prisma.board.findUnique({
      where: {
        id,
      },
    });

    if (!boardExists) {
      throw new Error('board not exixsts!');
    }
    return await this.prisma.board.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteBoard(id: string) {
    const boardExists = await this.prisma.board.findUnique({
      where: {
        id,
      },
    });

    if (!boardExists) {
      throw new Error('board not exixsts!');
    }

    return await this.prisma.board.delete({
      where: {
        id,
      },
    });
  }
}
