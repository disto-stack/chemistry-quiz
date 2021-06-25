import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { QuestionsComponent } from './questions.component';

const routes: Routes = [
  { path: 'questions', 
    children: [
      { path: ':level', component: QuestionsComponent }
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
