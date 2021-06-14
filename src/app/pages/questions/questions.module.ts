import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuestionsRoutingModule } from './questions.routing.module';

import { QuestionsService } from './providers/questions.service';
import { TimerService } from './providers/timer.service';
import { AnswersService } from '../providers/answers.service';

import { QuestionsComponent } from './questions.component';
import { QuestionComponent } from './components/question/question.component';

import { TimerPipe } from './pipes/timer.pipe';
import { ShortOptionPipe } from './pipes/short-option.pipe';

@NgModule({
  declarations: [
    QuestionsComponent,
    QuestionComponent,
    TimerPipe,
    ShortOptionPipe
  ],
  providers: [
    QuestionsService,
    TimerService,
    AnswersService
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    SharedModule
  ],
  exports: [
    QuestionsComponent,
    QuestionComponent
  ]
})
export class QuestionsModule { }
