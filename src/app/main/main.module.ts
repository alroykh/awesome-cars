import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainRoutingModule } from './main-routing.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MainComponent } from './main.component';
import { HeaderModule } from '../shared/modules/header/header.module';
import { CarsModule } from './cars/cars.module';
import { HomeModule } from './home/home.module';
import { DealersModule } from './dealers/dealers.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';
import { MyDealersModule } from './my-dealers/my-dealers.module';
import { DealerDialogModule } from '../shared/modules/dealer-dialog/dealer-dialog.module';
// import { CarsFilterComponent } from './cars-filter/cars-filter.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@NgModule({
  declarations: [
    MainComponent,
    // CarsFilterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule,
    CarsModule,
    DealersModule,
    HomeModule,
    PageNotFoundModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    HeaderModule,
    MatFormFieldModule,
    MyDealersModule,
    MatDialogModule,
  ],
  
})
export class MainModule {}
