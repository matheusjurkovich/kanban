import { Component } from '@angular/core';
import { ApiServiceService, Board } from 'src/app/core/api/api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  boards: Board[] = [];

  constructor(private apiService: ApiServiceService) {}

  ngOnInit() {
    this.apiService.getBoards().subscribe(
      (data) => {
        this.boards = data;
        console.log('Boards:', this.boards);
      },
      (error) => {
        console.error('Erro ao buscar colunas:', error);
      }
    );
  }
}
