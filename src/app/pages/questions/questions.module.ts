import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { QuestionsService } from './providers/questions.service';

import { QuestionsComponent } from './questions.component';
import { QuestionComponent } from './components/question/question.component';
import { QuestionsRoutingModule } from './questions.routing.module';
import { TimerService } from './providers/timer.service';
import { TimerPipe } from './pipes/timer.pipe';

@NgModule({
  declarations: [
    QuestionsComponent,
    QuestionComponent,
    TimerPipe
  ],
  providers: [
    QuestionsService,
    TimerService
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
