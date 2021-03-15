import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';

import { CarItemModule } from 'src/app/shared/modules/car-item/car-item.module';
import { CarsComponent } from './cars.component';
import { CarCategoryModule } from 'src/app/shared/modules/car-category/car-category.module';



@NgModule({
  declarations: [CarsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatTabsModule,
    CarItemModule,
    CarCategoryModule,
   ],
  exports: [
    // CarsComponent
  ]
})
export class CarsModule { }
