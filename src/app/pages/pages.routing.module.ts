import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ChooseComponent } from './components/choose/choose.component';
import { ScoreComponent } from './components/score/score.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { ReviewComponent } from './components/review/review.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'choose', component: ChooseComponent },
  { 
    path: 'questions',
    loadChildren: () => import('./questions/questions.module').then(m => m.QuestionsModule)
  },
  { path: 'score', component: ScoreComponent },
  { path: 'ranking/:level', component: RankingComponent },
  { path: 'review', component: ReviewComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule { }
