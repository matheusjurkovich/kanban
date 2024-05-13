import { Component, Input } from '@angular/core';
import { ApiServiceService, Task } from 'src/app/core/api/api-service.service';
import { BoardService } from '../../board.service';
import { EditTaskModalComponent } from './edit-task-modal/edit-task-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input({ required: true }) task!: Task;

  constructor(
    private MatDialog: MatDialog
  ) {}

  openModal() {
    const dialogRef = this.MatDialog.open(EditTaskModalComponent, {
      data: { taskId: this.task.id },
      width: '750px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  
}
