import { Component, Input, OnInit } from '@angular/core';
import { ApiServiceService, Task } from 'src/app/core/api/api-service.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  tasks: Task[] = [];
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) columnId: string = '';

  constructor(private apiService: ApiServiceService) {}

  ngOnInit() {
    this.apiService.getTasksByColumnId(this.columnId).subscribe(
      (data) => {
        this.tasks = data.tasks;
      },
      (error) => {
        console.error('Erro ao buscar colunas:', error);
      }
    );
  }
}
