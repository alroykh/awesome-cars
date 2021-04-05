import { CommonModule } from '@angular/common';
import { CarsService } from 'src/app/main/cars/cars.service';
import { BrowserModule } from '@angular/platform-browser';
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
    // BrowserModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  exports: [CarInfoComponent],
  entryComponents: [],
  providers: [CarsService]
})
export class CarInfoModule {}
