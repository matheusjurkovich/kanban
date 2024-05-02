import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDTO } from './task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  async getTask(@Param('id') id: string) {
    return this.taskService.getTask(id);
  }

  @Post()
  async create(@Body() data: TaskDTO) {
    return this.taskService.createTask(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: TaskDTO) {
    return this.taskService.updateTask(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
