import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { QuestionsModule } from './questions/questions.module';
import { PagesRoutingModule } from './pages.routing.module';

import { PlayerService } from './providers/player.service';
import { ScoreService } from './providers/score.service';
import { AnswersService } from './providers/answers.service';

import { HomeComponent } from './components/home/home.component';
import { ChooseComponent } from './components/choose/choose.component';
import { ScoreComponent } from './components/score/score.component';


@NgModule({
  declarations: [
    ChooseComponent,
    HomeComponent,
    ScoreComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    PagesRoutingModule,
    QuestionsModule
  ],
  exports: [
    ChooseComponent,
    HomeComponent
  ],
  providers: [
    PlayerService,
    AnswersService,
    ScoreService
  ]
})
export class PagesModule { }
