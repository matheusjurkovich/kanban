import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  columnTitle: string = 'To Do';

  cardTitle = 'Kanban';
  cardDescription: string = 'A simple Kanban board app built with Angular.';
}
