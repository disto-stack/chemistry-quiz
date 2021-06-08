import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { QuestionsComponent } from './questions.component';
import { QuestionComponent } from './components/question/question.component';

const routes: Routes = [
  { path: 'questions', 
    children: [
      { path: ':level', component: QuestionsComponent },
      { path: ':id', component: QuestionComponent }
    ] 
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
