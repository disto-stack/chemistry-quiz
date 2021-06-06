import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackComponent } from './components/back/back.component';
import { LogoComponent } from './components/logo/logo.component';


@NgModule({
  declarations: [
    BackComponent,
    LogoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BackComponent,
    LogoComponent
  ]
})
export class SharedModule { }
