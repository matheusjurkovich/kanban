import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiServiceService } from 'src/app/core/api/api-service.service';
import { BoardService } from '../../../board.service';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss'],
})
export class CreateTaskModalComponent {
  taskName: string = '';
  description: string = '';
  columnId: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { columnId: string },
    private apiService: ApiServiceService,
    private boardService: BoardService,
    private dialogRef: MatDialogRef<CreateTaskModalComponent>
  ) {}

  addTask() {
    this.apiService
      .addTask({
        title: this.taskName,
        description: this.description,
        columnId: this.data.columnId,
      })
      .subscribe(
        (data) => {
          this.boardService.search$.next();
          this.dialogRef.close();
        },
        (error) => {
          console.error('Erro ao adicionar task:', error);
        }
      );
  }
}
