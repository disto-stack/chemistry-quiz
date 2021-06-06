import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ChooseComponent } from './components/choose/choose.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { PlayerService } from './providers/player.service';


@NgModule({
  declarations: [
    ChooseComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    ChooseComponent,
    HomeComponent
  ],
  providers: [PlayerService]
})
export class PagesModule { }
