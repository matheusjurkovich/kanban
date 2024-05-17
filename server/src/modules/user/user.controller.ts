import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUserByEmail(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<UserDTO> {
    return await this.userService.getUserByEmail(email, password);
  }

  @Post()
  async createUser(@Body() data: UserDTO): Promise<UserDTO> {
    return await this.userService.createUser(data);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: UserDTO,
  ): Promise<UserDTO> {
    return await this.userService.updateUser(id, data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<UserDTO> {
    return await this.userService.deleteUser(id);
  }
}
