import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/components/home/home.component';
import { ChooseComponent } from './pages/components/choose/choose.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'choose', component: ChooseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
