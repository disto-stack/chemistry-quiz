import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackComponent } from './components/back/back.component';
import { LogoComponent } from './components/logo/logo.component';
import { TimerComponent } from './components/timer/timer.component';
import { NumberComponent } from './components/number/number.component';
import { ErlenmeyerComponent } from './components/erlenmeyer/erlenmeyer.component';
import { TrophyComponent } from './components/trophy/trophy.component';
import { PodiumComponent } from './components/podium/podium.component';
import { TableComponent } from './components/table/table.component';
import { ModalComponent } from './components/modal/modal.component';

import { PositionClassPipe } from './pipes/position-class.pipe';
import { PositionSpanishPipe } from './pipes/position-spanish.pipe';
import { ZeroPositionPipe } from './pipes/zero-position.pipe';
import { ShortOptionPipe } from './pipes/short-option.pipe';

@NgModule({
  declarations: [
    BackComponent,
    LogoComponent,
    TimerComponent,
    NumberComponent,
    ErlenmeyerComponent,
    TrophyComponent,
    PodiumComponent,
    TableComponent,
    PositionClassPipe,
    PositionSpanishPipe,
    ZeroPositionPipe,
    ShortOptionPipe,
    ModalComponent
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
    TrophyComponent,
    PodiumComponent,
    TableComponent,
    ShortOptionPipe,
    ModalComponent
  ]
})
export class SharedModule { }
