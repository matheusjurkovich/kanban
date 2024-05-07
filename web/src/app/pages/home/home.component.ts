import { Component } from '@angular/core';
import { ApiServiceService, Board } from 'src/app/core/api/api-service.service';
import { BoardModalComponent } from './components/board-modal/board-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  boards: Board[] = [];

  constructor(
    private apiService: ApiServiceService,
    private MatDialog: MatDialog
  ) {}

  openDialog() {
    const dialogRef = this.MatDialog.open(BoardModalComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    this.apiService.getBoards().subscribe(
      (data) => {
        this.boards = data;
      },
      (error) => {
        console.error('Erro ao buscar colunas:', error);
      }
    );
  }
}
