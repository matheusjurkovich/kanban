import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardDTO } from './board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  async finfindAllBoardsdAllColumns() {
    return this.boardService.findAllBoards();
  }

  @Get(':id')
  async getBoardById(@Param('id') id: string) {
    return this.boardService.getBoardById(id);
  }

  @Post()
  async createBoard(@Body() data: BoardDTO) {
    const column = await this.boardService.createBoard(data);

    return column;
  }

  @Patch(':id')
  async updateBoard(@Param('id') id: string, @Body() data: BoardDTO) {
    const column = await this.boardService.updateBoard(id, data);

    return column;
  }

  @Delete(':id')
  async deleteBoard(@Param('id') id: string) {
    const column = await this.boardService.deleteBoard(id);

    return column;
  }
}
