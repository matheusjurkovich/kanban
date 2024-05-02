import { Body, Controller, Get, Post } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnDTO } from './column.dto';

@Controller('column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Get()
  async findAll() {
    return this.columnService.findAll();
  }

  @Post()
  async createColumn(@Body() data: ColumnDTO) {
    const column = await this.columnService.createColumn(data);

    return column;
  }
}
