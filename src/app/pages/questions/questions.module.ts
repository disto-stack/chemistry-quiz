import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsService } from './providers/questions.service';

import { QuestionsComponent } from './questions.component';
import { QuestionComponent } from './components/question/question.component';
import { QuestionsRoutingModule } from './questions.routing.module';


@NgModule({
  declarations: [
    QuestionsComponent,
    QuestionComponent
  ],
  providers: [
    QuestionsService
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule
  ],
  exports: [
    QuestionsComponent,
    QuestionComponent
  ]
})
export class QuestionsModule { }
