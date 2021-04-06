import { CarFormModule } from './../car-form/car-form.module';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CarsService } from 'src/app/main/cars/cars.service';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CarInfoComponent } from './car-info.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

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
  providers: [CarsService,]
})
export class CarInfoModule {}
