import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CarsService } from './cars.service';
import { CarItemModule } from 'src/app/shared/modules/car-item/car-item.module';
import { CarCategoryModule } from 'src/app/shared/modules/car-category/car-category.module';
import { CarDetailsModule } from 'src/app/shared/modules/car-details/car-details.module';
import { CarInfoModule } from './../../shared/modules/car-info/car-info.module';
import { CarsComponent } from './cars.component';

@NgModule({
  declarations: [CarsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatTabsModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    CarItemModule,
    CarCategoryModule,
    CarDetailsModule,
    CarInfoModule,
  ],
  exports: [],
  providers: [CarsService],
})
export class CarsModule {}
