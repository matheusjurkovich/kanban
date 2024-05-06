import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Column {
  id: string;
  title: string;
  createdAt: string;
  boardId: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  columnId: string;
}

export interface Board {
  id: string;
  title: string;
  createdAt: string;
  columns: Column[];
}

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private apiUrl = 'http://localhost:3333';

  constructor(private http: HttpClient) {}

  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.apiUrl + '/board');
  }

  getColumns(): Observable<Column[]> {
    return this.http.get<Column[]>(this.apiUrl + '/column');
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl + '/task');
  }

  getTasksByColumnId(columnId: string): Observable<Column> {
    return this.http.get<Column>(this.apiUrl + '/column/' + columnId);
  }
  getColumnsByBoardId(boardId: string): Observable<Board> {
    return this.http.get<Board>(this.apiUrl + '/board/' + boardId);
  }
}
