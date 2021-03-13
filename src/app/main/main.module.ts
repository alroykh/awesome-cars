import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { CarsComponent } from './cars/cars.component';
import { CarsModule } from './cars/cars.module';

import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';

import { DealersComponent } from './dealers/dealers.component';
import { DealersModule } from './dealers/dealers.module';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';
import { HeaderModule } from '../shared/modules/header/header.module';

@NgModule({
  declarations:  [
    MainComponent,
    HomeComponent,
    CarsComponent,
    DealersComponent
],
  imports: [
    // BrowserModule, 
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
  ]
})
export class MainModule { }
