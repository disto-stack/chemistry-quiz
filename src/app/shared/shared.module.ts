import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackComponent } from './components/back/back.component';


@NgModule({
  declarations: [
    BackComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BackComponent
  ]
})
export class SharedModule { }