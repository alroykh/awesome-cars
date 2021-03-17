import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarCategoryComponent } from './car-category.component';
// import { Pipe, PipeTransform } from '@angular/core';


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
