import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ApiServiceService,
  Column,
} from 'src/app/core/api/api-service.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  columns: Column[] = [];
  title: string = '';
  boardId: string = '';

  constructor(
    private apiService: ApiServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.boardId = params['id']; // Capture o parâmetro 'id'

      this.apiService.getColumnsByBoardId(this.boardId).subscribe(
        (data) => {
          this.columns = data.columns;
          console.log(data);
        },
        (error) => {
          console.error('Erro ao buscar colunas:', error);
        }
      );
    });
  }
}
