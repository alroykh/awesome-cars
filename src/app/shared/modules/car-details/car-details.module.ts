import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarDetailsComponent } from './car-details.component';

@NgModule({
  declarations: [CarDetailsComponent],
  imports: [CommonModule],
  exports: [CarDetailsComponent],
})
export class CarDetailsModule {}
