import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { QuestionsComponent } from './questions.component';

import { LevelExistsGuard } from 'src/app/guards/level-exists.guard';

const routes: Routes = [
  { path: '', 
    children: [
      { 
        path: ':level', component: QuestionsComponent, 
        canActivate: [LevelExistsGuard]
      }
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
