import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  ApiServiceService,
  Column,
  Task,
} from 'src/app/core/api/api-service.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input({ required: true }) column!: Column;

  constructor(private api: ApiServiceService) {}

  async drop(event: CdkDragDrop<Task[]>) {
    console.log(event.container.id);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      await firstValueFrom(
        this.api.updateTask({
          columnId: event.container.id,
          id: event.item.data.id,
        })
      );
    }
  }
}
