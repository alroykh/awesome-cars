import { CarsService } from './cars.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';

import { MatInputModule } from '@angular/material/input';

import { MatListModule } from '@angular/material/list';

import { CarItemModule } from 'src/app/shared/modules/car-item/car-item.module';
import { CarsComponent } from './cars.component';
import { CarCategoryModule } from 'src/app/shared/modules/car-category/car-category.module';

import { CarsFilterComponent } from '../cars-filter/cars-filter.component';
import { CarDetailsModule } from 'src/app/shared/modules/car-details/car-details.module';


@NgModule({
  declarations: [CarsComponent, CarsFilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTabsModule,
    CarItemModule,
    CarCategoryModule,
    //
    MatListModule,
    CarDetailsModule,
   ],
  exports: [
    // CarsComponent
  ],
  providers: [CarsService]
})
export class CarsModule { }
