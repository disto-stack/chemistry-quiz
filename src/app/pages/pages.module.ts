import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages.routing.module';

import { PlayerService } from './providers/player.service';
import { ScoreService } from './providers/score.service';
import { AnswersService } from './providers/answers.service';
import { RankingService } from './providers/ranking.service';
import { ReviewService } from './providers/review.service';
import { QuestionsService } from './providers/questions.service';

import { HomeComponent } from './components/home/home.component';
import { ChooseComponent } from './components/choose/choose.component';
import { ScoreComponent } from './components/score/score.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { ReviewComponent } from './components/review/review.component';
import { ReviewQuestionComponent } from './components/review-question/review-question.component';

import { TimeTransalePipe } from "./pipes/time.transale.pipe";
import { ShortOptionPipe } from '../shared/pipes/short-option.pipe';

@NgModule({
  declarations: [
    ChooseComponent,
    HomeComponent,
    ScoreComponent,
    RankingComponent,
    ReviewComponent,
    ReviewQuestionComponent,
    TimeTransalePipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    PagesRoutingModule
  ],
  providers: [
    PlayerService,
    AnswersService,
    ScoreService,
    RankingService,
    ReviewService,
    QuestionsService
  ]
})
export class PagesModule { }
