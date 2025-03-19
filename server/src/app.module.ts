import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './modules/task/task.module';
import { ColumnModule } from './modules/column/column.module';
import { BoardModule } from './modules/board/board.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [TaskModule, ColumnModule, BoardModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
