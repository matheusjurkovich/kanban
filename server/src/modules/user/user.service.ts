import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserDTO } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaClient) {}

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  async getUserByEmail(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('Email not found');
    }

    const isPasswordValid = await this.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async createUser(data: UserDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (data.email) {
      if (user) {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
    }

    data.password = await this.hashPassword(data.password);
    return await this.prisma.user.create({
      data,
    });
  }

  async updateUser(id: string, data: UserDTO) {
    if (data.password) {
      data.password = await this.hashPassword(data.password);
    }
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
