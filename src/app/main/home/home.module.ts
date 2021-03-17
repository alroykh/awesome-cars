import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { HomeComponent } from './home.component';
import { CarItemModule } from 'src/app/shared/modules/car-item/car-item.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    CarItemModule
  ],
  exports: []
})
export class HomeModule { }
