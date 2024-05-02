import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnDTO } from './column.dto';

@Controller('column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Get()
  async findAll() {
    return this.columnService.findAll();
  }

  @Get(':id')
  async getColumn(@Param() id: string) {
    return this.columnService.getColumn(id);
  }

  @Post()
  async createColumn(@Body() data: ColumnDTO) {
    const column = await this.columnService.createColumn(data);

    return column;
  }

  @Patch(':id')
  async updateColumn(@Param() id: string, @Body() data: ColumnDTO) {
    const column = await this.columnService.updateColumn(id, data);

    return column;
  }
}
