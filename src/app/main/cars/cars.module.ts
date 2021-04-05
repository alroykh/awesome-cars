import { CarEditModule } from './../../shared/modules/car-edit/car-edit.module';
import { CarInfoModule } from './../../shared/modules/car-info/car-info.module';
import { CarDialogComponent } from './../../shared/modules/car-dialog/car-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { CarsService } from './cars.service';
import { CarItemModule } from 'src/app/shared/modules/car-item/car-item.module';
import { CarCategoryModule } from 'src/app/shared/modules/car-category/car-category.module';
import { CarDetailsModule } from 'src/app/shared/modules/car-details/car-details.module';
import { CarsComponent } from './cars.component';
import { CarsFilterComponent } from '../cars-filter/cars-filter.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CarDialogModule } from 'src/app/shared/modules/car-dialog/car-dialog.module';

@NgModule({
  declarations: [CarsComponent, CarsFilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTabsModule,
    CarItemModule,
    CarCategoryModule,
    MatListModule,
    CarDetailsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CarDialogModule,
    CarInfoModule,
    CarEditModule,
    
  ],
  exports: [
    // CarsComponent
  ],
  providers: [CarsService],
})
export class CarsModule {}
