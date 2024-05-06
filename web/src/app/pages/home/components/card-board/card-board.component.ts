import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-board',
  templateUrl: './card-board.component.html',
  styleUrls: ['./card-board.component.scss'],
})
export class CardBoardComponent {
  @Input({ required: true }) title: string = '';
}
