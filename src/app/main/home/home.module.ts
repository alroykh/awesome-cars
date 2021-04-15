import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';

import { CarItemModule } from 'src/app/shared/modules/car-item/car-item.module';
import { DealersModule } from '../dealers/dealers.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddNewCarDialogModule } from 'src/app/shared/modules/add-new-car-dialog/add-new-car-dialog.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    CarItemModule,
    DealersModule,
    MatListModule,
    MatTreeModule,
    MatIconModule,
    MatProgressSpinnerModule,
    AddNewCarDialogModule,
  ],
  exports: [],
})
export class HomeModule {}
