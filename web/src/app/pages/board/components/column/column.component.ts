import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Column {
  id: string;
  title: string;
  createdAt: string;
  boardId: string;
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  columnId: string;
}

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  columns: Column[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getColumns();
  }

  getColumns(): void {
    const apiUrl = 'http://localhost:3333/column'; // Substitua pela URL real da sua API
    this.http.get<Column[]>(apiUrl).subscribe(
      (data) => {
        this.columns = data;
      },
      (error) => {
        console.error('Erro ao buscar colunas:', error);
      }
    );
  }
}
