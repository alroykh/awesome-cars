import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

import { MainRoutingModule } from './main-routing.module';
import { HeaderModule } from '../shared/modules/header/header.module';
import { CarsModule } from './cars/cars.module';
import { HomeModule } from './home/home.module';
import { DealersModule } from './dealers/dealers.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [MainComponent],
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
    MatDialogModule,
  ],
})
export class MainModule {}
