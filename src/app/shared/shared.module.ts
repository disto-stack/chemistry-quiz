import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KatexModule } from 'ng-katex';
import { AtomSpinnerModule } from "angular-epic-spinners";

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
import { SpinnerComponent } from './components/spinner/spinner.component';

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
    ModalComponent,
    PositionClassPipe,
    PositionSpanishPipe,
    ZeroPositionPipe,
    ShortOptionPipe,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    KatexModule,
    AtomSpinnerModule
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
    ModalComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
