import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';

import { CarItemModule } from 'src/app/shared/modules/car-item/car-item.module';
import { DealersModule } from '../dealers/dealers.module';
import { MyDealersModule } from '../my-dealers/my-dealers.module';
import { HomeComponent } from './home.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    CarItemModule,
    DealersModule,
    MyDealersModule,
    MatListModule,
    MatTreeModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  exports: [],
})
export class HomeModule {}
