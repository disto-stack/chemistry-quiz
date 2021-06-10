import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackComponent } from './components/back/back.component';
import { LogoComponent } from './components/logo/logo.component';
import { TimerComponent } from './components/timer/timer.component';
import { NumberComponent } from './components/number/number.component';


@NgModule({
  declarations: [
    BackComponent,
    LogoComponent,
    TimerComponent,
    NumberComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BackComponent,
    LogoComponent,
    TimerComponent,
    NumberComponent
  ]
})
export class SharedModule { }
