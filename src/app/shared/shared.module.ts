import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackComponent } from './components/back/back.component';
import { LogoComponent } from './components/logo/logo.component';
import { TimerComponent } from './components/timer/timer.component';
import { NumberComponent } from './components/number/number.component';
import { ErlenmeyerComponent } from './components/erlenmeyer/erlenmeyer.component';
import { PositionClassPipe } from './pipes/position-class.pipe';
import { TrophyComponent } from './components/trophy/trophy.component';
import { PositionSpanishPipe } from './pipes/position-spanish.pipe';


@NgModule({
  declarations: [
    BackComponent,
    LogoComponent,
    TimerComponent,
    NumberComponent,
    ErlenmeyerComponent,
    TrophyComponent,
    PositionClassPipe,
    PositionSpanishPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BackComponent,
    LogoComponent,
    TimerComponent,
    NumberComponent,
    ErlenmeyerComponent,
    TrophyComponent
  ]
})
export class SharedModule { }
