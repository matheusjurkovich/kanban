import { Component, Inject, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/core/api/api-service.service';
import { BoardService } from '../../../board.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss'],
})
export class EditTaskModalComponent {
  taskId: string = '';
  taskName: string = '';
  taskDescription: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { taskId: string },
    private apiService: ApiServiceService,
    private boardService: BoardService
  ) {
    this.taskId = data.taskId;
  }
  ngOnInit(): void {
    this.apiService.getTaskById(this.taskId).subscribe((task) => {
      this.taskName = task.title;
      this.taskDescription = task.description;
    });
  }

  async updateTask() {
    await firstValueFrom(
      this.apiService.updateTask({
        id: this.taskId,
        title: this.taskName,
        description: this.taskDescription,
      })
    );
    this.boardService.search$.next();
  }

  deleteTask(taskId: string) {
    this.apiService.deleteTask(taskId).subscribe(() => {
      this.boardService.search$.next();
    });
  }
}
