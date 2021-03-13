import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarItemComponent } from './car-item.component';



@NgModule({
  declarations: [CarItemComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CarItemComponent
  ]
})
export class CarItemModule { }
