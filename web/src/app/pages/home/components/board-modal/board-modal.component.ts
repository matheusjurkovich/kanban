import { Component } from '@angular/core';
import { ApiServiceService } from 'src/app/core/api/api-service.service';

@Component({
  selector: 'app-board-modal',
  templateUrl: './board-modal.component.html',
  styleUrls: ['./board-modal.component.scss'],
})
export class BoardModalComponent {
  boardName: string = '';

  constructor(private apiService: ApiServiceService) {}

  addBoard() {
    this.apiService.addBoard({ title: this.boardName }).subscribe(
      (data) => {
        console.log('Board adicionado:', data);
      },
      (error) => {
        console.error('Erro ao adicionar board:', error);
      }
    );
  }
}
