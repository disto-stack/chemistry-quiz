import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ChooseComponent } from './components/choose/choose.component';
import { ScoreComponent } from './components/score/score.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'choose', component: ChooseComponent },
  { path: 'score', component: ScoreComponent }
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
