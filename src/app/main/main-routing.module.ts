import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { CarsComponent } from './cars/cars.component';
import { CarInfoComponent } from './../shared/modules/car-info/car-info.component';
import { DealersComponent } from './dealers/dealers.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { CarEditComponent } from '../shared/modules/car-edit/car-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'cars',
        component: CarsComponent,
      },
      {
        path: 'cars/:id',
        component: CarInfoComponent,
        data: { isEdit: false },
      },
      {
        path: 'cars/:id/edit',
        component: CarInfoComponent,
        data: { isEdit: true },
      },
      {
        path: 'dealers',
        component: DealersComponent,
      },
      {
        path: '404',
        component: PageNotFoundComponent,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: '404',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
