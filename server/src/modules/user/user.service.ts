import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaClient) {}

  async getUserById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        boards: true,
      },
    });
  }

  async createUser(data: UserDTO) {
    return await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  }

  async updateUser(id: string, data: UserDTO) {
    return await this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async deleteUser(id: string) {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
