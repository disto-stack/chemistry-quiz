import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuestionsRoutingModule } from './questions.routing.module';

import { TimerService } from './providers/timer.service';
import { AnswersService } from '../providers/answers.service';
import { DynamicComponentsService } from './providers/dynamic-components.service';

import { QuestionsComponent } from './questions.component';
import { QuestionComponent } from './components/question/question.component';

import { TimerPipe } from './pipes/timer.pipe';
import { KatexModule } from 'ng-katex';

@NgModule({
  declarations: [
    QuestionsComponent,
    QuestionComponent,
    TimerPipe
  ],
  providers: [
    TimerService,
    AnswersService,
    DynamicComponentsService
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    KatexModule,
    SharedModule
  ],
  exports: [
    QuestionsComponent,
    QuestionComponent
  ]
})
export class QuestionsModule { }
