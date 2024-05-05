import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './pages/board/components/card/card.component';
import { ColumnComponent } from './pages/board/components/column/column.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { BoardComponent } from './pages/board/board.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { CardBoardComponent } from './pages/home/components/card-board/card-board.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ColumnComponent,
    BoardComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CardBoardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
