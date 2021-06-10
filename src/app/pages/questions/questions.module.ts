import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

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
    QuestionsRoutingModule,
    SharedModule
  ],
  exports: [
    QuestionsComponent,
    QuestionComponent
  ]
})
export class QuestionsModule { }
