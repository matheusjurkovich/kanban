import { Component, Input, OnInit } from '@angular/core';
import { Board } from 'src/app/core/api/api-service.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-card-board',
  templateUrl: './card-board.component.html',
  styleUrls: ['./card-board.component.scss'],
})
export class CardBoardComponent implements OnInit {
  @Input({ required: true }) board!: Board;
  boardUpdatedAt: string = '';

  ngOnInit(): void {
    if (this.board && this.board.updatedAt) {
      this.boardUpdatedAt = dayjs(this.board.updatedAt).format('DD/MM/YYYY - HH:mm:ss');
    }
  }
}
