import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ChooseComponent } from './components/choose/choose.component';
import { ScoreComponent } from './components/score/score.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { ReviewComponent } from './components/review/review.component';
import { ReviewQuestionComponent } from './components/review-question/review-question.component';

import { PlayerExistsGuard } from '../guards/player-exists.guard';
import { LevelExistsGuard } from '../guards/level-exists.guard';
import { PlayerIsCompletedGuard } from '../guards/player-is-completed.guard';
import { PlayerIsNotCompletedGuard } from '../guards/player-is-not-completed.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'choose', component: ChooseComponent, canActivate: [PlayerExistsGuard] },
  { 
    path: 'questions',
    loadChildren: () => import('./questions/questions.module').then(m => m.QuestionsModule),
    canActivate: [PlayerExistsGuard, PlayerIsNotCompletedGuard]
  },
  { path: 'score', component: ScoreComponent, canActivate: [PlayerExistsGuard, PlayerIsCompletedGuard] },
  { path: 'ranking/:level', component: RankingComponent, canActivate: [PlayerExistsGuard, LevelExistsGuard] },
  { path: 'review', component: ReviewComponent, canActivate: [PlayerExistsGuard, PlayerIsCompletedGuard] },
  { path: 'review/:questionId', component: ReviewQuestionComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/' }
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
