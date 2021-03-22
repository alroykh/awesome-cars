import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarCategoryComponent } from './car-category.component';

@NgModule({
  declarations: [CarCategoryComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    CarCategoryComponent
  ]
})
export class CarCategoryModule { }
