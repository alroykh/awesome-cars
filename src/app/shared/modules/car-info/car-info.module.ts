import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { CarsService } from 'src/app/main/cars/cars.service';
import { CarFormModule } from './../car-form/car-form.module';
import { RouterModule } from '@angular/router';
import { CarInfoComponent } from './car-info.component';

@NgModule({
  declarations: [CarInfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatDialogModule,
    CarFormModule,
  ],
  exports: [CarInfoComponent],
  entryComponents: [],
  providers: [CarsService],
})
export class CarInfoModule {}
