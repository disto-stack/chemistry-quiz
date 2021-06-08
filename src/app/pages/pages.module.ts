import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { QuestionsModule } from './questions/questions.module';

import { PlayerService } from './providers/player.service';

import { ChooseComponent } from './components/choose/choose.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    ChooseComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    QuestionsModule
  ],
  exports: [
    ChooseComponent,
    HomeComponent
  ],
  providers: [PlayerService]
})
export class PagesModule { }
